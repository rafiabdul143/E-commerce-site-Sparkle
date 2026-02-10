using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Sparkle.Domain.Common;

namespace Sparkle.Domain.Entities;

public class OrderItem : BaseEntity
{
    public int OrderId { get; set; }
    
    public int ProductId { get; set; }
    
    [Required]
    public int Quantity { get; set; }
    
    [Column(TypeName = "decimal(18,2)")]
    public decimal UnitPrice { get; set; }
    
    [Column(TypeName = "decimal(18,2)")]
    public decimal TotalPrice { get; set; }
    
    [MaxLength(200)]
    public string ProductName { get; set; } = string.Empty; // Snapshot of product name at time of order
    
    [MaxLength(100)]
    public string ProductSKU { get; set; } = string.Empty; // Snapshot of product SKU at time of order
    
    // Navigation properties
    public virtual Order Order { get; set; } = null!;
    public virtual Product Product { get; set; } = null!;
}

