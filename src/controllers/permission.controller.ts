import { Controller, Post, Get, Patch, Delete, Body, Param, Query } from '@nestjs/common'
import { PermissionService } from '../service/permission.service'
import { Prisma } from '@prisma/client'

@Controller()
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  /**
   * 创建权限
   */
  @Post()
  async create(@Body() data: Prisma.PermissionCreateInput) {
    return this.permissionService.createPermission(data)
  }

  /**
   * 获取权限列表
   */
  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('size') size = 10,
    @Query() filter: Partial<Prisma.PermissionWhereInput>,
  ) {
    return this.permissionService.getPermissions(+page, +size, filter)
  }

  /**
   * 更新权限
   */
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: Prisma.PermissionUpdateInput) {
    return this.permissionService.updatePermission(+id, data)
  }

  /**
   * 删除权限
   */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.permissionService.deletePermission(+id)
  }
}
