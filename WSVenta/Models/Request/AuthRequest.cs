using System.ComponentModel.DataAnnotations;

namespace WSVenta.Models.Request
{
    public class AuthRequest
    {
        [Required]
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
