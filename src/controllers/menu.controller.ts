import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards  } from '@nestjs/common'
import { MenuService } from '../service/menu.service'
import { Prisma } from '@prisma/client'
import { Roles } from '../decorators/roles.decorator'

@Controller()
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  /**
   * 创建菜单
   */
  @Post()
  async create(@Body() data: Prisma.MenuCreateInput) {
    data.isHidden = !!data.isHidden
    data.isDisabled = !!data.isDisabled
    return this.menuService.createMenu(data)
  }

  /**
   * 获取菜单树
   */
  @Get()
  async findAll() {
    return this.menuService.getMenuTree()
  }

  /**
   * 获取菜单树
   */
  @Get('list')
  async getList() {
    return this.menuService.getMenuTreeToList()
  }

  /**
   * 更新菜单
   */
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: Prisma.MenuUpdateInput) {
    data.isHidden = !!data.isHidden
    data.isDisabled = !!data.isDisabled
    return this.menuService.updateMenu(+id, data)
  }

  /**
   * 删除菜单
   */
  @Roles('Admin')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.menuService.deleteMenu(+id)
  }

  /**
   * 绑定权限到菜单
   */
  @Post('permissions/:id')
  async assignPermissions(
    @Param('id') menuId: string,
    @Body() body: { permissionIds: number[] },
  ) {
    return this.menuService.assignPermissions(+menuId, body.permissionIds)
  }

  /**
   * 解绑菜单的权限
   */
  @Post('unassignPermissions/:id')
  async unassignPermissions(
    @Param('id') menuId: string,
    @Body() body: { permissionIds: number[] },
  ) {
    return this.menuService.unassignPermissions(+menuId, body.permissionIds)
  }

  /**
   * 查询菜单的权限
   */
  @Get('permissions/:id')
  async getMenuPermissions(@Param('id') menuId: string) {
    return this.menuService.getMenuPermissions(+menuId)
  }

}
