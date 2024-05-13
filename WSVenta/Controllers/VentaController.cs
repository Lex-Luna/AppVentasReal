using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WSVenta.Models;
using WSVenta.Models.Request;
using WSVenta.Models.Response;

namespace WSVenta.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class VentaController : ControllerBase
    {
        public IActionResult Add(VentaRequest ventaRequest)
        {
            Respuesta respuesta = new Respuesta();
            try
            {
                using (CventaRealContext bd = new CventaRealContext())
                {
                    //var venta = new Ventum();
                    //venta.Total = ventaRequest.Total;
                }    
            }
            catch (Exception ex)
            {
                respuesta.Mensaje = ex.Message;
            }
            return Ok(respuesta);
        }
    }
}
