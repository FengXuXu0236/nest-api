import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class PermissionService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 创建权限
   * @param data 权限数据
   * @returns 创建的权限
   */
  async createPermission(data: Prisma.PermissionCreateInput) {
    return this.prisma.permission.create({ data })
  }

  /**
   * 查询所有权限（支持分页和筛选）
   * @param page 页码
   * @param size 每页大小
   * @param filter 过滤条件
   * @returns 权限列表
   */
  async getPermissions(page: number, size: number, filter?: Partial<Prisma.PermissionWhereInput>) {
    const skip = (page - 1) * size
    const take = size

    const [total, permissions] = await this.prisma.$transaction([
      this.prisma.permission.count({ where: filter }),
      this.prisma.permission.findMany({
        where: filter,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
    ])

    return {
      total,
      page,
      size,
      permissions,
    }
  }

  /**
   * 更新权限
   * @param id 权限 ID
   * @param data 更新数据
   * @returns 更新后的权限
   */
  async updatePermission(id: number, data: Prisma.PermissionUpdateInput) {
    return this.prisma.permission.update({
      where: { id },
      data,
    })
  }

  /**
   * 删除权限（软删除）
   * @param id 权限 ID
   * @returns 删除结果
   */
  async deletePermission(id: number) {
    return this.prisma.permission.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    })
  }
}
