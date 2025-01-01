import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ClassSerializerInterceptor } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { HttpExceptionFilter } from './filters/http-exception.filter'
import { ResponseInterceptor } from './interceptors/response.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // 启用 CORS 支持
  app.enableCors({
    origin: '*', // 允许所有来源访问
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // 允许的 HTTP 方法
    allowedHeaders: 'Content-Type, Accept, Authorization', // 允许的请求头
    credentials: true, // 允许发送 Cookie
  })

  // 注册全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter())
  // 注册全局响应拦截器
  app.useGlobalInterceptors(new ResponseInterceptor())
  // 启用全局验证管道
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // 自动去除未在 DTO 中定义的字段
    forbidNonWhitelisted: true, // 如果传递了 DTO 中未定义的字段则抛出错误
    transform: true, // 自动将请求参数转换为 DTO 实例
  }))

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  await app.listen(3000)
}
bootstrap()
