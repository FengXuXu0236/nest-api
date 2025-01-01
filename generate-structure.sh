#!/bin/bash

# ============================================
# 脚本说明：
# 在命令中执行: ".\generate-structure.sh 模块名" 会执自动生成对应目录对应模块的文件
# 生成的目录结构：
# src/
# ├── controllers/<module>.controller.ts      # 控制器：处理 HTTP 请求
# ├── service/<module>.service.ts             # 服务：封装业务逻辑
# ├── module/<module>.module.ts               # 模块：注册控制器和服务
# ├── dto/<module>.dto.ts                     # DTO：定义请求和响应数据结构
# ├── dto/
# │   ├── <module>/
# │   │   ├── create-<module>.dto.ts          # 创建请求的 DTO
# │   │   ├── update-<module>.dto.ts          # 更新请求的 DTO
# │   │   ├── filter-<module>.dto.ts          # 查询过滤的 DTO
# │   │   └── <module>-response.dto.ts        # 响应的 DTO
# ├── interfaces/<module>.interface.ts        # 接口：定义模块实体的通用接口
# ├── types/<module>.types.ts                 # 类型：定义模块相关类型（如 Payload 和 Response）
# ├── repositories/<module>.repository.ts     # 仓储：封装数据库查询逻辑
# ============================================
# 例如:
# 执行 .\generate-structure.sh article
# 生成的目录结构：
# src/
# ├── controllers/article.controller.ts      # 控制器：处理 HTTP 请求
# ├── service/article.service.ts             # 服务：封装业务逻辑
# ├── module/article.module.ts               # 模块：注册控制器和服务
# ├── dto/article.dto.ts                     # DTO：定义请求和响应数据结构
# ├── dto/
# │   ├── article/
# │   │   ├── create-article.dto.ts          # 创建请求的 DTO
# │   │   ├── update-article.dto.ts          # 更新请求的 DTO
# │   │   ├── filter-article.dto.ts          # 查询过滤的 DTO
# │   │   └── article-response.dto.ts        # 响应的 DTO
# ├── interfaces/article.interface.ts        # 接口：定义模块实体的通用接口
# ├── types/article.types.ts                 # 类型：定义模块相关类型（如 Payload 和 Response）
# ├── repositories/article.repository.ts     # 仓储：封装数据库查询逻辑
#
# 文件内容示例：
#
# 1. controllers/article.controller.ts
#    import { Controller } from '@nestjs/common';
#
#    @Controller('article')
#    export class ArticleController {
#      // 控制器逻辑会在这里实现
#    }
#
# 2. service/article.service.ts
#    import { Injectable } from '@nestjs/common';
#
#    @Injectable()
#    export class ArticleService {
#      // 服务逻辑会在这里实现
#    }
#
# 3. module/article.module.ts
#    import { Module } from '@nestjs/common';
#    import { ArticleController } from '../controllers/article.controller';
#    import { ArticleService } from '../service/article.service';
#
#    @Module({
#      controllers: [ArticleController],
#      providers: [ArticleService],
#    })
#    export class ArticleModule {}
#
# 4. dto/article.dto.ts
#    export class CreateArticleDto {
#      // Define fields for creating article
#    }
#
#    export class UpdateArticleDto {
#      // Define fields for updating article
#    }
#
# 5. interfaces/article.interface.ts
#    export interface Article {
#      id: number;
#      name: string;
#      createdAt: Date;
#      updatedAt: Date;
#    }
#
# 6. types/article.types.ts
#    export type ArticleResponse = {
#      id: number;
#      name: string;
#      createdAt: string;
#      updatedAt: string;
#    };
#
#    export type CreateArticlePayload = {
#      name: string;
#    };
#
#    export type UpdateArticlePayload = {
#      id: number;
#      name?: string;
#    };
#
# 8. repositories/article.repository.ts
#    import { Injectable } from '@nestjs/common';
#    import { PrismaService } from '../prisma/prisma.service';
#    import { Article } from '../interfaces/article.interface';
#
#    @Injectable()
#    export class ArticleRepository {
#      constructor(private readonly prisma: PrismaService) {}
#
#      async findAll(): Promise<Article[]> {
#        return this.prisma.article.findMany();
#      }
#
#      async findOne(id: number): Promise<Article | null> {
#        return this.prisma.article.findUnique({ where: { id } });
#      }
#
#      async create(data: Partial<Article>): Promise<Article> {
#        return this.prisma.article.create({ data });
#      }
#
#      async update(id: number, data: Partial<Article>): Promise<Article> {
#        return this.prisma.article.update({ where: { id }, data });
#      }
#
#      async delete(id: number): Promise<void> {
#        await this.prisma.article.delete({ where: { id } });
#      }
#    }
# ============================================

