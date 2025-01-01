import { IsString, IsNotEmpty } from 'class-validator'

/**
 * 登录数据传输对象
 * - 验证登录时的用户名和密码
 */
export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  email: string

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string
}
