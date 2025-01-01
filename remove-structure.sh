#!/bin/bash

# ============================================
# 删除的目录结构和文件：
# src/
# ├── dto/<module>/
# │   ├── <module>/
# │   │   ├── create-<module>.dto.ts          # 创建请求的 DTO
# │   │   ├── update-<module>.dto.ts          # 更新请求的 DTO
# │   │   ├── filter-<module>.dto.ts          # 查询过滤的 DTO
# │   │   └── <module>-response.dto.ts        # 响应的 DTO
# ├── controllers/<module>.controller.ts
# ├── service/<module>.service.ts
# ├── module/<module>.module.ts
# ├── interfaces/<module>.interface.ts
# ├── types/<module>.types.ts
# ├── repositories/<module>.repository.ts
# ============================================

MODULE_NAME=$1

if [ -z "$MODULE_NAME" ]; then
  echo "Usage: ./remove-structure.sh <module-name>"
  exit 1
fi

# 项目主目录路径
BASE_PATH="src"

# 删除 DTO 文件夹及其内容
DTO_FOLDER="$BASE_PATH/dto/$MODULE_NAME"
if [ -d "$DTO_FOLDER" ]; then
  echo "Removing DTO folder: $DTO_FOLDER"
  rm -rf "$DTO_FOLDER"
else
  echo "No DTO folder found for module: $MODULE_NAME"
fi

# 删除控制器文件
CONTROLLER_FILE="$BASE_PATH/controllers/${MODULE_NAME}.controller.ts"
if [ -f "$CONTROLLER_FILE" ]; then
  echo "Removing controller file: $CONTROLLER_FILE"
  rm -f "$CONTROLLER_FILE"
else
  echo "No controller file found for module: $MODULE_NAME"
fi

# 删除服务文件
SERVICE_FILE="$BASE_PATH/service/${MODULE_NAME}.service.ts"
if [ -f "$SERVICE_FILE" ]; then
  echo "Removing service file: $SERVICE_FILE"
  rm -f "$SERVICE_FILE"
else
  echo "No service file found for module: $MODULE_NAME"
fi

# 删除模块文件
MODULE_FILE="$BASE_PATH/module/${MODULE_NAME}.module.ts"
if [ -f "$MODULE_FILE" ]; then
  echo "Removing module file: $MODULE_FILE"
  rm -f "$MODULE_FILE"
else
  echo "No module file found for module: $MODULE_NAME"
fi

# 删除接口文件
INTERFACE_FILE="$BASE_PATH/interfaces/${MODULE_NAME}.interface.ts"
if [ -f "$INTERFACE_FILE" ]; then
  echo "Removing interface file: $INTERFACE_FILE"
  rm -f "$INTERFACE_FILE"
else
  echo "No interface file found for module: $MODULE_NAME"
fi

# 删除类型文件
TYPES_FILE="$BASE_PATH/types/${MODULE_NAME}.types.ts"
if [ -f "$TYPES_FILE" ]; then
  echo "Removing types file: $TYPES_FILE"
  rm -f "$TYPES_FILE"
else
  echo "No types file found for module: $MODULE_NAME"
fi

# 删除仓储文件
REPOSITORY_FILE="$BASE_PATH/repositories/${MODULE_NAME}.repository.ts"
if [ -f "$REPOSITORY_FILE" ]; then
  echo "Removing repository file: $REPOSITORY_FILE"
  rm -f "$REPOSITORY_FILE"
else
  echo "No repository file found for module: $MODULE_NAME"
fi

# 清理空目录（可选）
#echo "Cleaning up empty directories..."
#find $BASE_PATH -type d -empty -delete

# 提示完成
echo "Module $MODULE_NAME and related files removed successfully!"
