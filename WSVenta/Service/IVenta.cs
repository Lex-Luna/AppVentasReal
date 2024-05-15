using WSVenta.Models.Request;

namespace WSVenta.Service
{
    public interface IVenta
    {
        public void Add(VentaRequest ventaRequest);
    }
}
