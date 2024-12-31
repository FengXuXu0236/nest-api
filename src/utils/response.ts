import {
  ApiResponse,
  SuccessResponseParams,
  ErrorResponseParams,
} from '../types/api'

/**
 * 工具函数：成功响应格式
 * @param options 成功响应参数
 * @returns 格式化后的成功响应
 */
export function successResponse<T = any>({  data = {},  message = 'success',  code = 200 }: SuccessResponseParams<T> = {}): ApiResponse<T> {
  return {
    code, // 状态码
    message, // 响应消息
    data, // 返回数据
  }
}

/**
 * 工具函数：错误响应格式
 * @param options 错误响应参数
 * @returns 格式化后的错误响应
 */
export function errorResponse({ message = '',  code = 0 }: ErrorResponseParams): ApiResponse<null> {
  return {
    code, // 状态码
    message, // 错误消息
    data: {}, // 错误时返回空数据对象
  }
}
