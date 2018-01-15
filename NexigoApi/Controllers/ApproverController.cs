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
    public class TaskListGrid
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Payroll { get; set; }
        public string RequesterPosition { get; set; }
        public string AsalCompany { get; set; }
        public string Location { get; set; }
        public string Plant { get; set; }
        public string BudgetSource { get; set; }
        public string Currency { get; set; }
        public string Date { get; set; }
        public string SinglePanel { get; set; }
        public string ItemText { get; set; }
        public string Description { get; set; }
        public int EstPrice { get; set; }
        public int Qty { get; set; }
        public string QtySatuan { get; set; }
        public string MaterialGroup { get; set; }
        public int Subtotal { get; set; }
        public string ApproveStatus { get; set; }
        public string Manager { get; set; }
        public string Owner { get; set; }
        public string TaskId { get; set; }
        public string ProcessId { get; set; }
        public string RecordId { get; set; }
    }

    [EnableCors(origins: "*", headers: "*", methods: "*")]

    public class ApproverController : ApiController
    {
        private PurchaserRequisitionDataContext context = null;
        public ApproverController()
        {
            context = new PurchaserRequisitionDataContext();
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetTaskList(string Email)
        {
            using (var context = new PurchaserRequisitionDataContext())
            {
                try
                {
                    var usr = context.Companies.Where(o => o.Email == Email).FirstOrDefault();
                    var token = usr.Token;

                    List<TaskListGrid> grids = new List<TaskListGrid>();
                    using (var client = new HttpClient())
                    {
                        dynamic response;
                        dynamic parseResult;
                        string uri = "https://mosaic.dev.nextflow.tech/nextflow/api/tasks?folder=app:task:all&page[number]=1&page[size]=10";
                        client.DefaultRequestHeaders.Accept.Clear();
                        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                        response = await client.GetStringAsync(uri);
                        parseResult = JObject.Parse(response);

                        //result = JsonConvert.DeserializeObject<List<dynamic>>(parseResult[0]);

                        foreach (var item in parseResult.data)
                        {
                            TaskListGrid task = new TaskListGrid();
                            string email = item.created_by.email;
                            task.ProcessId = item.process_id;
                            task.TaskId = item.id;
                            string pid = item.process_id;
                            var dd = context.RequesterSummaries.Where(o => o.ProcessId == task.ProcessId).FirstOrDefault();
                            task.Payroll = dd.Payroll;
                            task.Id = dd.Id;
                            task.RequesterPosition = context.RequesterSummaries.Where(o => o.ProcessId == pid).FirstOrDefault().RequesterPosition;
                            task.AsalCompany = dd.AsalCompany;
                            task.Location = dd.Location;
                            task.Plant = dd.Plant;
                            task.BudgetSource = dd.BudgetSource;
                            task.Currency = dd.Currency;
                            task.Date = dd.Date;
                            task.SinglePanel = dd.SinglePanel;
                            task.ItemText = dd.ItemText;
                            task.Description = dd.Description;
                            task.EstPrice = dd.EstPrice;
                            task.Qty = dd.Qty;
                            task.QtySatuan = dd.QtySatuan;
                            task.MaterialGroup = dd.MaterialGroup;
                            task.Subtotal = dd.Subtotal;
                            task.ApproveStatus = dd.ApproveStatus;
                            task.Manager = dd.Manager;
                            task.Owner = dd.Owner;
                            task.Name = dd.Name;
                            task.RecordId = dd.RecordId;
                            task.Payroll = dd.Payroll;
                            task.RequesterPosition = dd.RequesterPosition;
                            grids.Add(task);
                        }
                    }
                    return Ok(new { success = true, data = grids });
                }

                catch (Exception ex)
                {
                    return Ok(new { success = false, data = ex.Message });
                }

            }
        }

        [HttpPost]
        public async Task<IHttpActionResult> SubmitTaskApprove(AddRequest param)
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
                                                " \"pvManager\": \"arya@makers.com\"," +
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
                        requester.ApproveStatus = param.Action;
                        context.SubmitChanges();

                        CommentHistory commentHistory = new CommentHistory();

                        commentHistory.ProcessId = param.ProcessId;
                        commentHistory.Name = usr.Name;
                        commentHistory.Action = param.Action;
                        commentHistory.Date = DateTime.Now;
                        commentHistory.Comment = "Oke sudah diapprove";

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

        [HttpPost]
        public async Task<IHttpActionResult> SubmitTaskDisapprove(AddRequest param)
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
                                            //" \"pvApprover\": \"arya@makers.com\"" +
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

                    if (param.Action == "Disapproved")
                    {
                        var requester = context.RequesterSummaries.Where(o => o.ProcessId == param.ProcessId).FirstOrDefault();
                        requester.ApproveStatus = param.Action;
                        context.SubmitChanges();

                        CommentHistory commentHistory = new CommentHistory();

                        commentHistory.ProcessId = param.ProcessId;
                        commentHistory.Name = usr.Name;
                        commentHistory.Action = param.Action;
                        commentHistory.Date = DateTime.Now;
                        commentHistory.Comment = "Tidak disetujui, harap dibuat request ulang";

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

        [HttpPost]
        public async Task<IHttpActionResult> SubmitTaskEdit(AddRequest param)
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
                                                    " \"pvEditor\": \"mosa@makers.com\"," +
                                                "\"pvReq\" : \"" + param.Email + "\"," +
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

                    if (param.Action == "Edit")
                    {
                        var requester = context.RequesterSummaries.Where(o => o.ProcessId == param.ProcessId).FirstOrDefault();
                        requester.ApproveStatus = param.Action;
                        context.SubmitChanges();

                        CommentHistory commentHistory = new CommentHistory();

                        commentHistory.ProcessId = param.ProcessId;
                        commentHistory.Name = usr.Name;
                        commentHistory.Action = param.Action;
                        commentHistory.Date = DateTime.Now;
                        commentHistory.Comment = "Tolong diedit";

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
