import { Injectable, NotFoundException  } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma, Menu } from '@prisma/client'

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 创建菜单
   * @param data 菜单数据
   * @returns 创建的菜单
   */
  async createMenu(data: Prisma.MenuCreateInput) {
    return this.prisma.menu.create({ data })
  }

  /**
   * 获取所有菜单（支持层级结构）
   * @returns 菜单树
   */
  async getMenuTree() {
    // 从数据库中加载菜单
    const menus = await this.prisma.menu.findMany({
      where: { isDeleted: false, isDisabled: false },
      orderBy: { sort: 'asc' }, // 根据排序字段排序
    })

    // 构建树形菜单
    return this.buildMenuTree(menus)
  }

  /**
   * 构建菜单树
   * @param menus 扁平菜单列表
   * @returns 树形结构菜单
   */
  private buildMenuTree(menus: Menu[]) {
    const menuMap = new Map<number, any>()

    // 初始化每个菜单节点
    menus.forEach((menu) => {
      menuMap.set(menu.id, {
        path: menu.path,
        name: menu.name,
        meta: {
          title: menu.name,
          icon: menu.icon || '',
          hidden: menu.isHidden || false,
        },
        component: menu.component || 'Layout',
        children: [],
        sort: menu.sort,
      })
    })

    const tree = []
    menus.forEach((menu) => {
      const currentNode = menuMap.get(menu.id)
      if (menu.parentId) {
        const parent = menuMap.get(menu.parentId)
        if (parent) {
          parent.children.push(currentNode)
        }
      } else {
        tree.push(currentNode)
      }
    })

    return { list: tree }
  }

  /**
   * 获取所有菜单（支持层级结构）
   * @returns 菜单树
   */
  async getMenuTreeToList() {
    // 从数据库中加载菜单
    const menus = await this.prisma.menu.findMany({
      where: { isDeleted: false },
      orderBy: { sort: 'asc' }, // 根据排序字段排序
    })

    // 构建树形菜单
    return this.buildMenuTreeToList(menus)
  }

  /**
   * 构建菜单树
   * @param menus 扁平菜单列表
   * @returns 树形结构菜单
   */
  private buildMenuTreeToList(menus: Menu[]) {
    const menuMap = new Map<number, any>()

    // 初始化每个菜单节点
    menus.forEach((menu) => {
      menuMap.set(menu.id, {
        id: menu.id,
        name: menu.name,
        description: menu.description,
        path: menu.path,
        title: menu.name,
        icon: menu.icon || '',
        component: menu.component || 'Layout',
        sort: menu.sort,
        parentId: menu.parentId,
        hidden: menu.isHidden ? 1 : 0,
        isDisabled: menu.isDisabled ? 1 : 0,
        createdAt: menu.createdAt,
        updatedAt: menu.updatedAt,
        children: [],
      })
    })

    const tree = []
    menus.forEach((menu) => {
      const currentNode = menuMap.get(menu.id)
      if (menu.parentId) {
        const parent = menuMap.get(menu.parentId)
        if (parent) {
          parent.children.push(currentNode)
        }
      } else {
        tree.push(currentNode)
      }
    })

    return { list: tree }
  }

  /**
   * 更新菜单
   * @param id 菜单 ID
   * @param data 更新数据
   * @returns 更新后的菜单
   */
  async updateMenu(id: number, data: Prisma.MenuUpdateInput) {
    return this.prisma.menu.update({
      where: { id },
      data,
    })
  }

  /**
   * 删除菜单（软删除）
   * @param id 菜单 ID
   * @returns 删除结果
   */
  async deleteMenu(id: number) {
    return this.prisma.menu.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    })
  }

  /**
   * 绑定权限到菜单
   * @param menuId 菜单 ID
   * @param permissionIds 权限 ID 列表
   * @returns 绑定结果
   */
  async assignPermissions(menuId: number, permissionIds: number[]) {
    // 检查菜单是否存在
    const menu = await this.prisma.menu.findUnique({ where: { id: menuId } })
    if (!menu) throw new NotFoundException('Menu not found')

    // 插入权限绑定关系
    return this.prisma.menuPermission.createMany({
      data: permissionIds.map((permissionId) => ({
        menuId,
        permissionId,
      })),
      skipDuplicates: true, // 防止重复绑定
    })
  }

  /**
   * 解绑菜单的权限
   * @param menuId 菜单 ID
   * @param permissionIds 权限 ID 列表
   * @returns 删除结果
   */
  async unassignPermissions(menuId: number, permissionIds: number[]) {
    return this.prisma.menuPermission.deleteMany({
      where: {
        menuId,
        permissionId: { in: permissionIds },
      },
    })
  }

  /**
   * 查询菜单的权限
   * @param menuId 菜单 ID
   * @returns 权限列表
   */
  async getMenuPermissions(menuId: number) {
    // 检查菜单是否存在
    const menu = await this.prisma.menu.findUnique({
      where: { id: menuId },
      include: { permissions: { include: { permission: true } } }, // 加载权限信息
    })
    if (!menu) throw new NotFoundException('Menu not found')

    return menu.permissions.map((mp) => mp.permission)
  }
}
