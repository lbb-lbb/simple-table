/** @format */

import {computed} from 'vue'
import {DataType} from '../types'

export function useSort(originalData: Partial<DataType>, orderBy: string, order: string, onSort: any) {
    const sortData: Partial<DataType> = computed(() => {
        if (orderBy.value) {
            if (onSort.value) {
                try {
                    // 存在自定义回调函数，则调用返回
                    return onSort.value(originalData.value, {orderBy: orderBy.value, order: order.value})
                } catch (e) {
                    console.error(e)
                }
            }
            const data: Partial<DataType> = originalData.value.slice()
            if (order.value === 'sort-asc') {
                // 正序
                return data.sort((a: any, b: any) => {
                    const aName = a[orderBy.value]
                    const bName = b[orderBy.value]
                    if (typeof aName === 'string') {
                        // 字符串排序用localeCompare判断
                        return aName.localeCompare(bName)
                    }
                    return aName - bName
                })
            }
            if (order.value === 'sort-desc') {
                // 倒序
                return data.sort((a: any, b: any) => {
                    const aName = a[orderBy.value]
                    const bName = b[orderBy.value]
                    if (typeof aName === 'string') {
                        return bName.localeCompare(aName)
                    }
                    return bName - aName
                })
            }
        }
        // 原本排序
        return originalData.value
    })
    return {
        sortData,
    }
}
