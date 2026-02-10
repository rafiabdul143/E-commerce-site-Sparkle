using Microsoft.EntityFrameworkCore;
using Sparkle.Application.Interfaces.Repositories;
using Sparkle.Domain.Entities;
using Sparkle.Infrastructure.Data;

namespace Sparkle.Infrastructure.Repositories;

public class CartRepository : GenericRepository<CartItem>, ICartRepository
{
    public CartRepository(SparkleDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<CartItem>> GetByUserIdAsync(int userId)
    {
        return await _dbSet
            .Include(ci => ci.Product)
                .ThenInclude(p => p.Images)
            .Include(ci => ci.Product.Category)
            .Where(ci => ci.UserId == userId)
            .ToListAsync();
    }

    public async Task<CartItem?> GetByUserAndProductAsync(int userId, int productId)
    {
        return await _dbSet
            .Include(ci => ci.Product)
            .FirstOrDefaultAsync(ci => ci.UserId == userId && ci.ProductId == productId);
    }

    public async Task ClearCartAsync(int userId)
    {
        var cartItems = await _dbSet
            .Where(ci => ci.UserId == userId)
            .ToListAsync();
        
        _dbSet.RemoveRange(cartItems);
    }
}

