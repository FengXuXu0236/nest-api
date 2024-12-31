import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'

/**
 * 用户更新数据传输对象
 * - 继承用户创建 DTO 的结构，所有字段变为可选
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {}
