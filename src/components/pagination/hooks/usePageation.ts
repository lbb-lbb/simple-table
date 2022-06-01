import {computed, ComputedRef, Ref, ref, watch} from 'vue'
import {PagesType} from '../type'
import {err, info, isInteger} from "../../../util";

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

    const isValid = ref(false)  // isValid为false代表跳页检验成功，可以跳页

    watch(value, (newVal) => {
        if (isInteger(String(newVal)) && newVal <= Math.ceil(pages.value.total / pages.value.size) && newVal * pages.value.size > 0) {  // 大于0的整数
            isValid.value = false
            info(`从第${currentPage.value}页跳往${newVal}页`)
            changePage(newVal)
        } else {
            err(`跳转页数错误，跳转页数必须是大于0的整数，且小于等于${Math.ceil(pages.value.total / pages.value.size) }`)
            isValid.value = true
        }
    })

    // 下一页
    function plusPage() {
        value.value = currentPage.value + 1
    }

    // 上一页
    function reducePage() {
        value.value = currentPage.value - 1
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

