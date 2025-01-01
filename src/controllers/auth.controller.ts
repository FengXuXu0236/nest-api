import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from '../service/auth.service'
import { LoginDto, RegisterDto } from '../dto/'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 用户登录
   * @param loginDto 登录参数
   * @returns JWT Token
   */
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }

  /**
   * 用户注册
   * @param registerDto 注册参数
   * @returns 注册成功的用户信息
   */
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }
}
