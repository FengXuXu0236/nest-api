import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

/**
 * 根模块，注册控制器和服务
 */
@Module({
  imports: [], // 可以在此引入其他模块
  controllers: [AppController], // 注册根控制器
  providers: [AppService],      // 注册根服务
})
export class AppModule {}
