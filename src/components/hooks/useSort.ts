/** @format */

import {computed, toRefs, unref} from 'vue'
import {TableBodyType, DataType} from '../types'
import {SORT_ITEM} from '../const'

export function useSort(object: TableBodyType) {
    const props = toRefs(object)

    const sortData: Partial<DataType> = computed(() => {
        const originalData = unref(props.data)
        const orderBy = unref(props.orderBy)
        const order = unref(props.order)
        const onSort = unref(props.onSort)
        if (orderBy) {
            if (onSort) {
                console.log('自定义排序')
                try {
                    // 存在自定义回调函数，则调用返回
                    return onSort(originalData, {orderBy: orderBy, order: order})
                } catch (e) {
                    console.error(e)
                }
            }
            const data: Partial<DataType> = originalData.slice()
            if (order === SORT_ITEM.asc) {
                // 正序
                console.log('正序排序')
                return data.sort((a: any, b: any) => {
                    const aName = a[orderBy]
                    const bName = b[orderBy]
                    if (typeof aName === 'string') {
                        // 字符串排序用localeCompare判断
                        return aName.localeCompare(bName)
                    }
                    return aName - bName
                })
            }
            if (order === SORT_ITEM.desc) {
                // 倒序、
                console.log('倒序排序')
                return data.sort((a: any, b: any) => {
                    const aName = a[orderBy]
                    const bName = b[orderBy]
                    if (typeof aName === 'string') {
                        return bName.localeCompare(aName)
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
