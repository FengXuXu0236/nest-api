
# 项目名称

## 项目介绍
本项目基于 NestJS 框架构建，提供模块化、可扩展的后端架构，集成了 Prisma 数据库管理工具，并遵循统一的代码风格和目录结构。

## 技术栈说明
本项目基于 Node.js 和 NestJS 开发，采用模块化和分层架构设计，集成了现代化的工具和技术栈，确保项目高效、可扩展。

## 核心技术
| 技术/工具             | 版本范围或链接		    | 作用                                         |
|:------------------|:-------------|:-------------------------------------------|
| Node.js           | 	`>=16.0.0 ` | 	项目运行环境，提供高性能非阻塞 I/O。                      |
| NestJS            | 	`^10.0.0 `  | 	构建高性能、可维护性强的后端应用程序的框架。                    |
| TypeScript        | 	`^5.0.0 `   | 	提供类型支持的 JavaScript 超集，用于静态类型检查和更高的代码可维护性。 |
| Prisma            | 	`^6.0.0`    | 	强大的 ORM 工具，用于数据库模型管理和查询。                  |
| ESLint            | 	`^8.0.0`    | 	JavaScript/TypeScript 代码检查工具，确保代码风格和质量一致。 |
| Prettier          | 	`^3.0.0`    | 	代码格式化工具，保持代码一致的格式。                        |
| class-validator   | 	`^1.6.0 `   | 	用于验证 DTO（数据传输对象）的数据有效性。                   |
| class-transformer | 	`^1.5.0`    | 	用于转换和映射 DTO 的输入和输出数据。                     |

## 数据库技术
| 技术/工具       | 版本范围或链接		                                         | 作用                                    |
|:------------|:--------------------------------------------------|:--------------------------------------|
| MySQL       | 	`>=5.7` 或 `>=8.0`                                | 	关系型数据库，用于持久化存储业务数据。                  |
| Prisma ORM	 | 	      [Prisma 官方文档	](https://prisma.org.cn/docs) | 	数据库建模和查询工具，支持多种数据库，结合 TypeScript 使用。 |

## 开发工具
| 技术/工具             | 版本范围或链接		            | 作用                            |
|:------------------|:---------------------|:------------------------------|
| Nest CLI          | 	`^10.0.0 `          | 	快速创建和管理 NestJS 项目。           |
| Prisma CLI        | 	`^6.0.0 `           | 	提供迁移、模型生成等功能，管理数据库。          |
| ESLint + Prettier | 	`^8.0.0` 和 `^3.0.0` | 	提供统一的代码检查和格式化工具，保证团队代码风格一致性。 |


## 项目架构特色
1. 模块化架构：
   - 使用 NestJS 的模块系统，按功能划分模块（如用户模块、文章模块），便于维护和扩展。
<br/><br/>
2. Prisma 数据管理：
   - 使用 merge-prisma.js 脚本实现模块化的 Prisma 模型管理，并支持自动合并模型到 schema.prisma。
<br/><br/>
3. 代码质量保障：
   - 使用 ESLint 和 Prettier 确保代码风格一致性，减少代码质量问题。
   - 结合 TypeScript 静态类型检查，减少运行时错误。
<br/><br/>
4. 高效开发体验
   - 提供脚本支持（如自动生成模块结构、管理 Prisma 模型），提升开发效率。
   - 集成 Swagger 自动化 API 文档生成工具。
<br/><br/>

## 未来可扩展技术栈

- Redis：
  - 用于缓存和提升数据访问性能。 
<br/><br/>
- WebSocket：
  - 实现实时通信功能。
<br/><br/>
- GraphQL：
  - 替代 REST 的 API 交互方式，提供更灵活的数据查询和操作。
<br/><br/>
---

## 项目安装

```bash
$ npm install
```

## 项目运行命令说明

```bash

# 执行 merge-prisma.js 脚本，将 src/prisma 目录下的模型文件合并到 prisma/schema.prisma 中
npm run merge-prisma

# 依次执行以下操作：
# 1. 合并 Prisma 模型文件到 schema.prisma
# 2. 执行 Prisma 数据库迁移
# 3. 生成 Prisma Client。
npm run migrate

# 根据 schema.prisma 文件生成 Prisma Client，用于与数据库交互。
npm run generate

# 启动 Prisma Studio，提供一个图形化界面，方便浏览和管理数据库内容。
npm run studio

# 使用 NestJS 构建项目，生成编译后的文件到 dist/ 目录。
npm run build

# 使用 Prettier 格式化代码，包括 src 目录下的所有 .ts 文件。
npm run format

# 启动 NestJS 应用程序（用于生产环境）。
npm run start

# 以开发模式启动 NestJS 应用程序，支持文件变更自动重启。
npm run start:dev

# 以调试模式启动 NestJS 应用程序，支持文件变更自动重启，并启用调试工具。
npm run start:debug

# 启动已编译的 NestJS 应用程序，运行 dist/main.js 文件（用于生产环境）。
npm run start:prod
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

## 分支管理说明

本项目采用 **两分支管理策略**：

### 1. `init-template` 分支
- **用途**：保存项目的初始化模板代码。
- **内容**：包含项目的基本结构和必要的配置文件（如 ESLint、Prettier、Prisma 等）。
- **特点**：代码保持干净、未经过业务开发，可以随时切换到此分支获取初始化项目作为模板。
- **操作示例**：
  ```bash
  # 切换到 init-template 分支
  git checkout init-template
  ```

### 2. `master` 分支
- **用途**：作为项目的主分支。
- **内容**：所有功能开发、代码合并和部署均基于此分支。
- **特点**：代码会随着功能开发不断更新，最终所有开发完成后在此分支上进行发布。
- **操作示例**：
  ```bash
  # 切换到 master 分支
  git checkout master
  ```
  

