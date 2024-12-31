import { IsOptional, IsString, IsBoolean, IsEnum } from 'class-validator'

/**
 * 用户过滤数据传输对象
 * - 用于筛选用户列表
 * - 包含所有带索引的字段（除 ID 外）
 */
export class FilterUserDto {
  @IsOptional()
  @IsString()
  username?: string // 用户名

  @IsOptional()
  @IsString()
  email?: string // 邮箱

  @IsOptional()
  @IsBoolean()
  isActive?: boolean // 是否激活

  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean // 是否删除

  @IsOptional()
  @IsBoolean()
  isDisabled?: boolean // 是否禁用

  @IsOptional()
  @IsBoolean()
  isFrozen?: boolean // 是否冻结

  @IsOptional()
  @IsBoolean()
  isSpecial?: boolean // 是否特殊

  @IsOptional()
  @IsBoolean()
  isMuted?: boolean // 是否禁言

  @IsOptional()
  @IsEnum(['ADMIN', 'USER', 'MODERATOR'], {
    message: 'Role must be one of ADMIN, USER, or MODERATOR',
  })
  role?: 'ADMIN' | 'USER' | 'MODERATOR' // 用户角色
}
