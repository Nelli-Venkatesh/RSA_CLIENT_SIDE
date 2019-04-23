using SECURE_SPACE;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ENCRYPTION_DEMO
{
    [RoutePrefix("api/Service")]
    public class ServiceController : ApiController
    {
        [HttpGet]
        [Route("server_and_client_rsa_api")]
        public IHttpActionResult server_and_client_rsa_api()
        {
            return Ok(SECURE_MODULE.SERVER_CLIENT_RSA_PAIR());
        }

        [HttpGet]
        [Route("get_token")]
        public IHttpActionResult get_token()
        {
            TOKEN_MODULE.addClaim("SO");
            TOKEN_MODULE.addResponse("Success", "200");
            return Ok(TOKEN_MODULE.generate_token());
        }

        [HttpGet]
        [Route("get_Token_Test")]
        public IHttpActionResult get_Token_Test(string data)
        {
            string decoded_data = TOKEN_MODULE.DECODE_DATA(data);
            string encrypted_data = SECURE_MODULE.ENCODE_DATA(decoded_data);
            return Ok(encrypted_data);
        }

        [HttpPost]
        [Route("post_Token_Test")]
        public IHttpActionResult post_Token_Test(dynamic data)
        {
            string decoded_data = TOKEN_MODULE.DECODE_DATA(data);
            string encrypted_data = SECURE_MODULE.ENCODE_DATA(decoded_data);
            return Ok(encrypted_data);
        }

        [HttpGet]
        [Route("get_Test")]
        public IHttpActionResult get_Test(string data)
        {
            string decoded_data = SECURE_MODULE.DECODE_DATA(data);
            string encrypted_data = SECURE_MODULE.ENCODE_DATA(decoded_data);
            return Ok(encrypted_data);
        }

        [HttpPost]
        [Route("post_Test")]
        public IHttpActionResult post_Test(dynamic data)
        {
            string decoded_data = SECURE_MODULE.DECODE_DATA(data);
            string encrypted_data = SECURE_MODULE.ENCODE_DATA(decoded_data);
            return Ok(encrypted_data);
        }

    }
}