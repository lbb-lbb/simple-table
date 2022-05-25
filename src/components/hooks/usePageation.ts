/** @format */

import {computed, unref} from 'vue'
export interface PagesType {
    total: number
    size: number
}

export function usePageation(currentPage: number, pages: PagesType) {
    const currentPageVal = unref(currentPage)
    const size = unref(pages.size)
        // 判断下一页是否能点击
        const isDisablePlusButton: ComputedRef<boolean> = computed(() => {
        return unref(currentPage) * pages.value.size >= pages.value.total
    })
    // 判断上一页是否能点击
    const isDisableReduceButton: ComputedRef<boolean> = computed(() => {
        return currentPage.value * pages.value.size <= pages.value.size
    })

    return {
        isDisablePlusButton,
        isDisableReduceButton,
    }
}
/**/
