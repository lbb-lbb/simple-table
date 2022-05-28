/** @format */

import {computed, toRefs, ComputedRef} from 'vue'
import {TableFooterType} from '../types'

export function usePagination(object: TableFooterType) {
    const props = toRefs(object)

    const currentPage = props.currentPage
    const pages = props.pages
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
