import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 创建角色
   * @param name 角色名称
   * @param description 角色描述
   * @returns 创建的角色
   */
  async createRole(name: string, description?: string) {
    return this.prisma.role.create({
      data: { name, description },
    })
  }

  /**
   * 获取所有角色
   * @returns 角色列表
   */
  async getAllRoles() {
    return this.prisma.role.findMany({
      where: { isDeleted: false },
    })
  }

  /**
   * 更新角色
   * @param id 角色 ID
   * @param data 更新数据
   * @returns 更新后的角色
   */
  async updateRole(id: number, data: { name?: string; description?: string }) {
    const role = await this.prisma.role.findUnique({ where: { id } })
    if (!role || role.isDeleted) {
      throw new NotFoundException('Role not found or has been deleted')
    }
    return this.prisma.role.update({
      where: { id },
      data,
    })
  }

  /**
   * 删除角色（软删除）
   * @param id 角色 ID
   * @returns 删除结果
   */
  async deleteRole(id: number) {
    const role = await this.prisma.role.findUnique({ where: { id } })
    if (!role || role.isDeleted) {
      throw new NotFoundException('Role not found or has been deleted')
    }
    return this.prisma.role.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    })
  }

  /**
   * 绑定权限到角色
   * @param roleId 角色 ID
   * @param permissionIds 权限 ID 列表
   * @returns 更新结果
   */
  async assignPermissions(roleId: number, permissionIds: number[]) {
    return this.prisma.rolePermission.createMany({
      data: permissionIds.map((permissionId) => ({
        roleId,
        permissionId,
      })),
      skipDuplicates: true, // 避免重复绑定
    })
  }

  /**
   * 解绑角色的权限
   * @param roleId 角色 ID
   * @param permissionIds 权限 ID 列表
   * @returns 更新结果
   */
  async unassignPermissions(roleId: number, permissionIds: number[]) {
    return this.prisma.rolePermission.deleteMany({
      where: {
        roleId,
        permissionId: { in: permissionIds },
      },
    })
  }

  /**
   * 查询角色的权限
   * @param roleId 角色 ID
   * @returns 权限列表
   */
  async getRolePermissions(roleId: number) {
    // 检查角色是否存在
    const role = await this.prisma.role.findUnique({
      where: { id: roleId },
      include: { permissions: { include: { permission: true } } }, // 加载权限信息
    })
    if (!role) throw new NotFoundException('Role not found')

    return role.permissions.map((rp) => rp.permission)
  }
}
