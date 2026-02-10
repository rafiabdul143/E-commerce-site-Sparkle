using System.ComponentModel.DataAnnotations;
using Sparkle.Domain.Common;

namespace Sparkle.Domain.Entities;

public class Category : BaseEntity
{
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;
    
    [MaxLength(500)]
    public string? Description { get; set; }
    
    [MaxLength(255)]
    public string? ImageUrl { get; set; }
    
    public bool IsActive { get; set; } = true;
    
    public int DisplayOrder { get; set; } = 0;
    
    // Navigation properties
    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}

