using System.ComponentModel.DataAnnotations; // Для атрибута [Required]
using Newtonsoft.Json; // Для атрибута [JsonIgnore]


namespace Uni_case_1;

public class Equipment
{
    public int? Id { get; set; }
    public string? Name { get; set; }
    public string? Contact { get; set; }
    public int? Number { get; set; }
    public string? Category { get; set; }
    public string? Condition { get; set; }
    public string? Location { get; set; }
    public string? Specifications { get; set; }
    public string? Weight { get; set; }
    public string? TechnicalInspection { get; set; }
    public string? Notes { get; set; }
}
