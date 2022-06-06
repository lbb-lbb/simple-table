

// 分页接口
export interface PagesType {
    total: number
    size: number
}

export interface PaginationType {
    currentPage: number,
    pages: PagesType
}

