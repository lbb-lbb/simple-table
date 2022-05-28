

// 分页接口
export interface PagesType {
    total: number
    size: number
}

export interface TableFooterType {
    currentPage: number
    pages: PagesType
}