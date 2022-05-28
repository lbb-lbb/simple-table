/** @format */

// 表头接口类型
export interface ColumnsType {
    label: string
    value: string
    sort?: boolean
    sortType?: string
}


export interface DataType {
    [key: string]: any
}


export interface TableBodyType<T extends {} = Record<string, unknown>> {
    data: T[]
    orderBy: string
    order: string
    openOption?: boolean
    columns?: ColumnsType[]
    onSort?: (data: T[], option: {orderBy: string; order: string}) => T[]
}
