import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

/**
 * Prisma 服务
 * - 封装 Prisma Client，用于数据库交互
 */
@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super()
  }
}
