import { Injectable, UnauthorizedException, ConflictException  } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from './user.service'
import * as bcrypt from 'bcrypt'
import { LoginDto, RegisterDto } from '../dto'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService, // 用户服务
    private readonly jwtService: JwtService, // JWT 服务
    private readonly prisma: PrismaService,
  ) {}

  /**
   * 登录逻辑
   * @param loginDto 登录参数
   * @returns JWT Token
   */
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto

    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        userRoles: {
          include: {
            role: {
              include: {
                permissions: { include: { permission: true } },
              },
            },
          },
        },
      },
    })
    // 使用 UserService 查找用户
    // const user = await this.userService.findByEmail(email)

    if (!user) {
      throw new UnauthorizedException('Invalid email')
    }

    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password')
    }

    // 整理用户的权限列表
    const permissions = new Set<string>()
    user.userRoles.forEach((userRole) => {
      userRole.role.permissions.forEach((rolePermission) => {
        permissions.add(rolePermission.permission.name)
      })
    })

    // 生成 JWT
    // const payload = { sub: user.id, email: user.email }
    const payload = { sub: user }
    const token = this.jwtService.sign(payload)

    return {
      token,
      email: user.email,
      id: user.id,
    }
  }

  /**
   * 用户注册
   * @param registerDto 注册参数
   * @returns 注册成功的用户信息
   */
  async register(registerDto: RegisterDto) {
    const { username, password, email } = registerDto
    // 检查用户名或邮箱是否已存在
    const existingUser = await this.userService.findByUsername(username)
    const existingEmail = await this.userService.findByEmail(email)
    if (existingUser) {
      throw new ConflictException('Username already exists')
    }

    if (existingEmail) {
      throw new ConflictException('Email already exists')
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10)

    // 创建用户
    return this.userService.create({
      username,
      password: hashedPassword,
      email
    })
  }
}
