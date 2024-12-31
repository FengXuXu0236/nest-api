import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common'
import { UserService } from '../service/user.service'
import { CreateUserDto, UpdateUserDto } from '../dto'
import { } from '../dto'

/**
 * 用户控制器
 * - 处理与用户相关的 HTTP 请求
 * - 转发请求到用户服务
 */
@Controller() // 路由前缀
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 创建用户
   * @param createUserDto 用户的创建数据传输对象
   * @returns 创建的用户数据
   */
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  /**
   * 获取所有用户
   * @returns 用户列表
   */
  @Get()
  findAll() {
    return this.userService.findAll()
  }

  /**
   * 获取单个用户
   * @param id 用户 ID
   * @returns 用户详情
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id)
  }

  /**
   * 更新用户
   * @param id 用户 ID
   * @param updateUserDto 用户的更新数据传输对象
   * @returns 更新后的用户数据
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto)
  }

  /**
   * 删除用户
   * @param id 用户 ID
   * @returns 删除成功或失败的信息
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id)
  }
}
