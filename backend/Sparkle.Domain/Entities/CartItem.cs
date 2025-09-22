using System.ComponentModel.DataAnnotations;
using Sparkle.Domain.Common;

namespace Sparkle.Domain.Entities;

public class CartItem : BaseEntity
{
    public int UserId { get; set; }
    
    public int ProductId { get; set; }
    
    [Required]
    public int Quantity { get; set; }
    
    // Navigation properties
    public virtual User User { get; set; } = null!;
    public virtual Product Product { get; set; } = null!;
}

