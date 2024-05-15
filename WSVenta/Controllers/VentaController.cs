using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using WSVenta.Models;
using WSVenta.Models.Request;
using WSVenta.Models.Response;
using WSVenta.Service;

namespace WSVenta.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class VentaController : ControllerBase
    {
        private IVenta _venta;
        public VentaController(IVenta venta)
        {
            this._venta = venta;
        }

        [HttpPost]
        public IActionResult Add(VentaRequest ventaRequest)
        {
            
            Respuesta respuesta = new Respuesta();
            try
            {
                using (CventaRealContext bd = new CventaRealContext())
                {
                    using (var transaction = bd.Database.BeginTransaction())
                    {
                        try
                        {
                            
                            _venta.Add(ventaRequest);
                            respuesta.Exito = 1;
                            
                        }
                        catch (Exception e)
                        {
                            respuesta.Mensaje = e.Message;
                        }
                        
                        respuesta.Exito = 1;
                    }

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
