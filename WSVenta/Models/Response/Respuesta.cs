namespace WSVenta.Models.Response
{
    public class Respuesta
    {
        public int Exito { get; set; }
        public string Mensaje { get; set; }
        public string Token { get; set; }
        public object Data { get; set; }
        public Respuesta()
        {
            Exito = 0;

        }

    }
}
