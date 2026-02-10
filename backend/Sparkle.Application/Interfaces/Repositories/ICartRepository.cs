using Sparkle.Domain.Entities;

namespace Sparkle.Application.Interfaces.Repositories;

public interface ICartRepository : IGenericRepository<CartItem>
{
    Task<IEnumerable<CartItem>> GetByUserIdAsync(int userId);
    Task<CartItem?> GetByUserAndProductAsync(int userId, int productId);
    Task ClearCartAsync(int userId);
}

