/** @format */

import {computed, unref, Ref} from 'vue'
import {DataType} from '../type'
import {SORT_ITEM} from '../../../const'

export function useSort<T>(data: Ref<T[]>, orderBy: Ref<string>, order: Ref<string>, onSort: ((data: T[], option: {orderBy: string; order: string}) => T[]) | undefined) {

    const sortData: Partial<DataType> = computed(() => {
        const originalData = unref(data)
        const useOrderBy = unref(orderBy)
        const useOrder = unref(order)
        const useOnSort = onSort
        if (useOrderBy) {
            if (typeof useOnSort === 'function') {
                console.log('自定义排序')
                try {
                    // 存在自定义回调函数，则调用返回
                    return useOnSort(originalData, {orderBy: useOrderBy, order: useOrder})
                } catch (e) {
                    console.error(e)
                }
            }
            const data: Partial<DataType> = originalData.slice()
            if (useOrder === SORT_ITEM.asc) {
                // 正序
                console.log('正序排序')
                return data.sort((a: any, b: any) => {
                    const aName = a[useOrderBy]
                    const bName = b[useOrderBy]
                    if (typeof aName === 'string') {
                        // 字符串排序用localeCompare判断
                        return aName.localeCompare(bName, '', { numeric: true })
                    }
                    return aName - bName
                })
            }
            if (useOrder === SORT_ITEM.desc) {
                // 倒序、
                console.log('倒序排序')
                return data.sort((a: any, b: any) => {
                    const aName = a[useOrderBy]
                    const bName = b[useOrderBy]
                    if (typeof aName === 'string') {
                        return bName.localeCompare(aName, '', { numeric: true })
                    }
                    return bName - aName
                })
            }
        }
        // 原本排序
        console.log('原序排序')
        return originalData
    })
    return {
        sortData,
    }
}
