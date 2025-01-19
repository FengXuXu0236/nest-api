import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // 检查 Token 是否过期
      secretOrKey: process.env.JWT_SECRET || 'defaultSecretKey', // 确保密钥一致
    })
    console.log('jwtFromRequest', ExtractJwt.fromAuthHeaderAsBearerToken())
  }

  async validate(payload: any) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub.id },
      include: {
        userRoles: {
          include: { role: true }, // 加载用户角色信息
        },
      },
    })

    if (!user) {
      throw new Error('User not found')
    }

    // 提取用户的角色名称
    const roles = user.userRoles.map((ur) => ur.role.name)
    // console.log('JwtStrategy Payload:', payload) // 打印 Token 解码内容
    if (!payload) {
      throw new Error('Invalid token payload')
    }
    return {
      ...payload.sub,
      roles, // 将角色名称数组附加到用户对象
    }
  }
}
