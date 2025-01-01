import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { errorResponse } from '../utils/response'

/**
 * 全局 HTTP 异常过滤器
 * - 捕获所有异常并返回统一的错误响应格式
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()
    // 默认错误信息
    let code = HttpStatus.INTERNAL_SERVER_ERROR // 默认状态码 500
    let message = 'Internal server error' // 默认错误消息

    console.error('Exception caught:', {
      context: exception, // 打印完整上下文
    })
    // 如果是 HttpException 类型，提取具体状态码和消息
    if (exception instanceof HttpException) {
      code = exception.getStatus()
      const exceptionResponse = exception.getResponse()
      message = typeof exceptionResponse === 'string' ? exceptionResponse : (exceptionResponse as any).message || message
    }

    // 返回统一格式的错误响应
    response.status(code).json(errorResponse({ message, code }))
  }
}
