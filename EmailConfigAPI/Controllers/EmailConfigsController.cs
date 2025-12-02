using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class EmailConfigsController : ControllerBase
{
    private readonly AppDbContext _db;
    public EmailConfigsController(AppDbContext db) => _db = db;

    // - POST /api/emailconfigs             (add)
    [HttpPost]
    public async Task<IActionResult> Add([FromBody] EmailConfiguration config)
    {
        if (config is null) return BadRequest("Invalid payload");
        if (string.IsNullOrWhiteSpace(config.Name))
            return BadRequest("Name is required");
        if (string.IsNullOrWhiteSpace(config.WatchedFolder) )
            return BadRequest("WatchedFolder is required");

        // Ensure enum value is valid
        if (!Enum.IsDefined(typeof(ProviderType), config.Provider))
            return BadRequest("Invalid provider type");

        _db.EmailConfigurations.Add(config);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = config.Id }, config);
    }

    // - GET  /api/emailconfigs             (list all)
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var list = await _db.EmailConfigurations
            .OrderBy(c => c.Id)
            .ToListAsync();
        return Ok(list);
    }

    // - GET  /api/emailconfigs/{id}        (display selected)
    [HttpGet("{id:int}")]
    public async Task<IActionResult> Get(int id)
    {
        var config = await _db.EmailConfigurations.FindAsync(id);
        return config is null ? NotFound() : Ok(config);
    }
}
