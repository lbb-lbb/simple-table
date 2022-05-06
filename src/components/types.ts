import { ExtractPropTypes } from "vue";
// 表头接口类型
export interface ColumnsType {
  label: string;
  value: string;
  sort?: boolean;
  sortType?: string;
}

export interface PagesType {
  currentPage: number;
  total: number;
  size: number
}


//  定义 Props
export const tableProps = {
  // 表格数据
  data: {
    type: Array,
    default: () => []
  },
  // 表头
  columns: {
    type: Array,
    default: () =>[]
  },
  // 分页参数
  pages: {
    type: Object,
    default: () => {}
  }


} as const;

export type TableProps = ExtractPropTypes<typeof tableProps>;

