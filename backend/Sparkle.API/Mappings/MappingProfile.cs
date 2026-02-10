using AutoMapper;
using Sparkle.Domain.Entities;
using Sparkle.Application.DTOs;

namespace Sparkle.API.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Product mappings
        CreateMap<Product, ProductDto>();
        CreateMap<ProductImage, ProductImageDto>();
        CreateMap<Category, CategoryDto>();
        
        // User mappings
        CreateMap<User, UserDto>();
        CreateMap<CreateUserDto, User>();
    }
}

