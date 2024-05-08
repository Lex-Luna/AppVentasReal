using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WSVenta.Models;
using WSVenta.Models.common;
using WSVenta.Models.Request;
using WSVenta.Models.Response;
using WSVenta.Tools;

namespace WSVenta.Service
{
    public class UserService : IUserService
    {
        private AppSettings _settingsApp;
        
        
        public UserService(IOptions<AppSettings> appSettings)
        {
            _settingsApp = appSettings.Value;
        }


        
        UserResponse IUserService.Auth(AuthRequest authRequest)
        {

            UserResponse userResponse = new UserResponse();
            using (var bd = new CventaRealContext())
            {
                string spassword = Encrypt.GetSHA256(authRequest.Password);
                var usuario = bd.Users
                .Where(us => us.Email == authRequest.Email && us.Password == spassword)
                .FirstOrDefault();
                if (usuario == null)
                {
                    return null;
                }
                    
                userResponse.Email = usuario.Email;
                userResponse.Token = GetToken(usuario);
            }
            return userResponse;
        }
        private string GetToken(User user)
        {

            var secreto = new AppSettings();

            var tokenHandler = new JwtSecurityTokenHandler();
            var llave = Encoding.ASCII.GetBytes(_settingsApp.Secreto);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new System.Security.Claims.ClaimsIdentity(
                    new Claim[]
                    {
                    new Claim (ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.NameIdentifier, user.Email)
                    }),
                Expires = DateTime.UtcNow.AddDays(60),
                SigningCredentials = new
                SigningCredentials(new SymmetricSecurityKey(llave), SecurityAlgorithms.HmacSha256)


            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
    
}
