using System;
using System.Collections.Generic;

namespace WSVenta.Models;

public partial class Producto
{
    public long Id { get; set; }

    public byte[]? Nombre { get; set; }

    public decimal? PrecioUnitario { get; set; }

    public decimal? Costo { get; set; }

    public virtual ICollection<Concepto> Conceptos { get; set; } = new List<Concepto>();
}
