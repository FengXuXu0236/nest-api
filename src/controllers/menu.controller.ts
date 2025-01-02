import { Controller, Post, Get, Patch, Delete, Body, Param } from '@nestjs/common'
import { MenuService } from '../service/menu.service'
import { Prisma } from '@prisma/client'

@Controller()
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  /**
   * 创建菜单
   */
  @Post()
  async create(@Body() data: Prisma.MenuCreateInput) {
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
   * 更新菜单
   */
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: Prisma.MenuUpdateInput) {
    return this.menuService.updateMenu(+id, data)
  }

  /**
   * 删除菜单
   */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.menuService.deleteMenu(+id)
  }
}
