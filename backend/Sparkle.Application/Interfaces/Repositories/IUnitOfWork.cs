namespace Sparkle.Application.Interfaces.Repositories;

public interface IUnitOfWork : IDisposable
{
    IUserRepository Users { get; }
    IGenericRepository<Domain.Entities.Category> Categories { get; }
    IProductRepository Products { get; }
    IGenericRepository<Domain.Entities.ProductImage> ProductImages { get; }
    IOrderRepository Orders { get; }
    IGenericRepository<Domain.Entities.OrderItem> OrderItems { get; }
    ICartRepository Cart { get; }
    IGenericRepository<Domain.Entities.Payment> Payments { get; }
    IGenericRepository<Domain.Entities.Address> Addresses { get; }
    
    Task<int> SaveChangesAsync();
    Task BeginTransactionAsync();
    Task CommitTransactionAsync();
    Task RollbackTransactionAsync();
}

