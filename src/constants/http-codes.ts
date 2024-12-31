/**
 * HTTP 状态码枚举
 */
export enum HttpCode {
  SUCCESS = 200, // 成功
  CREATED = 201, // 新建/修改数据成功
  ACCEPTED = 202, // 异步任务已接受
  NO_CONTENT = 204, // 删除数据成功
  RESET_CONTENT = 205, // 锁屏
  BAD_REQUEST = 400, // 请求参数错误
  UNAUTHORIZED = 401, // 未授权
  TOKEN_EXPIRED = 402, // 令牌过期
  FORBIDDEN = 403, // 禁止访问
  NOT_FOUND = 404, // 资源未找到
  NOT_ACCEPTABLE = 406, // 请求不可接受
  GONE = 410, // 资源被永久删除
  SERVER_ERROR = 500, // 服务器错误
  BAD_GATEWAY = 502, // 网关错误
  SERVICE_UNAVAILABLE = 503, // 服务不可用
  GATEWAY_TIMEOUT = 504, // 网关超时
}
