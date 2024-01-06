using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using Uni_case_1;

[Route("api/users")]
[ApiController]
public class UserController : ControllerBase
{
    private static List<User> users = new List<User>();
    private static readonly string filePath = "/Users/vrublevskyi.o/RiderProjects/Uni_case_1/Uni_case_1/UsersData.json";

    public UserController()
    {
        LoadUsers();
    }

    // Завантаження користувачів з файлу
    private void LoadUsers()
    {
        if (System.IO.File.Exists(filePath))
        {
            string json = System.IO.File.ReadAllText(filePath);
            users = JsonSerializer.Deserialize<List<User>>(json);
        }
    }

    // Збереження користувачів у файл
    private void SaveUsers()
    {
        string json = JsonSerializer.Serialize(users);
        System.IO.File.WriteAllText(filePath, json);
    }

    // GET: api/users
    [HttpGet]
    public IEnumerable<User> Get()
    {
        return users;
    }

    // GET: api/users/1
    [HttpGet("{id}")]
    public ActionResult<User> Get(int id)
    {
        var user = users.Find(u => u.Id == id);

        if (user == null)
        {
            return NotFound();
        }

        return user;
    }

    // POST: api/users
    [HttpPost]
    public ActionResult<User> Post([FromBody] User newUser)
    {
        newUser.Id = users.Count + 1;
        users.Add(newUser);

        SaveUsers(); // Зберегти зміни у файл

        return CreatedAtAction(nameof(Get), new { id = newUser.Id }, newUser);
    }

    // PUT: api/users/1
    [HttpPut("{id}")]
    public IActionResult Put(int id, [FromBody] User updatedUser)
    {
        var user = users.Find(u => u.Id == id);

        if (user == null)
        {
            return NotFound();
        }

        user.FullName = updatedUser.FullName;
        user.MilitaryId = updatedUser.MilitaryId;
        user.Status = updatedUser.Status;
        user.Email = updatedUser.Email;
        user.Password = updatedUser.Password;

        SaveUsers(); // Зберегти зміни у файл

        return NoContent();
    }

    // DELETE: api/users/1
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var user = users.Find(u => u.Id == id);

        if (user == null)
        {
            return NotFound();
        }

        users.Remove(user);

        SaveUsers(); // Зберегти зміни у файл

        return NoContent();
    }
}
