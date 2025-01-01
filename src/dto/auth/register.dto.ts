import { IsString, IsNotEmpty, IsEmail, IsOptional, Matches } from 'class-validator'

/**
 * 注册数据传输对象
 */
export class RegisterDto {
  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  username: string

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string
}
