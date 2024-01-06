using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Uni_case_1.DbContext;


namespace Uni_case_1.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MilbaseController : ControllerBase
{
    private readonly MyDbContext _context;

    public MilbaseController(MyDbContext context)
    {
        _context = context;
    }

    // Отримати список Milbase
    [HttpGet]
    public async Task<IActionResult> GetMilbases()
    {
        var milbases = await _context.Milbases.ToListAsync();
        return Ok(milbases);
    }

    // Отримати Milbase за ID
    [HttpGet("{id}")]
    public async Task<IActionResult> GetMilbase(int id)
    {
        var milbase = await _context.Milbases.FindAsync(id);
        if (milbase == null)
        {
            return NotFound();
        }
        return Ok(milbase);
    }

    // Створити новий Milbase
    [HttpPost]
    public async Task<IActionResult> CreateMilbase(Milbase milbase)
    {
        _context.Milbases.Add(milbase);
        await _context.SaveChangesAsync();
        return CreatedAtAction("GetMilbase", new { id = milbase.Id }, milbase);
    }

    // Оновити Milbase
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateMilbase(int id, Milbase milbase)
    {
        if (id != milbase.Id)
        {
            return BadRequest();
        }

        _context.Entry(milbase).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!MilbaseExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // Видалити Milbase
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMilbase(int id)
    {
        var milbase = await _context.Milbases.FindAsync(id);
        if (milbase == null)
        {
            return NotFound();
        }

        _context.Milbases.Remove(milbase);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool MilbaseExists(int id)
    {
        return _context.Milbases.Any(e => e.Id == id);
    }
}
