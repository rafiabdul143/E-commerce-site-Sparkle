# Sparkle E-commerce Backend

A clean architecture .NET 8 Web API for the Sparkle e-commerce platform.

## Project Structure

```
backend/
├── Sparkle.API/              # Web API layer
├── Sparkle.Application/       # Application services and interfaces
├── Sparkle.Domain/           # Domain entities and enums
└── Sparkle.Infrastructure/   # Data access and external services
```

## Architecture

This project follows Clean Architecture principles with clear separation of concerns:

- **Domain Layer**: Contains business entities, enums, and domain logic
- **Application Layer**: Contains application services, DTOs, and interfaces
- **Infrastructure Layer**: Contains data access implementations and external service integrations
- **API Layer**: Contains controllers and API configuration

## Features

### Domain Entities
- **User**: User management with authentication
- **Category**: Product categorization
- **Product**: Product catalog with images
- **Order**: Order processing and management
- **CartItem**: Shopping cart functionality
- **Payment**: Payment processing
- **Address**: User address management

### API Endpoints
- **Products**: CRUD operations, search, filtering by category
- **Categories**: Category management
- **Users**: User registration and authentication (planned)
- **Orders**: Order management (planned)
- **Cart**: Shopping cart operations (planned)

## Getting Started

### Prerequisites
- .NET 8 SDK
- SQL Server or SQL Server LocalDB
- Entity Framework Core Tools

### Setup Instructions

1. **Install EF Core Tools** (if not already installed):
   ```bash
   dotnet tool install --global dotnet-ef
   ```

2. **Update Connection String**:
   Update the connection string in `Sparkle.API/appsettings.json`:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=SparkleEcommerce;Trusted_Connection=true;MultipleActiveResultSets=true"
     }
   }
   ```

3. **Create Database Migration**:
   ```bash
   cd backend
   dotnet ef migrations add InitialCreate --project Sparkle.Infrastructure --startup-project Sparkle.API
   ```

4. **Update Database**:
   ```bash
   dotnet ef database update --project Sparkle.Infrastructure --startup-project Sparkle.API
   ```

5. **Run the Application**:
   ```bash
   cd Sparkle.API
   dotnet run
   ```

The API will be available at:
- HTTP: `http://localhost:5000`
- HTTPS: `https://localhost:5001`
- Swagger UI: `https://localhost:5001/swagger`

## Configuration

### CORS
The API is configured to allow requests from:
- `http://localhost:3000` (React development server)
- `http://localhost:5173` (Vite development server)

### Database
- Uses Entity Framework Core with SQL Server
- Implements soft delete functionality
- Automatic timestamp management (CreatedAt, UpdatedAt)
- Comprehensive relationships between entities

## Repository Pattern

The project implements the Repository pattern with Unit of Work:

- **Generic Repository**: Base CRUD operations
- **Specialized Repositories**: Entity-specific operations
- **Unit of Work**: Transaction management and repository coordination

## AutoMapper

AutoMapper is configured for object-to-object mapping between:
- Domain entities and DTOs
- Request/Response models

## Next Steps

1. **Authentication & Authorization**:
   - JWT token implementation
   - User registration and login endpoints
   - Role-based authorization

2. **Order Management**:
   - Order creation and processing
   - Payment integration
   - Order status tracking

3. **Shopping Cart**:
   - Cart management endpoints
   - Session-based cart for anonymous users

4. **Advanced Features**:
   - Product search and filtering
   - Inventory management
   - Email notifications
   - File upload for product images

## API Documentation

Once running, visit `/swagger` for interactive API documentation.

## Database Schema

The database includes the following main tables:
- Users
- Categories
- Products
- ProductImages
- Orders
- OrderItems
- CartItems
- Payments
- Addresses

All tables include soft delete functionality and automatic timestamp management.

