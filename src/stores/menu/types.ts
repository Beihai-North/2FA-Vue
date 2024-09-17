// src/types.ts
export interface MenuItem {
  id: number;
  name: string;
  route: string;
  component: string;  // 组件的名称
  icon:string;
  permissions: string[];
  divider?: boolean;
}

export type MenuList = MenuItem[];
