using Sparkle.Domain.Entities;

namespace Sparkle.Application.Interfaces.Repositories;

public interface IProductRepository : IGenericRepository<Product>
{
    Task<IEnumerable<Product>> GetByCategoryAsync(int categoryId);
    Task<IEnumerable<Product>> GetFeaturedProductsAsync();
    Task<IEnumerable<Product>> SearchProductsAsync(string searchTerm);
    Task<Product?> GetBySKUAsync(string sku);
    Task<bool> SKUExistsAsync(string sku);
}

