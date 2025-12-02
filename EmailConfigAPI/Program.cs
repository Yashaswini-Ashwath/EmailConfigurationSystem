using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Register DbContext with SQLite (use secure connection via appsettings)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();

// Load allowed origins from configuration (whitelist multiple URLs)
var allowedOrigins = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>() ?? Array.Empty<string>();

// Configure strict CORS policy to prevent cross-origin abuse
builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendWhitelist", policy =>
    {
        policy.WithOrigins(allowedOrigins)   // Only specified origins to avoid cors site forgery
              .AllowAnyHeader()              
              .AllowAnyMethod();             
    });
});

// Add global rate limiting to reduce brute force / abuse
builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("default", opt =>
    {
        opt.PermitLimit = 10;                    // Max 10 requests
        opt.Window = TimeSpan.FromSeconds(30);   // Per 30 seconds
    });
});

var app = builder.Build();

// Enforce HTTPS and apply CORS + rate limiter
app.UseHttpsRedirection();
app.UseCors("FrontendWhitelist");
app.UseAuthorization();
app.UseRateLimiter();

app.MapControllers();

app.Run();
