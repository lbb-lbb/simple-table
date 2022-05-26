/** @format */

import {computed, toRefs, ComputedRef} from 'vue'
import {TableFooterType} from '../types'

export function usePageation(object: TableFooterType) {
    const {pages, currentPage} = toRefs(object)
    // 判断下一页是否能点击
    const isDisablePlusButton: ComputedRef<boolean> = computed(() => {
        return currentPage.value * pages.value.size >= pages.value.total
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
