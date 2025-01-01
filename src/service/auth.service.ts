import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from './user.service'
import * as bcrypt from 'bcrypt'
import { LoginDto } from '../dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService, // 用户服务
    private readonly jwtService: JwtService, // JWT 服务
  ) {}

  /**
   * 登录逻辑
   * @param loginDto 登录参数
   * @returns JWT Token
   */
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto

    // 使用 UserService 查找用户
    const user = await this.userService.findByEmail(email)
    if (!user) {
      throw new UnauthorizedException('Invalid email')
    }

    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password')
    }

    // 生成 JWT
    const payload = { sub: user.id, email: user.email }
    const token = this.jwtService.sign(payload)

    return {
      accessToken: token,
      email: user.email,
      id: user.id,
    }
  }
}
