import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto, UpdateUserDto } from '../dto'

/**
 * 用户存储库
 * - 封装与用户表相关的数据库操作
 */
@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 创建用户
   * @param createUserDto 用户创建 DTO
   * @returns 创建的用户
   */
  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto
    })
  }

  /**
   * 查询所有未删除的用户
   * @returns 用户列表
   */
  async findAll() {
    return this.prisma.user.findMany({
      where: { isDeleted: false }
    })
  }

  /**
   * 查询单个用户
   * @param id 用户 ID
   * @returns 用户详情
   */
  async findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } })
  }

  /**
   * 更新用户信息
   * @param id 用户 ID
   * @param updateUserDto 用户更新 DTO
   * @returns 更新后的用户
   */
  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto
    })
  }

  /**
   * 软删除用户
   * @param id 用户 ID
   * @returns 软删除标记后的用户
   */
  async remove(id: number) {
    return this.prisma.user.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() }
    })
  }
}
