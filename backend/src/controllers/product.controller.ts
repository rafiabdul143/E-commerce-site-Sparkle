import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ProductService } from '../services/product.service.js';

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const { category, gender, collections, minPrice, maxPrice, search, sortBy, page, limit } = req.query;

  const result = await ProductService.getProducts({
    category: category as string,
    gender: gender as string,
    collections: collections as string,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    search: search as string,
    sortBy: sortBy as any,
    page: page ? Number(page) : 1,
    limit: limit ? Number(limit) : 12,
  });

  res.status(200).json({ success: true, ...result });
});

export const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const product = await ProductService.getProductById(req.params.id);
  res.status(200).json({ success: true, product });
});

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await ProductService.createProduct(req.body);
  res.status(201).json({ success: true, message: 'Product created successfully', product });
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await ProductService.updateProduct(req.params.id, req.body);
  res.status(200).json({ success: true, message: 'Product updated successfully', product });
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const result = await ProductService.deleteProduct(req.params.id);
  res.status(200).json(result);
});
