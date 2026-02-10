using Microsoft.EntityFrameworkCore;
using Sparkle.Application.Interfaces.Repositories;
using Sparkle.Domain.Entities;
using Sparkle.Infrastructure.Data;

namespace Sparkle.Infrastructure.Repositories;

public class UserRepository : GenericRepository<User>, IUserRepository
{
    public UserRepository(SparkleDbContext context) : base(context)
    {
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        return await _dbSet.FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task<bool> EmailExistsAsync(string email)
    {
        return await _dbSet.AnyAsync(u => u.Email == email);
    }
}