MODULE_NAME=$1

if [ -z "$MODULE_NAME" ]; then
  echo "Usage: ./generate-structure.sh <module-name>"
  exit 1
fi

# 项目主目录路径
BASE_PATH="src"

# 创建目录结构
mkdir -p $BASE_PATH/controllers
mkdir -p $BASE_PATH/service
mkdir -p $BASE_PATH/module
mkdir -p $BASE_PATH/dto/$MODULE_NAME # 在 dto 下创建模块目录
mkdir -p $BASE_PATH/interfaces
mkdir -p $BASE_PATH/types
mkdir -p $BASE_PATH/prisma
mkdir -p $BASE_PATH/repositories

# 生成模块、控制器、服务
nest generate module module/$MODULE_NAME --flat
nest generate controller controllers/$MODULE_NAME --flat
nest generate service service/$MODULE_NAME --flat

# DTO 文件路径
CREATE_DTO_FILE="$BASE_PATH/dto/$MODULE_NAME/create-$MODULE_NAME.dto.ts"
UPDATE_DTO_FILE="$BASE_PATH/dto/$MODULE_NAME/update-$MODULE_NAME.dto.ts"
FILTER_DTO_FILE="$BASE_PATH/dto/$MODULE_NAME/filter-$MODULE_NAME.dto.ts"
RESPONSE_DTO_FILE="$BASE_PATH/dto/$MODULE_NAME/$MODULE_NAME-response.dto.ts"

# 创建 Create DTO 文件
echo "import { IsString, IsNotEmpty } from 'class-validator';

export class Create${MODULE_NAME^}Dto {
  @IsString()
  @IsNotEmpty()
  name: string;

  // Add other fields here
}" > $CREATE_DTO_FILE

# 创建 Update DTO 文件
echo "import { PartialType } from '@nestjs/mapped-types';
import { Create${MODULE_NAME^}Dto } from './create-$MODULE_NAME.dto';

export class Update${MODULE_NAME^}Dto extends PartialType(Create${MODULE_NAME^}Dto) {
  // Fields inherited from Create DTO
}" > $UPDATE_DTO_FILE

# 创建 Filter DTO 文件
echo "import { IsOptional, IsString, IsInt, Min } from 'class-validator';

export class Filter${MODULE_NAME^}Dto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;
}" > $FILTER_DTO_FILE

# 创建 Response DTO 文件
echo "export class ${MODULE_NAME^}ResponseDto {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}" > $RESPONSE_DTO_FILE


# 创建接口文件
INTERFACE_FILE="$BASE_PATH/interfaces/${MODULE_NAME}.interface.ts"
echo "export interface ${MODULE_NAME^} {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}" > $INTERFACE_FILE

# 创建类型定义文件
TYPES_FILE="$BASE_PATH/types/${MODULE_NAME}.types.ts"
echo "export type ${MODULE_NAME^}Response = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type Create${MODULE_NAME^}Payload = {
  name: string;
};

export type Update${MODULE_NAME^}Payload = {
  id: number;
  name?: string;
};" > $TYPES_FILE

# 创建 Repository 文件
REPOSITORY_FILE="$BASE_PATH/repositories/${MODULE_NAME}.repository.ts"
echo "import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ${MODULE_NAME^} } from '../interfaces/${MODULE_NAME}.interface';

@Injectable()
export class ${MODULE_NAME^}Repository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<${MODULE_NAME^}[]> {
    return this.prisma.${MODULE_NAME}.findMany();
  }

  async findOne(id: number): Promise<${MODULE_NAME^} | null> {
    return this.prisma.${MODULE_NAME}.findUnique({ where: { id } });
  }

  async create(data: Partial<${MODULE_NAME^}>): Promise<${MODULE_NAME^}> {
    return this.prisma.${MODULE_NAME}.create({ data });
  }

  async update(id: number, data: Partial<${MODULE_NAME^}>): Promise<${MODULE_NAME^}> {
    return this.prisma.${MODULE_NAME}.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.${MODULE_NAME}.delete({ where: { id } });
  }
}" > $REPOSITORY_FILE

# 提示完成
echo "Module $MODULE_NAME and related files generated successfully!"
