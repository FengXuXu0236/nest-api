import { Controller, Get } from '@nestjs/common'

/**
 * 根控制器，处理基础路由请求
 */
@Controller()
export class AppController {
  constructor() {}

  /**
   * 测试根路由
   * @returns 应用启动成功的消息
   */
  @Get()
  getHello(): string {
    return 'Hello, NestJS!'
  }
}
