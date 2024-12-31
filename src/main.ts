import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

/**
 * 应用程序的入口文件
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // 配置全局设置（如管道、过滤器等）
  app.enableCors() // 启用 CORS 支持

  // 启动应用
  const port = 3000
  await app.listen(port)
  console.log(`Application is running on: http://localhost:${port}`)
}

bootstrap()
