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
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  /**
   * 守卫逻辑，检查用户是否具有所需权限
   * @param context 执行上下文
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    )
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true // 如果没有定义权限，则允许访问
    }

    const request = context.switchToHttp().getRequest<Request>()
    const user = request.user as User

    if (!user) {
      throw new ForbiddenException('User not authenticated')
    }

    // 检查用户权限
    const userPermissions: string[] = user.permissions || []
    const hasPermission = requiredPermissions.every((perm) =>
      userPermissions.includes(perm),
    )

    if (!hasPermission) {
      throw new ForbiddenException('You do not have the required permissions')
    }

    return true
  }
}
