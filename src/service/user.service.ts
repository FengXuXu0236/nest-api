import { Injectable } from '@nestjs/common'
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
    const user = await this.prisma.user.findUnique({ where: { id } })
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
}
