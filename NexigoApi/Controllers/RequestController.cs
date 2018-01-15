using Newtonsoft.Json.Linq;
using NexigoApi.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;

namespace NexigoApi.Controllers
{
    public class Result
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


    public class AddRequest : RequesterSummary
    {
        public string comment { get; set; }
        public string Action { get; set; }
        public string TaskId { get; set; }
    }

    public class ReadDB : RequesterSummary
    {

    }

    public class Read
    {
        public List<Result> data { get; set; }
        public int total { get; set; }
    }

    public class Currency
    {
        public string value { get; set; }
        public string text { get; set; }
    }

    public class Quantity
    {
        public string value { get; set; }
        public string text { get; set; }
    }

    public class MaterialGroup
    {
        public string value { get; set; }
        public string text { get; set; }
    }

    public class Budget
    {
        public string value { get; set; }
        public string text { get; set; }
    }

    public class Plant
    {
        public string value { get; set; }
        public string text { get; set; }
    }

    public class RequesterPosition
    {
        public string value { get; set; }
        public string text { get; set; }
    }

    public class CompanyList
    {
        public string value { get; set; }
        public string text { get; set; }
    }

    [EnableCors(origins: "*", headers: "*", methods: "*")]

    public class RequestController : ApiController
    {
        private PurchaserRequisitionDataContext context = null;
        public RequestController()
        {
            context = new PurchaserRequisitionDataContext();
        }

