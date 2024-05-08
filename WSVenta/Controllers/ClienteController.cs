using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using WSVenta.Models;
using WSVenta.Models.Request;
using WSVenta.Models.Response;

namespace WSVenta.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            Respuesta Orespeuesta = new Respuesta();
            
            try
            {
                using (CventaRealContext bd = new CventaRealContext())
                {


                    var lst = bd.Clientes.OrderByDescending(cli=> cli.Id).ToList();
                    Orespeuesta.Exito = 1;

                    //transforma a json 
                    Orespeuesta.Exito = 1;
                    Orespeuesta.Data = lst;

                }
            }
            catch (Exception ex)
            {

                Orespeuesta.Mensaje = ex.Message;
            }
            return Ok(Orespeuesta);

        }
        [HttpPost]
        public IActionResult Add(ClienteRequest clienteRequest)
        {
            Respuesta Orespuesta = new Respuesta();
            try
            {
                using (CventaRealContext bd = new CventaRealContext())
                {
                    Cliente ocliente = new Cliente();
                    ocliente.Nombre = clienteRequest.Nombre;
                    bd.Clientes.Add(ocliente);
                    bd.SaveChanges();
                    Orespuesta.Exito = 1;
                }
            }
            catch (Exception ex)
            {

                Orespuesta.Mensaje = ex.Message;
            }
            return Ok(Orespuesta);
        }


        [HttpPut]
        public IActionResult Edit(ClienteRequest clienteRequest)
        {
            Respuesta Orespuesta = new Respuesta();
            try
            {
                
                using (CventaRealContext bd = new CventaRealContext())
                {
                    Cliente ocliente = bd.Clientes.Find(clienteRequest.id);
                    ocliente.Nombre = clienteRequest.Nombre;
                    //Cliente modificado
                    bd.Clientes.Entry(ocliente).State= Microsoft.EntityFrameworkCore.EntityState.Modified;
                    bd.SaveChanges();
                    Orespuesta.Exito = 1;
                }
            }
            catch (Exception ex)
            {

                Orespuesta.Mensaje = ex.Message;
            }
            return Ok(Orespuesta);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            Respuesta Orespuesta = new Respuesta();
            try
            {
                
                using (CventaRealContext bd = new CventaRealContext())
                {
                    Cliente ocliente = bd.Clientes.Find(id);
                    bd.Remove(ocliente);
                    //Cliente modificado
                    //bd.Clientes.Entry(ocliente).State= Microsoft.EntityFrameworkCore.EntityState.Modified;
                    bd.SaveChanges();
                    Orespuesta.Exito = 1;
                }
            }
            catch (Exception ex)
            {

                Orespuesta.Mensaje = ex.Message;
            }
            return Ok(Orespuesta);
        }



    }
}
