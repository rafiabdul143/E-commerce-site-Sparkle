import { prisma } from '../config/db.config.js';
import { ApiError } from '../utils/apiError.js';
import { OrderStatus, PaymentMethod, PaymentStatus } from '@prisma/client';

export interface CreateOrderInput {
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
    size?: string;
    color?: string;
  }>;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  couponCode?: string;
  paymentMethod: PaymentMethod;
  paypalOrderId?: string;
}

export class OrderService {
  static async createOrder(input: CreateOrderInput) {
    if (!input.items || input.items.length === 0) {
      throw ApiError.badRequest('Order must contain at least one item');
    }

    // 1. Fetch products & calculate subtotal
    let subtotal = 0;
    const orderItemsData: any[] = [];

    for (const item of input.items) {
      const product = await prisma.product.findUnique({ where: { id: item.productId } });
      if (!product) {
        throw ApiError.notFound(`Product with ID ${item.productId} not found`);
      }

      if (product.countInStock < item.quantity) {
        throw ApiError.badRequest(`Insufficient stock for product: ${product.name}`);
      }

      const itemPrice = product.discountPrice || product.price;
      subtotal += itemPrice * item.quantity;

      const firstImage = await prisma.productImage.findFirst({
        where: { productId: product.id },
        orderBy: { displayOrder: 'asc' },
      });

      orderItemsData.push({
        productId: product.id,
        productName: product.name,
        price: itemPrice,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        imageUrl: firstImage?.url || null,
      });
    }

    // 2. Handle Coupon Discount
    let discountAmount = 0;
    if (input.couponCode) {
      const coupon = await prisma.coupon.findUnique({ where: { code: input.couponCode } });
      if (coupon && coupon.isActive) {
        if (coupon.discountPercentage) {
          discountAmount = (subtotal * coupon.discountPercentage) / 100;
        } else if (coupon.discountFlat) {
          discountAmount = coupon.discountFlat;
        }
      }
    }

    const shippingCharge = 10.0;
    const totalPrice = Math.max(0, subtotal - discountAmount + shippingCharge);
    const orderNumber = `SPK-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;

    // 3. Create Transactional Order & Deduct Stock
    return await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId: input.userId,
          orderNumber,
          totalPrice,
          shippingCharge,
          discountAmount,
          couponCode: input.couponCode,
          status: OrderStatus.Pending,
          paymentMethod: input.paymentMethod,
          paymentStatus: input.paypalOrderId ? PaymentStatus.Paid : PaymentStatus.Pending,
          paypalOrderId: input.paypalOrderId,
          shippingFirstName: input.shippingAddress.firstName,
          shippingLastName: input.shippingAddress.lastName,
          shippingAddress: input.shippingAddress.address,
          shippingCity: input.shippingAddress.city,
          shippingPostalCode: input.shippingAddress.postalCode,
          shippingCountry: input.shippingAddress.country,
          shippingPhone: input.shippingAddress.phone,
          items: {
            create: orderItemsData,
          },
        },
        include: { items: true },
      });

      // Deduct product stock
      for (const item of input.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { countInStock: { decrement: item.quantity } },
        });
      }

      return order;
    });
  }

  static async getUserOrders(userId: string) {
    return await prisma.order.findMany({
      where: { userId },
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async getOrderById(id: string, userId?: string) {
    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: true, user: { select: { id: true, name: true, email: true } } },
    });

    if (!order) {
      throw ApiError.notFound('Order not found');
    }

    if (userId && order.userId !== userId) {
      throw ApiError.forbidden('You are not authorized to view this order');
    }

    return order;
  }

  static async updateOrderStatus(id: string, status: OrderStatus) {
    return await prisma.order.update({
      where: { id },
      data: { status },
      include: { items: true },
    });
  }
}
