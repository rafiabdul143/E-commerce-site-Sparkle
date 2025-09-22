using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Sparkle.Domain.Common;
using Sparkle.Domain.Enums;

namespace Sparkle.Domain.Entities;

public class Order : BaseEntity
{
    [Required]
    [MaxLength(50)]
    public string OrderNumber { get; set; } = string.Empty;
    
    public int UserId { get; set; }
    
    public OrderStatus Status { get; set; } = OrderStatus.Pending;
    
    [Column(TypeName = "decimal(18,2)")]
    public decimal SubTotal { get; set; }
    
    [Column(TypeName = "decimal(18,2)")]
    public decimal TaxAmount { get; set; } = 0;
    
    [Column(TypeName = "decimal(18,2)")]
    public decimal ShippingAmount { get; set; } = 0;
    
    [Column(TypeName = "decimal(18,2)")]
    public decimal DiscountAmount { get; set; } = 0;
    
    [Column(TypeName = "decimal(18,2)")]
    public decimal TotalAmount { get; set; }
    
    [MaxLength(3)]
    public string Currency { get; set; } = "USD";
    
    [MaxLength(1000)]
    public string? Notes { get; set; }
    
    public DateTime? ShippedAt { get; set; }
    
    public DateTime? DeliveredAt { get; set; }
    
    // Shipping Address
    [Required]
    [MaxLength(200)]
    public string ShippingFirstName { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(200)]
    public string ShippingLastName { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(500)]
    public string ShippingAddress1 { get; set; } = string.Empty;
    
    [MaxLength(500)]
    public string? ShippingAddress2 { get; set; }
    
    [Required]
    [MaxLength(100)]
    public string ShippingCity { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(100)]
    public string ShippingState { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(20)]
    public string ShippingZipCode { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(100)]
    public string ShippingCountry { get; set; } = string.Empty;
    
    [MaxLength(20)]
    public string? ShippingPhone { get; set; }
    
    // Navigation properties
    public virtual User User { get; set; } = null!;
    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();
}