        [HttpPost]
        public IHttpActionResult readRequester(string Jabatan)
        {
            try
            {
                using (var dc = new PurchaserRequisitionDataContext())
                {
                    var javaScriptSerializer = new JavaScriptSerializer();
                    var user = dc.Companies.Where(o => o.Jabatan == Jabatan).SingleOrDefault();
                 
                if (Jabatan != null){
                        var result = javaScriptSerializer.Serialize(new { User = user });
                        return Ok(result);
                } else
                    {
                        return Ok("");
                    }

                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IHttpActionResult readCurrency()
        {
            var query = from data in context.Currencies
                        select new Currency
                        {
                            value = data.Curencies,
                            text = data.Curencies
                        };
            return Ok(query.ToList());
        }

        [HttpPost]
        public IHttpActionResult readPosition()
        {
            var query = from data in context.RequesterPositions
                        select new RequesterPosition
                        {
                            value = data.Position,
                            text = data.Position
                        };
            return Ok(query.ToList());
        }

        [HttpPost]
        public IHttpActionResult readCompany()
        {
            var query = from data in context.CompanyFroms
                        select new CompanyList
                        {
                            value = data.Name,
                            text = data.Name
                        };
            return Ok(query.ToList());
        }

        [HttpPost]
        public IHttpActionResult readPlant()
        {
            var query = from data in context.Plants
                        select new Plant
                        {
                            value = data.Plant1,
                            text = data.Plant1
                        };
            return Ok(query.ToList());
        }

        [HttpPost]
        public IHttpActionResult readBudget()
        {
            var query = from data in context.BudgetSources
                        select new Budget
                        {
                            value = data.Source,
                            text = data.Source
                        };
            return Ok(query.ToList());
        }

        [HttpPost]
        public IHttpActionResult readMaterial()
        {
            var query = from data in context.MaterialGroups
                        select new Budget
                        {
                            value = data.Group,
                            text = data.Group
                        };
            return Ok(query.ToList());
        }

        [HttpPost]
        public IHttpActionResult readQuantity()
        {
            var query = from data in context.Quantities
                        select new Budget
                        {
                            value = data.Quantity1,
                            text = data.Quantity1
                        };
            return Ok(query.ToList());
        }

        [HttpPost]
        public async Task<IHttpActionResult> Create ([FromBody] AddRequest req)
        {
            var flowId = ConfigurationManager.AppSettings["FlowId"];
            CommentHistory comment = new CommentHistory();
            RequesterSummary requester = new RequesterSummary();

            using (var dc = new PurchaserRequisitionDataContext())
            {
                var data = dc.Companies.FirstOrDefault(o => o.Name == req.Name);

                string RecordId = string.Empty;
                string ProcessId = string.Empty;

                var bodyCreate = "{ " +
                                    "\"data\": { " +
                                        " \"definition\": { " +
                                            " \"id\": \"" + flowId + "\"" +
                                        "}" +
                                        "}" +
                                    "}";

                JObject jsonCreate = JObject.Parse(bodyCreate);

                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri("https://mosaic.dev.nextflow.tech/");
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", data.Token);
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    var response = await client.PostAsJsonAsync("nextflow/api/records", jsonCreate);
                    var result = await response.Content.ReadAsAsync<dynamic>();
                    RecordId = result.data.id;

                    var bodySubmit = "{ " +
                                           "\"data\": { " +
                                               " \"form_data\": { " +
                                                   " \"pvInitiator\": \"" + data.Email + "\"," +
                                                       " \"pvInitiatorName\": \"" + data.Name + "\"," +
                                                       " \"pvAction\": \"submit\"," +
                                                       " \"pvReq\": \"" + data.Email + "\"," +
                                                       " \"pvApprover\": \"naufalopak@makers.com\"" +
                                               "}," +
                                               "\"comment\" : \"" + req.comment + "\"" +
                                           "}" +
                                       "}";

                    JObject jsonSubmit = JObject.Parse(bodySubmit);
                    var responseSubmit = await client.PostAsJsonAsync("nextflow/api/records/" + RecordId + "/submit", jsonSubmit);
                    var resultSubmit = await responseSubmit.Content.ReadAsAsync<dynamic>();

                    ProcessId = resultSubmit.data.process_id;
                }

                requester.Name = req.Name;
                requester.Email = req.Email;
                requester.Payroll = req.Payroll;
                requester.RequesterPosition = req.RequesterPosition;
                requester.AsalCompany = req.AsalCompany;
                requester.Location = req.Location;
                requester.Plant = req.Plant;
                requester.BudgetSource = req.BudgetSource;
                requester.Currency = req.Currency;
                requester.Date = req.Date;
                requester.SinglePanel = req.SinglePanel;
                requester.ItemText = req.ItemText;
                requester.MaterialGroup = req.MaterialGroup;
                requester.Description = req.Description;
                requester.Qty = req.Qty;
                requester.QtySatuan = req.QtySatuan;
                requester.EstPrice = req.EstPrice;
                requester.Subtotal = req.Qty * req.EstPrice;
                requester.ProcessId = ProcessId;
                requester.RecordId = RecordId;

                dc.RequesterSummaries.InsertOnSubmit(requester);

                comment.Name = req.Name;
                comment.ProcessId = ProcessId;
                comment.Action = "Submit";
                comment.Date = DateTime.Now;
                comment.Comment = "Tolong diperiksa dengan saksama";
                dc.CommentHistories.InsertOnSubmit(comment);
                dc.SubmitChanges();
            }

            return Ok("Success");
        }

        [HttpPost]
        public Read readAll()
        {
            var query = from Baca in context.RequesterSummaries
                        select new Result
                        {
                            Id = Baca.Id,
                            Name = Baca.Name,
                            Payroll = Baca.Payroll,
                            RequesterPosition = Baca.RequesterPosition,
                            AsalCompany = Baca.AsalCompany,
                            Location = Baca.Location,
                            Plant = Baca.Plant,
                            BudgetSource = Baca.BudgetSource,
                            Currency = Baca.Currency,
                            Date = Baca.Date,
                            SinglePanel = Baca.SinglePanel,
                            ItemText = Baca.ItemText,
                            EstPrice = Baca.EstPrice,
                            Description = Baca.Description,
                            Qty = Baca.Qty,
                            QtySatuan = Baca.QtySatuan,
                            MaterialGroup = Baca.MaterialGroup,
                            Subtotal = Baca.Subtotal,
                            ApproveStatus = Baca.ApproveStatus,
                            Manager = Baca.Manager,
                            Owner = Baca.Owner,
                            ProcessId = Baca.ProcessId,
                            RecordId = Baca.RecordId,
                        };

            Read getdata = new Read
            {
                data = query.ToList(),
                total = query.ToList().Count
            };
            return getdata;
        }

        [HttpPost]
        public async Task<IHttpActionResult> updateData([FromBody] AddRequest param)
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
                                                " \"pvApprover\": \"naufalopak@makers.com\"," +
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

                    if (param.Action == "Edit")
                    {
                        var requester = context.RequesterSummaries.Where(o => o.ProcessId == param.ProcessId).FirstOrDefault();
                        requester.ApproveStatus = null;
                        requester.Name = param.Name;
                        requester.Email = param.Email;
                        requester.Payroll = param.Payroll;
                        requester.RequesterPosition = param.RequesterPosition;
                        requester.AsalCompany = param.AsalCompany;
                        requester.Location = param.Location;
                        requester.Plant = param.Plant;
                        requester.BudgetSource = param.BudgetSource;
                        requester.Currency = param.Currency;
                        requester.Date = param.Date;
                        requester.SinglePanel = param.SinglePanel;
                        requester.ItemText = param.ItemText;
                        requester.MaterialGroup = param.MaterialGroup;
                        requester.Description = param.Description;
                        requester.Qty = param.Qty;
                        requester.QtySatuan = param.QtySatuan;
                        requester.EstPrice = param.EstPrice;
                        requester.Subtotal = param.Qty * param.EstPrice;
                        context.SubmitChanges();

                        CommentHistory commentHistory = new CommentHistory();

                        commentHistory.ProcessId = param.ProcessId;
                        commentHistory.Name = usr.Name;
                        commentHistory.Action = param.Action;
                        commentHistory.Date = DateTime.Now;
                        commentHistory.Comment = "Sudah diedit";

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
        public IHttpActionResult deleteData(int Id)
        {
            try
            {
                    using (var dc = new PurchaserRequisitionDataContext())
                    {
                        var data = dc.RequesterSummaries.FirstOrDefault(o => o.Id == Id);
                        dc.RequesterSummaries.DeleteOnSubmit(data);
                        dc.SubmitChanges();
                        return Ok(data);
                    }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
