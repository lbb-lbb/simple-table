
// 表头接口类型
export interface ColumnsType {
    label: string
    value: string
    sort?: boolean
    sortType?: string
}

export interface DataType {
    [propName: string]: any
}

export type onSortFun<T> = (data: T[], option: sortOption) => T[]

export type sortOption = {
    order: string
    orderBy: string
}

export interface TableType<T> {
    columns: ColumnsType[],
    data?: T[],
    orderBy?: string,
    order?: string,
    openOption?: boolean,
    onSort?: onSortFun<T>
}
