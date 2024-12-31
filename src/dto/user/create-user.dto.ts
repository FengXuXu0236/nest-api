import { IsString, IsNotEmpty, IsEmail, Length, Matches, IsOptional, IsBoolean, IsEnum } from 'class-validator'

/**
 * 用户创建数据传输对象
 * - 用于接收用户的创建请求数据
 */

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Username can only contain letters, numbers, and underscores',
  })
  username: string

  @IsString()
  @IsOptional()
  @Length(1, 30)
  nickname?: string

  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/, {
    message: 'Password must contain at least one letter and one number',
  })
  password: string

  @IsString()
  @IsOptional()
  @Length(1, 50)
  fullName?: string

  @IsString()
  @IsOptional()
  @Matches(/^1[3-9]\d{9}$/, {
    message: 'Phone number must be a valid Chinese mobile number',
  })
  phoneNumber?: string

  @IsString()
  @IsOptional()
  @Length(15, 18)
  idCard?: string

  @IsString()
  @IsOptional()
  @Matches(/^(http|https):\/\/[^\s]+$/, {
    message: 'Avatar URL must be a valid URL',
  })
  avatarUrl?: string

  @IsEnum(['ADMIN', 'USER', 'MODERATOR'])
  @IsOptional()
  role?: 'ADMIN' | 'USER' | 'MODERATOR'

  @IsBoolean()
  @IsOptional()
  isActive?: boolean
}
