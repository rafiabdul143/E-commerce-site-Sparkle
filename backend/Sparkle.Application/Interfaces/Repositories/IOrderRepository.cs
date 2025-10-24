using Sparkle.Domain.Entities;
using Sparkle.Domain.Enums;

namespace Sparkle.Application.Interfaces.Repositories;

public interface IOrderRepository : IGenericRepository<Order>
{
    Task<IEnumerable<Order>> GetByUserIdAsync(int userId);
    Task<Order?> GetByOrderNumberAsync(string orderNumber);
    Task<IEnumerable<Order>> GetByStatusAsync(OrderStatus status);
    Task<string> GenerateOrderNumberAsync();
}

