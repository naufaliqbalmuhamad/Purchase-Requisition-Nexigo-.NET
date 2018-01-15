using NexigoApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;

namespace NexigoApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class LoginController : ApiController
    {
        private PurchaserRequisitionDataContext context = null;
        public LoginController()
        {
            context = new PurchaserRequisitionDataContext();
        }

        [HttpPost]
        public IHttpActionResult readData([FromBody] Company req)
        {
            try
            {
                if (req != null)
                {
                    using (var dc = new PurchaserRequisitionDataContext())
                    {
                        var user = dc.Companies.Where(o => o.Username == req.Username && o.Password == req.Password).SingleOrDefault();
                        return Ok(user);
                    }
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch (Exception)
            {
                return BadRequest("Error");
            }
        }
    }
}
