using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using Uni_case_1;

[ApiController]
[Route("api/vehicles")]
public class VehicleController : ControllerBase
{
    private static List<Equipment> vehicles;

    public VehicleController()
    {
        // Load data from the JSON file on controller initialization
        string jsonFilePath = "data.json";
        string jsonData = System.IO.File.ReadAllText(jsonFilePath);
        vehicles = JsonConvert.DeserializeObject<List<Equipment>>(jsonData);
    }

    // ... (unchanged code)

    // Save data to the JSON file

    private void SaveDataToFile()
    {
        string jsonFilePath = "data.json";
        string jsonData = JsonConvert.SerializeObject(vehicles, Formatting.Indented);
        System.IO.File.WriteAllText(jsonFilePath, jsonData);
    }

// POST: api/vehicles

    [HttpPost]
    public ActionResult Post(Equipment vehicle)
    {
        vehicles.Add(vehicle);
        SaveDataToFile(); // Save the updated data to the file

        // Use CreatedAtRoute with the route name and parameters
        return CreatedAtRoute("GetVehicleById", new { id = vehicle.Number }, vehicle);
    }


    // PUT: api/vehicles/{id}
    [HttpPut("{id}")]
    public ActionResult Put(int id, [FromBody] Equipment updatedVehicle)
    {
        var existingVehicle = vehicles.Find(v => v.Number == id);
        if (existingVehicle == null)
        {
            return NotFound();
        }

        // Update the existing vehicle
        existingVehicle.Name = updatedVehicle.Name;
        existingVehicle.Contact = updatedVehicle.Contact;
        existingVehicle.Category = updatedVehicle.Category;
        existingVehicle.Condition = updatedVehicle.Condition;
        existingVehicle.Location = updatedVehicle.Location;
        existingVehicle.Specifications = updatedVehicle.Specifications;
        existingVehicle.Weight = updatedVehicle.Weight;
        existingVehicle.TechnicalInspection = updatedVehicle.TechnicalInspection;
        existingVehicle.Notes = updatedVehicle.Notes;

        SaveDataToFile(); // Save the updated data to the file

        return NoContent();
    }

    // DELETE: api/vehicles/{id}
    [HttpDelete("{id}")]
    public ActionResult Delete(int id)
    {
        var vehicle = vehicles.Find(v => v.Id == id);
        if (vehicle == null)
        {
            return NotFound();
        }

        vehicles.Remove(vehicle);
        SaveDataToFile(); // Save the updated data to the file

        return NoContent();
    }
    
    // GET: api/vehicles
    [HttpGet(Name = "GetVehicles")]
    public ActionResult<IEnumerable<Equipment>> Get()
    {
        return Ok(vehicles);
    }

    // GET: api/vehicles/{id}
    [HttpGet("{id}", Name = "GetVehicleById")]
    public ActionResult<Equipment> Get(int id)
    {
        var vehicle = vehicles.Find(v => v.Id == id);
        if (vehicle == null)
        {
            return NotFound();
        }
        return Ok(vehicle);
    }
}
