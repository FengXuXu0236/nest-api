import { Injectable, NotFoundException  } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { plainToInstance } from 'class-transformer'
import { CreateUserDto, UpdateUserDto, UserResponseDto, PaginationDto } from '../dto'

/**
 * 用户服务
 * - 处理用户模块的核心业务逻辑
 * - 与数据库交互（通过 PrismaService）
 */
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 创建用户
   * @param createUserDto 用户的创建数据传输对象
   * @returns 创建的用户数据
   */
  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto
    })
  }

  /**
   * 获取所有用户
   * @returns 用户列表
   */
  async findAll(paginationDto: PaginationDto) {
    const { page, size } = paginationDto
    // 查询数据列表
    const list = await this.prisma.user.findMany({
      skip: (page - 1) * size, // 跳过的记录数
      take: size, // 查询记录数
      where: { isDeleted: false } // 排除已软删除的用户
    })
    // 查询总记录数
    const total = await this.prisma.user.count()

    return {
      list, // 数据列表
      total, // 总记录数
      page, // 当前页码
      size, // 每页记录数
    }

    // return this.prisma.user.findMany({
    //   where: { isDeleted: false } // 排除已软删除的用户
    // })
  }

  /**
   * 获取单个用户
   * @param id 用户 ID
   * @returns 用户详情
   */
  async findOne(id: number) {
    const where = { id }
    const select = {
      id: true,
      username: true,
      nickname: true,
      email: true,
      fullName: true,
      phoneNumber: true,
      idCard: true,
      avatarUrl: true,
      roles: true,
      lastLogin: true,
      createdAt: true,
      updatedAt: true,
      activatedAt: true,
    }
    const user = await this.prisma.user.findUnique({ where, select })
    return plainToInstance(UserResponseDto, user)
  }

  /**
   * 更新用户
   * @param id 用户 ID
   * @param updateUserDto 用户的更新数据传输对象
   * @returns 更新后的用户数据
   */
  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto
    })
  }

  /**
   * 删除用户（软删除）
   * @param id 用户 ID
   * @returns 删除成功的信息
   */
  async remove(id: number) {
    try{
      await this.prisma.user.update({
        where: { id },
        data: { isDeleted: true, deletedAt: new Date() } // 标记为软删除
      })
      return true
    }catch (error) {
      return false
    }
  }

  /**
   * 根据用户名查找用户
   * @param email 用户名
   * @returns 用户数据
   */
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email, isDeleted: false },
    })
  }

  /**
   * 根据用户名查找用户
   * @param username 用户名
   * @returns 用户信息
   */
  async findByUsername(username: string) {
    return this.prisma.user.findUnique({ where: { username, isDeleted: false } })
  }

  /**
   * 绑定角色到用户
   * @param userId 用户 ID
   * @param roleIds 角色 ID 列表
   * @returns 绑定结果
   */
  async assignRoles(userId: number, roleIds: number[]) {
    // 检查用户是否存在
    const user = await this.prisma.user.findUnique({ where: { id: userId } })
    if (!user) {
      throw new NotFoundException('User not found')
    }

    // 插入用户-角色关联关系
    return this.prisma.userRole.createMany({
      data: roleIds.map((roleId) => ({
        userId,
        roleId,
      })),
      skipDuplicates: true, // 避免重复绑定
    })
  }

  /**
   * 解绑用户的角色
   * @param userId 用户 ID
   * @param roleIds 角色 ID 列表
   * @returns 删除结果
   */
  async unassignRoles(userId: number, roleIds: number[]) {
    return this.prisma.userRole.deleteMany({
      where: {
        userId,
        roleId: { in: roleIds },
      },
    })
  }

  /**
   * 查询用户的角色
   * @param userId 用户 ID
   * @returns 用户的角色列表
   */
  async getUserRoles(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { userRoles: { include: { role: true } } }, // 加载角色信息
    })
    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user.userRoles.map((userRole) => userRole.role)
  }
}
