import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { User } from '../interfaces/user.interface'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 获取允许访问的角色
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    )
    if (!requiredRoles || requiredRoles.length === 0) {
      return true // 如果未定义角色，则允许访问
    }

    // 获取当前用户
    const request = context.switchToHttp().getRequest<Request>()
    const user = request.user as User
    console.log('requiredRoles', requiredRoles)
    console.log('user', user)
    if (!user) {
      throw new ForbiddenException('User not authenticated')
    }

    // 检查用户是否具有所需角色
    const hasRole = requiredRoles.some((role) => user.roles?.includes(role))

    if (!hasRole) {
      throw new ForbiddenException('You do not have the required role')
    }

    return true
  }
}
