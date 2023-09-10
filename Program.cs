var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/short", () => "Hello World!");

const int longRequestDurationMs = 2000;

app.MapGet("/long-sync", () =>
{
    Thread.Sleep(longRequestDurationMs);
    return "I did complex stuff synchronously!";
});

app.MapGet("/long-async", async () =>
{
    await Task.Delay(longRequestDurationMs);
    return "I did complex stuff asynchronously!";
});

app.Run();
