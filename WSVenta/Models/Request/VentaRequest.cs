namespace WSVenta.Models.Request
{
    public class VentaRequest
    {
        public VentaRequest() {
            this.Conceptos = new List<Concepto>();
        }
        public int IdCliente { get; set; }
        public decimal Total{ get; set; }
        public List<Concepto> Conceptos{ get; set; }


    }
    public class Concepto
    {
        public Concepto() { }
        public long id { get; set; }    
        public int Cantidad{ get; set; }
        public decimal PrecioUnitario{ get; set; }
        public decimal Importe{ get; set; }
        public int IdProducto{ get; set; }
    }
}
