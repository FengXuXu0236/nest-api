const fs = require('fs');
const path = require('path');

// 主配置文件路径
const mainSchemaPath = path.resolve(__dirname, 'prisma/schema.prisma');

// 要扫描的目录
const prismaModulesDir = path.resolve(__dirname, 'src/prisma');

// Prisma 文件匹配规则
const filePattern = /\.prisma$/;

/**
 * 扫描目录并获取所有 .prisma 文件路径
 */
function getPrismaFiles(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  return files
    .flatMap((file) => {
      const filePath = path.join(dir, file.name);
      return file.isDirectory()
        ? getPrismaFiles(filePath) // 递归扫描子目录
        : filePattern.test(file.name)
          ? [filePath] // 匹配 .prisma 文件
          : [];
    });
}

/**
 * 合并所有模块的模型到主 schema.prisma 文件
 */
function mergeSchemas() {
  console.log('Merging Prisma schemas...');

  // 获取所有模块的 .prisma 文件
  const prismaFiles = getPrismaFiles(prismaModulesDir).filter(
    (file) => file !== mainSchemaPath // 排除主文件
  );

  if (prismaFiles.length === 0) {
    console.error('No Prisma schema files found to merge.');
    return;
  }

  // 读取每个 .prisma 文件的内容
  const schemaContents = prismaFiles.map((file) => {
    const content = fs.readFileSync(file, 'utf-8');
    const remark = `
// =============================================
// From ${path.relative(prismaModulesDir, file)}
// =============================================
${content}\n`

    return remark;
  });

  // 写入主 schema.prisma 文件
  const header = `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

// Merged Schemas
`;
  fs.writeFileSync(mainSchemaPath, `${header}\n${schemaContents.join('')}`);
  console.log(`Prisma schemas merged successfully into ${mainSchemaPath}`);
}

// 执行合并
mergeSchemas();
