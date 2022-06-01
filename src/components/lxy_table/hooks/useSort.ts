import {computed, unref, Ref, ComputedRef} from 'vue'
import {SORT_ITEM} from '../../../const'
import {err, info} from "../../../util";

export function useSort<T extends Record<string, any>>(data: Ref<T[]>, orderBy: Ref<string>, order: Ref<string>, onSort: ((data: T[], option: {orderBy: string; order: string}) => T[]) | undefined) {

    const sortData: ComputedRef<T[]> = computed(() => {
        const originalData = unref(data)
        const useOrderBy = unref(orderBy)
        const useOrder = unref(order)
        const useOnSort = onSort
        if (useOrderBy) {
            if (typeof useOnSort === 'function') {
                try {
                    info(`调用自定义排序函数进行自定义根据${useOrderBy}列进行排序`)
                    // 存在自定义回调函数，则调用返回
                    return useOnSort(originalData, {orderBy: useOrderBy, order: useOrder})
                } catch (e) {
                    const message = `${useOnSort} is not a function, can’t sort on ${useOrderBy} \n ${e}`
                    err(message)
                }
            }
            const data: T[] = originalData.slice()
            if (useOrder === SORT_ITEM.asc) {
                // 正序
                info(`调用根据${useOrderBy}列进行正序排序`)
                return data.sort((a: T, b: T) => {
                    const aName = String(a[useOrderBy])
                    const bName = String(b[useOrderBy])
                    return aName.localeCompare(bName, 'en', { numeric: true })
                })
            }
            if (useOrder === SORT_ITEM.desc) {
                // 倒序、
                info(`调用根据${useOrderBy}列进行倒序排序`)
                return data.sort((a: T, b: T) => {
                    const aName = String(a[useOrderBy])
                    const bName = String(b[useOrderBy])
                    return bName.localeCompare(aName, 'en', { numeric: true })
                })
            }
        }
        // 原本排序
        return originalData
    })
    return {
        sortData,
    }
}
