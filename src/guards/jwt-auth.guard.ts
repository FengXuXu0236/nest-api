import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // 添加自定义逻辑 (可选)
    console.log('JwtAuthGuard')
    return super.canActivate(context)
  }

  handleRequest(err, user) {
    console.log('JWT Guard Error:', err) // 打印守卫错误
    console.log('Decoded User:', user) // 打印解码后的用户信息
    if (err || !user) {
      throw new UnauthorizedException('Invalid or missing token')
    }
    return user
  }
}
