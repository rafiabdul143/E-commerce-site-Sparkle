using System.ComponentModel.DataAnnotations;
using Sparkle.Domain.Common;

namespace Sparkle.Domain.Entities;

public class ProductImage : BaseEntity
{
    [Required]
    [MaxLength(500)]
    public string ImageUrl { get; set; } = string.Empty;
    
    [MaxLength(200)]
    public string? AltText { get; set; }
    
    public int DisplayOrder { get; set; } = 0;
    
    public bool IsPrimary { get; set; } = false;
    
    public int ProductId { get; set; }
    
    // Navigation properties
    public virtual Product Product { get; set; } = null!;
}

