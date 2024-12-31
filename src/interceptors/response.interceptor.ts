import {  Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { successResponse } from '../utils/response'
import { ApiResponse } from '../types/api'

/**
 * 全局响应拦截器
 * - 格式化所有成功响应为统一格式
 */
@Injectable() // 表示这是一个可注入的服务
export class ResponseInterceptor<T> implements NestInterceptor {
  /**
   * 拦截并处理响应数据
   * @param context 执行上下文，包含请求和响应信息
   * @param next 调用链，用于继续执行后续逻辑
   * @returns Observable<any> 包装后的响应数据流
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 使用 RxJS 的 map 操作符修改响应数据
    return next.handle().pipe(map((response: ApiResponse) => {
      if (response && response.isCustom) {
        delete response.isCustom // 清除标志字段
        const { data } = response
        return data
      }
      return successResponse({ data: response })
    }))
  }
}
