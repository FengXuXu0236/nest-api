import { IsOptional, IsInt, Min } from 'class-validator'
import { Transform } from 'class-transformer'

/**
 * 分页参数 DTO
 * - 接收并验证 page 和 size 参数
 */
export class PaginationDto {
  @IsOptional() // 参数可选
  @Transform(({ value }) => parseInt(value, 10)) // 转换为数字
  @IsInt({ message: 'page must be an integer' }) // 验证为整数
  @Min(1, { message: 'page must be at least 1' }) // 最小值为 1
  page: number = 1 // 默认值为 1

  @IsOptional() // 参数可选
  @Transform(({ value }) => parseInt(value, 10)) // 转换为数字
  @IsInt({ message: 'size must be an integer' }) // 验证为整数
  @Min(1, { message: 'size must be at least 1' }) // 最小值为 1
  size: number = 10 // 默认值为 10
}
