import { ExtractPropTypes } from "vue";
// 表格接口类型
interface TablePropsType<T> {
  data: T[] // 表格数据
  border?: boolean // 表格边框
  openPage?: boolean // 是否开启分页
  id?: string // 指定唯一值
  width?: string | number // 表格宽度
  height?: string | number // 表格高度
  rowKey?: string | ((row: T ) => string) // 指定渲染哪一个字段
}


//  定义 Props
export const tableProps = {
  test: String

} as const;

export type TableProps = ExtractPropTypes<typeof tableProps>;

