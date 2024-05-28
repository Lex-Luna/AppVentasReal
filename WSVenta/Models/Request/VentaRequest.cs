using System.ComponentModel.DataAnnotations;

namespace WSVenta.Models.Request
{
    public class VentaRequest
    {
        public VentaRequest() {
            this.Conceptos = new List<Concepto>();
        }
        [Required]
        [Range(1,Double.MaxValue, ErrorMessage ="El Id del cliente debe ser mayor a 0 hp")]
        [ExisteClienteAtribute(ErrorMessage ="El cliente no existe")]
        public int IdCliente { get; set; }
        
        public decimal Total{ get; set; }
        [Required]
        [MinLength(1, ErrorMessage ="Minimo debe haber un concepto")]
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
    #region Validaciones
    public class ExisteClienteAtribute: ValidationAttribute {
        public override bool IsValid(object? value)
        {
            long idCliente=(long)value;
            using (var bd = new Models.CventaRealContext())
            {
                if (bd.Clientes.Find(idCliente) == null) return false;
                
            }
                return true;
        }
    }

    #endregion
}
