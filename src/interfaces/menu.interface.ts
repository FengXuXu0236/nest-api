export interface Menu {
  id: number // 菜单唯一标识
  name: string // 菜单名称，唯一
  description?: string // 菜单描述
  path: string // 菜单对应的路由路径
  parentId?: number // 父菜单 ID，支持菜单层级
  icon?: string // 菜单图标
  component?: string // 菜单对应的前端组件路径
  sort: number // 菜单排序值
  isHidden: boolean // 是否隐藏
  isDisabled: boolean // 是否禁用
  isDeleted: boolean // 是否删除
  disabledAt?: Date // 菜单禁用时间
  createdAt: Date // 菜单创建时间
  updatedAt: Date // 菜单更新时间
  deletedAt?: Date // 菜单删除时间
  permissions: MenuPermission[] // 菜单的权限关联关系
}

export interface MenuPermission {
  // 定义 MenuPermission 接口的字段
  // 具体字段请补充
}
