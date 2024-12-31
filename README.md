<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### 目录结构: 

```ruby
prisma/                         # Prisma 数据访问层
├── migrations/                 # 数据库迁移文件夹
├── schema.prisma               # Prisma 的主配置文件，由 merge-prisma.js 生成
src/                            # 源代码目录
├── config/                     # 配置文件，管理环境变量和应用设置
├── constants/                  # 常量和枚举，存储全局固定值
├── controllers/                # 控制器层，处理 HTTP 请求
├── dto/                        # 数据传输对象，定义请求和响应的数据结构
├── exceptions/                 # 自定义异常类，处理具体错误类型
├── filters/                    # 异常过滤器，捕获和格式化错误响应
├── guards/                     # 守卫，处理路由保护和权限控制
├── interfaces/                 # 接口定义，描述模块的通用接口
├── middlewares/                # 中间件，处理请求的预处理逻辑
├── module/                     # 模块层，组织模块依赖关系
├── pipes/                      # 管道，用于数据验证和转换
├── prisma/                     # 按模块划分的 Prisma 模型文件
├── repositories/               # 仓储层，封装数据库交互逻辑
├── service/                    # 服务层，处理核心业务逻辑
├── types/                      # 类型定义文件，管理全局类型和模块内类型
├── utils/                      # 工具函数，封装通用逻辑
├── app.controller.ts           # 应用根控制器
├── app.module.ts               # 应用根模块
├── app.service.ts              # 应用根服务
├── main.ts                     # 应用程序入口文件
.env                            # 环境变量文件
.gitignore                      # Git 忽略文件
.prettierrc                     # Prettier 配置文件
.eslintrc.js                    # ESLint 配置文件
generate-structure.sh           # 自动生成模块结构的脚本
merge-prisma.js                 # 合并 Prisma 模型的脚本
nest-cli.json                   # NestJS CLI 配置文件
package-lock.json               # 锁定的依赖版本
package.json                    # 项目依赖和脚本配置
README.md                       # 项目说明文档
remove-structure.sh             # 删除模块结构的脚本
tsconfig.build.json             # TypeScript 构建配置
tsconfig.json                   # TypeScript 编译配置

```

