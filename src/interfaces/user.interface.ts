/**
 * 用户接口
 * - 描述用户实体的字段和结构
 */
export interface User {
  id: number
  username: string
  nickname: string
  email: string
  fullName: string
  phoneNumber: string
  idCard: string
  password: string
  secretKey: string
  avatarUrl: string
  role: string
  isActive: boolean
  isDeleted: boolean
  isDisabled: boolean
  isFrozen: boolean
  isSpecial: boolean
  isMuted: boolean
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
  activatedAt?: Date
  deletedAt?: Date
  mutedAt?: Date
  disabledAt?: Date
  frozenAt?: Date
  specialAt?: Date
}
