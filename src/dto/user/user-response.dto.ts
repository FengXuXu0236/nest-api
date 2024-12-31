import { Exclude, Expose } from 'class-transformer'

/**
 * 用户响应数据传输对象
 * - 定义用户响应的数据结构
 * - 包含所有字段，isDeleted 字段为可选
 */
export class UserResponseDto {
  @Expose()
  id: number // 用户唯一标识

  @Expose()
  username: string // 用户名

  @Expose()
  nickname: string // 用户昵称

  @Expose()
  email: string // 邮箱地址

  @Expose()
  fullName: string // 真实姓名

  @Expose()
  phoneNumber: string // 手机号码

  @Expose()
  idCard: string // 身份证号码

  @Exclude() // 不暴露密码
  password: string

  @Expose()
  secretKey: string // 用户秘钥

  @Expose()
  avatarUrl: string // 用户头像 URL

  @Expose()
  role: string // 用户角色

  @Expose()
  isActive: boolean // 是否激活

  @Expose()
  isDeleted?: boolean // 是否删除（可选字段）

  @Expose()
  isDisabled: boolean // 是否禁用

  @Expose()
  isFrozen: boolean // 是否冻结

  @Expose()
  isSpecial: boolean // 是否特殊

  @Expose()
  isMuted: boolean // 是否禁言

  @Expose()
  lastLogin?: Date // 上次登录时间

  @Expose()
  createdAt: Date // 创建时间

  @Expose()
  updatedAt: Date // 更新时间

  @Expose()
  activatedAt?: Date // 激活时间

  @Expose()
  deletedAt?: Date // 删除时间

  @Expose()
  mutedAt?: Date // 禁言时间

  @Expose()
  disabledAt?: Date // 禁用时间

  @Expose()
  frozenAt?: Date // 冻结时间

  @Expose()
  specialAt?: Date // 设置为特殊用户的时间
}
