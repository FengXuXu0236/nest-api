import { SetMetadata } from '@nestjs/common'

/**
 * 权限装饰器，用于标注需要权限的路由
 * @param permissions 需要的权限列表
 */
export const Permissions = (...permissions: string[]) =>
  SetMetadata('permissions', permissions)
