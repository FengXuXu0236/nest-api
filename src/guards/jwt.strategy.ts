import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // 检查 Token 是否过期
      secretOrKey: process.env.JWT_SECRET || 'defaultSecretKey', // 确保密钥一致
    })
  }

  async validate(payload: any) {
    console.log('Decoded JWT Payload:', payload) // 打印 Token 解码内容
    if (!payload) {
      throw new Error('Invalid token payload')
    }
    return { ...payload.sub }
  }
}
