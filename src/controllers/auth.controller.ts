import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from '../service/auth.service'
import { LoginDto } from '../dto/'

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
}
