import { Routes } from '@nestjs/core'
import { MenuModule } from '../module/menu.module'

export const menuRoutes: Routes = [
  {
    path: 'menus',
    module: MenuModule,
  },
]
