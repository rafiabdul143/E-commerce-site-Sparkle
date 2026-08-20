import { prisma } from '../config/db.config.js';
import { ApiError } from '../utils/apiError.js';

export interface ProductFilterQuery {
  category?: string;
  gender?: string;
  collections?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: 'priceAsc' | 'priceDesc' | 'newest' | 'rating';
  page?: number;
  limit?: number;
}

export class ProductService {
  static async getProducts(query: ProductFilterQuery) {
    const page = query.page || 1;
    const limit = query.limit || 12;
    const skip = (page - 1) * limit;

    const whereClause: any = {};

    if (query.category) {
      whereClause.category = { equals: query.category, mode: 'insensitive' };
    }

    if (query.gender) {
      whereClause.gender = { equals: query.gender, mode: 'insensitive' };
    }

    if (query.collections) {
      whereClause.collections = { equals: query.collections, mode: 'insensitive' };
    }

    if (query.minPrice !== undefined || query.maxPrice !== undefined) {
      whereClause.price = {};
      if (query.minPrice !== undefined) whereClause.price.gte = query.minPrice;
      if (query.maxPrice !== undefined) whereClause.price.lte = query.maxPrice;
    }

    if (query.search) {
      whereClause.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
        { brand: { contains: query.search, mode: 'insensitive' } },
        { sku: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    let orderBy: any = { createdAt: 'desc' };
    if (query.sortBy === 'priceAsc') orderBy = { price: 'asc' };
    if (query.sortBy === 'priceDesc') orderBy = { price: 'desc' };
    if (query.sortBy === 'rating') orderBy = { rating: 'desc' };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: whereClause,
        orderBy,
        skip,
        take: limit,
        include: {
          images: { orderBy: { displayOrder: 'asc' } },
          variants: true,
        },
      }),
      prisma.product.count({ where: whereClause }),
    ]);

    return {
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async getProductById(id: string) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        images: { orderBy: { displayOrder: 'asc' } },
        variants: true,
        reviews: {
          include: { user: { select: { id: true, name: true } } },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!product) {
      throw ApiError.notFound('Product not found');
    }

    return product;
  }

  static async createProduct(data: any) {
    const existingSku = await prisma.product.findUnique({ where: { sku: data.sku } });
    if (existingSku) {
      throw ApiError.badRequest(`Product with SKU ${data.sku} already exists`);
    }

    return await prisma.product.create({
      data: {
        sku: data.sku,
        name: data.name,
        description: data.description,
        price: data.price,
        discountPrice: data.discountPrice,
        countInStock: data.countInStock,
        category: data.category,
        brand: data.brand,
        collections: data.collections,
        material: data.material,
        gender: data.gender,
        images: {
          create: data.images?.map((img: any, idx: number) => ({
            url: img.url,
            altText: img.altText,
            displayOrder: idx,
          })),
        },
        variants: {
          create: data.variants?.map((v: any) => ({
            size: v.size,
            color: v.color,
            stockQuantity: v.stockQuantity || 10,
          })),
        },
      },
      include: { images: true, variants: true },
    });
  }

  static async updateProduct(id: string, data: any) {
    await this.getProductById(id);
    return await prisma.product.update({
      where: { id },
      data,
      include: { images: true, variants: true },
    });
  }

  static async deleteProduct(id: string) {
    await this.getProductById(id);
    await prisma.product.delete({ where: { id } });
    return { success: true, message: 'Product removed successfully' };
  }
}
