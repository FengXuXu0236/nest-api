import { Injectable } from '@nestjs/common'

/**
 * 根服务类，提供应用核心服务
 */
@Injectable()
export class AppService {
  /**
   * 返回欢迎信息
   * @returns 欢迎消息字符串
   */
  getHello(): string {
    return 'Hello, NestJS!'
  }
}
