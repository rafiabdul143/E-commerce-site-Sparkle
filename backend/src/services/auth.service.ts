import bcrypt from 'bcryptjs';
import jwt, { type SignOptions } from 'jsonwebtoken';
import { prisma } from '../config/db.config.js';
import { env } from '../config/env.config.js';
import { ApiError } from '../utils/apiError.js';
import { Role } from '@prisma/client';

export class AuthService {
  static async register(name: string, email: string, password: string, phone?: string) {
    if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
      throw ApiError.badRequest('Name must be between 2 and 100 characters');
    }
    if (typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
      throw ApiError.badRequest('Please provide a valid email address');
    }
    if (typeof password !== 'string' || password.length < 8 || password.length > 128) {
      throw ApiError.badRequest('Password must be between 8 and 128 characters');
    }
    const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
    if (existing) {
      throw ApiError.badRequest('User with this email already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        passwordHash,
        phone,
        role: Role.USER,
      },
    });

    const token = this.generateToken(user.id, user.email, user.role);

    return {
      user: { id: user.id, name: user.name, email: user.email, role: user.role, phone: user.phone },
      token,
    };
  }

  static async login(email: string, password: string) {
    if (typeof email !== 'string' || typeof password !== 'string') {
      throw ApiError.badRequest('Email and password are required');
    }
    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
    if (!user) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    const token = this.generateToken(user.id, user.email, user.role);

    return {
      user: { id: user.id, name: user.name, email: user.email, role: user.role, phone: user.phone },
      token,
    };
  }

  static generateToken(id: string, email: string, role: Role): string {
    return jwt.sign({ id, email, role }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
    });
  }
}
