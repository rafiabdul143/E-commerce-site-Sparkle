using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Sparkle.Domain.Common;

namespace Sparkle.Domain.Entities;

public class Product : BaseEntity
{
    [Required]
    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;
    
    [MaxLength(1000)]
    public string? Description { get; set; }
    
    [Required]
    [Column(TypeName = "decimal(18,2)")]
    public decimal Price { get; set; }
    
    [Column(TypeName = "decimal(18,2)")]
    public decimal? CompareAtPrice { get; set; }
    
    [Required]
    [MaxLength(100)]
    public string SKU { get; set; } = string.Empty;
    
    public int StockQuantity { get; set; } = 0;
    
    public int LowStockThreshold { get; set; } = 10;
    
    public bool TrackQuantity { get; set; } = true;
    
    public bool IsActive { get; set; } = true;
    
    public bool IsFeatured { get; set; } = false;
    
    public double Weight { get; set; } = 0;
    
    [MaxLength(50)]
    public string? WeightUnit { get; set; } = "kg";
    
    public int CategoryId { get; set; }
    
    // Navigation properties
    public virtual Category Category { get; set; } = null!;
    public virtual ICollection<ProductImage> Images { get; set; } = new List<ProductImage>();
    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
}

