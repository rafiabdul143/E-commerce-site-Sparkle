using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Sparkle.Application.Interfaces.Repositories;
using Sparkle.Application.DTOs;

namespace Sparkle.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public CategoriesController(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories()
    {
        var categories = await _unitOfWork.Categories.GetAllAsync();
        var categoryDtos = _mapper.Map<IEnumerable<CategoryDto>>(categories);
        return Ok(categoryDtos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CategoryDto>> GetCategory(int id)
    {
        var category = await _unitOfWork.Categories.GetByIdAsync(id);
        
        if (category == null)
        {
            return NotFound();
        }

        var categoryDto = _mapper.Map<CategoryDto>(category);
        return Ok(categoryDto);
    }
}

