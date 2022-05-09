import { ExtractPropTypes } from "vue";
// 表头接口类型
export interface ColumnsType {
  label: string;
  value: string;
  sort?: boolean;
  sortType?: string;
}

// 分页接口
export interface PagesType {
  total: number;
  size: number
}
export interface DataType {
  id: number | string,
  name: string, age: number,
  is_manager: boolean,
  start_date: string,
  date: Date, [key:string]:any
}


//  定义表格Props
export const tableProps = {
  // 表头
  columns: {
    type: Array,
    default: () =>[]
  }
} as const;

//  定义表格body的Props
export const tableBodyProps = {
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
  orderBy: {
    type: String,
    default: ''
  },
  order: {
    type: String,
    default: 'sort-normal'
  },
  openOption: {
    type: Boolean,
    default: false,
  },
} as const;

//  定义表格body的Props
export const pagesProps = {
  // 分页参数
  pages: {
    type: Object,
    default: {
      total: 0,
      size: 10
    }
  },
  currentPage: {
    type: Number,
    default: 1
  },
} as const;

export type TableProps = ExtractPropTypes<typeof tableProps>;
export type TableBodyProps = ExtractPropTypes<typeof tableBodyProps>;
export type PagesProps = ExtractPropTypes<typeof pagesProps>;

