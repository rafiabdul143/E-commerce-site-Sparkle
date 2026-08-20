import { prisma } from '../../config/db.config.js';
import { logger } from '../../utils/logger.js';

export const aiToolDefinitions = [
  {
    name: 'searchCatalog',
    description: 'Search catalog by keyword, gender (Men/Women/Kids), category (Top Wear/Bottom Wear), and max price.',
    parameters: {
      type: 'OBJECT',
      properties: {
        keyword: { type: 'STRING', description: 'Product title, brand or material' },
        gender: { type: 'STRING', description: 'Men, Women, Kids, or Unisex' },
        category: { type: 'STRING', description: 'Category e.g. Top Wear, Bottom Wear, Dresses' },
        maxPrice: { type: 'NUMBER', description: 'Maximum price filter' },
      },
    },
  },
  {
    name: 'checkOrderStatus',
    description: 'Fetch status and details of an order using order ID or order number.',
    parameters: {
      type: 'OBJECT',
      properties: {
        orderId: { type: 'STRING', description: 'Order Number (e.g. SPK-1722300000000) or ID' },
      },
      required: ['orderId'],
    },
  },
];

export async function executeAiTool(name: string, args: any) {
  logger.info(`🤖 Executing AI Tool Call: ${name} with args: ${JSON.stringify(args)}`);

  if (name === 'searchCatalog') {
    const where: any = {};
    if (args.keyword) {
      where.OR = [
        { name: { contains: args.keyword, mode: 'insensitive' } },
        { description: { contains: args.keyword, mode: 'insensitive' } },
        { brand: { contains: args.keyword, mode: 'insensitive' } },
      ];
    }
    if (args.gender) where.gender = { equals: args.gender, mode: 'insensitive' };
    if (args.category) where.category = { equals: args.category, mode: 'insensitive' };
    if (args.maxPrice) where.price = { lte: Number(args.maxPrice) };

    const products = await prisma.product.findMany({
      where,
      take: 5,
      include: { images: { take: 1 } },
    });

    return {
      count: products.length,
      products: products.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        discountPrice: p.discountPrice,
        category: p.category,
        gender: p.gender,
        imageUrl: p.images[0]?.url || null,
      })),
    };
  }

  if (name === 'checkOrderStatus') {
    const order = await prisma.order.findFirst({
      where: {
        OR: [{ id: args.orderId }, { orderNumber: args.orderId }],
      },
      include: { items: true },
    });

    if (!order) return { found: false, message: 'Order not found' };

    return {
      found: true,
      orderNumber: order.orderNumber,
      status: order.status,
      totalPrice: order.totalPrice,
      paymentStatus: order.paymentStatus,
      itemCount: order.items.length,
    };
  }

  return { error: `Unknown tool: ${name}` };
}
