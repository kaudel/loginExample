using Microsoft.AspNetCore.Mvc;

namespace LoginBackend.Controllers;

[ApiController]
[Route("[controller]")]
public class HelloWorldController : ControllerBase
{
    [HttpGet]
    public string HelloWorld()
    {
        return "HelloWorld";
    }
}
