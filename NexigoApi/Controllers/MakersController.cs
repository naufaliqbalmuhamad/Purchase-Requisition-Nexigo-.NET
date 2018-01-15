using NexigoApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace NexigoApi.Controllers
{
    public class valueDropDown
    {
        public string value { get; set; }
        public string text { get; set; }
    }

    public class Grid
    {
        public string No { get; set; }
        public string Nama { get; set; }
        public string NIM { get; set; }
    }

    public class GetGrid
    {
        public int Total { get; set; }
        public List<Grid> data { get; set; }
    }

    [EnableCors(origins: "*", headers: "*", methods:"*")]
    public class MakersController : ApiController
    {
        private CRUDDataContext context = null;

        public MakersController()
        {
            context = new CRUDDataContext();
        }

        [HttpPost]
        public List<valueDropDown> getData()
        {
            List<valueDropDown> data = new List<valueDropDown>();
            data.Add(new valueDropDown() { text = "Data1", value = "1" });
            data.Add(new valueDropDown() { text = "Data2", value = "99" });

            return(data);
        }

        

        [HttpPost]
        public GetGrid gridData()
        {
            List<Grid> data = new List<Grid>();
            data.Add(new Grid() { No = "1", Nama = "Naufal", NIM = "22424" });
            data.Add(new Grid() { No = "2", Nama = "Dian", NIM = "98989" });

            GetGrid get = new GetGrid
            {
                data = data,
                Total = data.Count
            };

            return get;
        }
        
    }
}
