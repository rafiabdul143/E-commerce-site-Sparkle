using Microsoft.EntityFrameworkCore.Storage;
using Sparkle.Application.Interfaces.Repositories;
using Sparkle.Domain.Entities;
using Sparkle.Infrastructure.Data;

namespace Sparkle.Infrastructure.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly SparkleDbContext _context;
    private IDbContextTransaction? _transaction;

    public UnitOfWork(SparkleDbContext context)
    {
        _context = context;
        Users = new UserRepository(_context);
        Categories = new GenericRepository<Category>(_context);
        Products = new ProductRepository(_context);
        ProductImages = new GenericRepository<ProductImage>(_context);
        Orders = new OrderRepository(_context);
        OrderItems = new GenericRepository<OrderItem>(_context);
        Cart = new CartRepository(_context);
        Payments = new GenericRepository<Payment>(_context);
        Addresses = new GenericRepository<Address>(_context);
    }

    public IUserRepository Users { get; }
    public IGenericRepository<Category> Categories { get; }
    public IProductRepository Products { get; }
    public IGenericRepository<ProductImage> ProductImages { get; }
    public IOrderRepository Orders { get; }
    public IGenericRepository<OrderItem> OrderItems { get; }
    public ICartRepository Cart { get; }
    public IGenericRepository<Payment> Payments { get; }
    public IGenericRepository<Address> Addresses { get; }

    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }

    public async Task BeginTransactionAsync()
    {
        _transaction = await _context.Database.BeginTransactionAsync();
    }

    public async Task CommitTransactionAsync()
    {
        if (_transaction != null)
        {
            await _transaction.CommitAsync();
            await _transaction.DisposeAsync();
            _transaction = null;
        }
    }

    public async Task RollbackTransactionAsync()
    {
        if (_transaction != null)
        {
            await _transaction.RollbackAsync();
            await _transaction.DisposeAsync();
            _transaction = null;
        }
    }

    public void Dispose()
    {
        _transaction?.Dispose();
        _context.Dispose();
    }
}

