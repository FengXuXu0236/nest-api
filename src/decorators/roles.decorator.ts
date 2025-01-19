import { SetMetadata } from '@nestjs/common'

/**
 * 用于声明接口可访问的角色
 * @param roles 允许访问的角色列表
 */
export const Roles = (...roles: string[]) => SetMetadata('roles', roles)
