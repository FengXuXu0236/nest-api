/**
 * 通用的 API 响应类型
 */
export interface ApiResponse<T = any> {
  isCustom?: boolean
  code: number // 状态码
  message: string // 响应消息
  data?: ApiResponseData<T> // 响应数据
}

/**
 * 响应数据类型
 * - 支持分页和普通数据
 */
export interface ApiResponseData<T = any> {
  page?: number // 当前页码（可选）
  size?: number // 每页大小（可选）
  total?: number // 数据总量（可选）
  list?: T[] // 数据列表（可选）
}

/**
 * 成功响应参数类型
 */
export interface SuccessResponseParams<T = any> {
  data?: ApiResponseData<T> | T // 数据
  message?: string // 消息
  code?: number // 状态码
}

/**
 * 错误响应参数类型
 */
export interface ErrorResponseParams {
  message: string // 错误消息
  code: number // 错误状态码
}
