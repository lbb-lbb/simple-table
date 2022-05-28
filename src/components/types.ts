/** @format */

// 表头接口类型
export interface ColumnsType {
    label: string
    value: string
    sort?: boolean
    sortType?: string
}

// 分页接口
export interface PagesType {
    total: number
    size: number
}

export interface DataType {
    id: number | string
    name: string
    age: number
    is_manager: boolean
    start_date: string
    date: Date

    [key: string]: any
}

export interface TableFooterType {
    currentPage: number
    pages: PagesType
}

export interface TableBodyType<T extends {} = Record<string, unknown>> {
    data: T[]
    orderBy: string
    order: string
    openOption?: boolean
    columns?: ColumnsType[]
    onSort?: (data: T[], option: {orderBy: string; order: string}) => T[]
}
