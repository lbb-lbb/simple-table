/** @format */

import {computed, ComputedRef, Ref, ref, watch} from 'vue'
import {PagesType} from '../type'
import {isInteger} from "../../../util";

export function usePagination(currentPage: Ref<number>, pages: Ref<PagesType>, changePage: (value: number) => void) {

    // 判断下一页是否能点击
    const isDisablePlusButton: ComputedRef<boolean> = computed(() => {
        return currentPage.value * pages.value.size >= pages.value.total
    })
    // 判断上一页是否能点击
    const isDisableReduceButton: ComputedRef<boolean> = computed(() => {
        return currentPage.value * pages.value.size <= pages.value.size
    })

    const value = ref(currentPage.value)

    const isValid = ref(false)

    watch(value, (newVal) => {
        if (isInteger(String(newVal)) && newVal > 0) {  // 大于0的整数
            isValid.value = false
            console.log(`从第${currentPage.value}页跳往${newVal}页`)
            changePage(newVal)
        } else {
            console.log('输入错误, 输入页数必须为大于0的整数')
            isValid.value = true
        }
    })

    // 下一页
    function plusPage() {
        value.value = value.value + 1
    }

    // 上一页
    function reducePage() {
        value.value = value.value - 1
    }

    function jumpPage(val: number) {
        value.value = val
    }

    return {
        isDisablePlusButton,
        isDisableReduceButton,
        value,
        isValid,
        plusPage,
        reducePage,
        jumpPage
    }
}

/**/
