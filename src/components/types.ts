import {InjectionKey} from "vue";

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
