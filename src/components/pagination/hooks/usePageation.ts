/** @format */

import {computed, ComputedRef, Ref} from 'vue'
import {PagesType} from '../type'

export function usePagination(currentPage: Ref<number>, pages: Ref<PagesType>) {

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
