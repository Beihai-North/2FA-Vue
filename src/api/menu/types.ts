// 定义菜单项类型
export interface MenuItem {
  label: string;         // 菜单项的名称
  route: string;         // 菜单项的路由路径
  icon?: string;         // 菜单项的图标，可选
  divider?: boolean;     // 是否显示分割线，可选
}

// 定义菜单列表的类型
export type MenuList = MenuItem[];