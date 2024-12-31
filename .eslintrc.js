module.exports = {
  parser: '@typescript-eslint/parser',                // 使用 TypeScript 专用解析器
  parserOptions: {
    project: 'tsconfig.json',                         // 指定 TypeScript 项目配置文件
    tsconfigRootDir: __dirname,                       // 指定 tsconfig.json 所在根目录
    sourceType: 'module',                             // 使用 ECMAScript 模块语法
  },
  plugins: ['@typescript-eslint/eslint-plugin'],      // 启用 TypeScript 的 ESLint 插件
  extends: [
    'plugin:@typescript-eslint/recommended',          // 启用 TypeScript 推荐规则
    'plugin:prettier/recommended',                    // 集成 Prettier，避免冲突
  ],
  root: true,                                         // 确保是项目根目录的配置文件
  env: {
    node: true,                                       // 启用 Node.js 全局变量
    jest: false,                                      // 关闭 Jest 环境支持
  },
  ignorePatterns: ['node_modules/', 'dist/'],         // 忽略目录
  rules: {
    // 核心规则调整
    semi: ['error', 'never'],                         // 禁止使用句末分号
    'comma-dangle': ['error', 'never'],               // 禁止尾随逗号
    quotes: ['error', 'single'],                      // 强制使用单引号
    indent: ['error', 2],                             // 缩进为 2 个空格
    'linebreak-style': ['error', 'unix'],             // 强制使用 Unix 换行符
    'no-console': 'warn',                             // 警告不必要的 console.log 调试语句

    // TypeScript 专用规则
    '@typescript-eslint/interface-name-prefix': 'off',          // 接口名称不强制以 "I" 开头
    '@typescript-eslint/explicit-function-return-type': 'off',  // 函数无需显式声明返回类型
    '@typescript-eslint/explicit-module-boundary-types': 'off', // 模块边界无需显式声明返回类型
    '@typescript-eslint/no-explicit-any': 'off',                // 允许使用 any 类型
  },
}
