import { Controller, Post, Get, Patch, Delete, Body, Param } from '@nestjs/common'
import { RoleService } from '../service/role.service'

@Controller()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  /**
   * 创建角色
   */
  @Post()
  createRole(@Body() body: { name: string; description?: string }) {
    const { name, description } = body
    return this.roleService.createRole(name, description)
  }

  /**
   * 获取所有角色
   */
  @Get()
  getAllRoles() {
    return this.roleService.getAllRoles()
  }

  /**
   * 更新角色
   */
  @Patch(':id')
  updateRole(
    @Param('id') id: string,
    @Body() body: { name?: string; description?: string },
  ) {
    return this.roleService.updateRole(+id, body)
  }

  /**
   * 删除角色
   */
  @Delete(':id')
  deleteRole(@Param('id') id: string) {
    return this.roleService.deleteRole(+id)
  }

  /**
   * 绑定权限到角色
   */
  @Post('permissions/:id')
  assignPermissions(
    @Param('id') roleId: string,
    @Body() body: { permissionIds: number[] },
  ) {
    return this.roleService.assignPermissions(+roleId, body.permissionIds)
  }

  /**
   * 解绑角色的权限
   */
  @Post('unassignPermissions/:id')
  unassignPermissions(
    @Param('id') roleId: string,
    @Body() body: { permissionIds: number[] },
  ) {
    return this.roleService.unassignPermissions(+roleId, body.permissionIds)
  }

  /**
   * 查询角色的权限
   */
  @Get('permissions/:id')
  async getRolePermissions(@Param('id') roleId: string) {
    return this.roleService.getRolePermissions(+roleId)
  }
}
