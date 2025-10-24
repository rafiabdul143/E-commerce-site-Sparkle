using System.ComponentModel.DataAnnotations;
using Sparkle.Domain.Common;

namespace Sparkle.Domain.Entities;

public class Address : BaseEntity
{
    public int UserId { get; set; }
    
    [Required]
    [MaxLength(200)]
    public string FirstName { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(200)]
    public string LastName { get; set; } = string.Empty;
    
    [MaxLength(100)]
    public string? Company { get; set; }
    
    [Required]
    [MaxLength(500)]
    public string Address1 { get; set; } = string.Empty;
    
    [MaxLength(500)]
    public string? Address2 { get; set; }
    
    [Required]
    [MaxLength(100)]
    public string City { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(100)]
    public string State { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(20)]
    public string ZipCode { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(100)]
    public string Country { get; set; } = string.Empty;
    
    [MaxLength(20)]
    public string? Phone { get; set; }
    
    public bool IsDefault { get; set; } = false;
    
    [MaxLength(50)]
    public string? Type { get; set; } // "Shipping", "Billing", etc.
    
    // Navigation properties
    public virtual User User { get; set; } = null!;
}

