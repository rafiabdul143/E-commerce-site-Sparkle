using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Sparkle.Domain.Common;
using Sparkle.Domain.Enums;

namespace Sparkle.Domain.Entities;

public class Payment : BaseEntity
{
    public int OrderId { get; set; }
    
    [Column(TypeName = "decimal(18,2)")]
    public decimal Amount { get; set; }
    
    [MaxLength(3)]
    public string Currency { get; set; } = "USD";
    
    public PaymentStatus Status { get; set; } = PaymentStatus.Pending;
    
    [Required]
    [MaxLength(50)]
    public string PaymentMethod { get; set; } = string.Empty; // e.g., "PayPal", "Stripe", "Credit Card"
    
    [MaxLength(100)]
    public string? TransactionId { get; set; } // External payment provider transaction ID
    
    [MaxLength(100)]
    public string? PaymentIntentId { get; set; } // Payment provider intent ID
    
    [MaxLength(1000)]
    public string? PaymentData { get; set; } // JSON data from payment provider
    
    [MaxLength(500)]
    public string? FailureReason { get; set; }
    
    public DateTime? ProcessedAt { get; set; }
    
    // Navigation properties
    public virtual Order Order { get; set; } = null!;
}

