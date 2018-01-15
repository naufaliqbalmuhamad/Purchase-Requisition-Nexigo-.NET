using Newtonsoft.Json.Linq;
using NexigoApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace NexigoApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]

    public class ManagerController : ApiController
    {
        private PurchaserRequisitionDataContext context = null;
        public ManagerController()
        {
            context = new PurchaserRequisitionDataContext();
        }

        [HttpPost]
        public IHttpActionResult updateData([FromBody] RequesterSummary req)
        {
            try
            {
                if (req != null)
                {
                    using (var dc = new PurchaserRequisitionDataContext())
                    {
                        var data = dc.RequesterSummaries.FirstOrDefault(o => o.Id == req.Id);
                        {
                            data.Manager = req.Manager;
                        };
                        dc.SubmitChanges();
                        return Ok(data);
                    }
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IHttpActionResult> SubmitTaskManager(AddRequest param)
        {
            try
            {
                using (var context = new PurchaserRequisitionDataContext())
                {

                    var usr = context.Companies.Where(o => o.Email == param.Email).FirstOrDefault();
                    var token = usr.Token;

                    var bodyCreate = "{" +
                                        "\"data\": {" +
                                            "\"form_data\": {" +
                                                "\"pvAction\" : \"" + param.Action + "\"," +
                                                " \"pvOwner\": \"iqbal@makers.com\"," +
                                                " \"pvReq\": \"" + param.Email + "\"" +
                                            "}," +
                                            "\"comment\": \"Tes\"" +
                                        "}" +
                                    "}";

                    JObject jsonCreate = JObject.Parse(bodyCreate);
                    var action = string.Empty;

                    using (var client = new HttpClient())
                    {
                        client.BaseAddress = new Uri("https://mosaic.dev.nextflow.tech/");
                        client.DefaultRequestHeaders.Accept.Clear();
                        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                        var response = await client.PostAsJsonAsync("nextflow/api/tasks/" + param.TaskId + "/submit", jsonCreate);
                        var result = await response.Content.ReadAsAsync<dynamic>();

                    }

                    if (param.Action == "Approved")
                    {
                        var requester = context.RequesterSummaries.Where(o => o.ProcessId == param.ProcessId).FirstOrDefault();
                        requester.Manager = param.Action;
                        context.SubmitChanges();

                        CommentHistory commentHistory = new CommentHistory();

                        commentHistory.ProcessId = param.ProcessId;
                        commentHistory.Name = usr.Name;
                        commentHistory.Action = param.Action;
                        commentHistory.Date = DateTime.Now;
                        commentHistory.Comment = "Manager sudah membaca";

                        context.CommentHistories.InsertOnSubmit(commentHistory);
                        context.SubmitChanges();

                    }
                    return Ok(new { success = true, message = "Request " + action });
                }
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = ex.Message });
            }
        }


    }
}
