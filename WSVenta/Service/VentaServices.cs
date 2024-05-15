using WSVenta.Models.Request;
using WSVenta.Models.Response;
using WSVenta.Models;

namespace WSVenta.Service
{
    public class VentaServices : IVenta
    {
        public void Add(VentaRequest ventaRequest)
        {
            
                using (CventaRealContext bd = new CventaRealContext())
                {
                    using (var transaction = bd.Database.BeginTransaction())
                    {
                        try
                        {
                            var venta = new Ventum();
                            venta.Total = ventaRequest.Conceptos.Sum(d => d.Cantidad * d.PrecioUnitario);
                            venta.Fecha = DateTime.Now;
                            venta.IdCliente = ventaRequest.IdCliente;
                            bd.Venta.Add(venta);
                            bd.SaveChanges();
                            foreach (var model_concepto in ventaRequest.Conceptos)
                            {
                                var concepto = new Models.Concepto();
                                concepto.Cantidad = model_concepto.Cantidad;
                                concepto.IdProducto = model_concepto.IdProducto;
                                concepto.PrecioUnitario = model_concepto.PrecioUnitario;
                                concepto.Importe = model_concepto.Importe;
                                concepto.IdVenta = venta.Id;
                                bd.Conceptos.Add(concepto);
                                bd.SaveChanges();
                            }
                            transaction.Commit();
                        }
                        catch (Exception e)
                        {
                            transaction.Rollback();
                            throw new Exception("Ocurrio un error en la insercion");
                        }
                        
                    }

                }
            
        }
    }
}
