using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.InteropServices.Marshalling;
using WSVenta.Models.Request;
using WSVenta.Models.Response;
using WSVenta.Service;

namespace WSVenta.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public IActionResult Autentificar([FromBody] AuthRequest authRequest)
        {
            try
            {

                Respuesta respuesta = new Respuesta();
                var userResponse = _userService.Auth(authRequest);
                if (userResponse == null)
                {
                    respuesta.Exito = 0;
                    respuesta.Mensaje = " Usuario o contraseña no valido";
                    return BadRequest(respuesta);
                }
                respuesta.Exito = 1;
                respuesta.Data = userResponse;
                respuesta.Mensaje = "Exito mi compa";
                return Ok(respuesta);

            }
            catch (Exception)
            {

                throw;
            }
            
        }
    }
}
