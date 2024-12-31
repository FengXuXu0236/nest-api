import { Controller, Get, Post, Body, Query, Param, Patch, Delete, HttpException, HttpStatus  } from '@nestjs/common'
import { UserService } from '../service/user.service'
import { CreateUserDto, UpdateUserDto, PaginationDto } from '../dto'
import { errorResponse } from '../utils/response'
import { HttpCode } from '../constants/http-codes'
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
  @Get('list')
  findAll(@Query() paginationDto: PaginationDto) {
    try{
      return this.userService.findAll(paginationDto)
    }catch (error){
      throw new HttpException('', HttpStatus.NOT_FOUND)
    }
    // return this.userService.findAll()
  }

  /**
   * 获取单个用户
   * @param id 用户 ID
   * @returns 用户详情
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try{
      return this.userService.findOne(+id)
    }catch (error){
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
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
  async remove(@Param('id') id: string) {
    const success = await  this.userService.remove(+id)

    if (!success) {
      return {
        isCustom: true,
        data: errorResponse({ message: '删除失败', code: HttpCode.NO_CONTENT } )
      }
    }

    return {
      isCustom: true,
      data: {
        code: HttpCode.SUCCESS,
        message: '删除成功',
        data: {}
      }
    }
  }
}
