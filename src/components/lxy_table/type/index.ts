
// 表头接口类型
export interface ColumnsType {
    label: string
    value: string
    sort?: boolean
    sortType?: string
}

export interface DataType {
    [propName: string]: unknown
}

export type onSortFun<T> = (data: T[], option: sortOption) => T[]

export type sortOption = {
    order: string
    orderBy: string
}