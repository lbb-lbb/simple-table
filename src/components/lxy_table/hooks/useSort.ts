import { DataType } from "../type";
import {computed, unref, Ref, ComputedRef} from "vue"
import {SORT_ITEM} from "../../../const"
import {err, info} from "../../../util";
import {onSortFun} from "../type";

export function useSort<T extends DataType>(data: Ref<T[]>, orderBy: Ref<string>, order: Ref<string>, onSort: onSortFun<T> | undefined) {

    const sortData: ComputedRef<T[]> = computed(() => {
        const originalData = unref(data)
        const _orderBy = unref(orderBy)
        const _order = unref(order)
        const _onSort = onSort
        if (_order === SORT_ITEM.normal) return originalData
        // 调用自定义排序
        if (typeof _onSort === 'function') {
            try {
                info(`调用自定义排序函数进行自定义根据${_orderBy}列进行排序`)
                // 存在自定义回调函数，则调用返回
                return _onSort(originalData.slice(), {orderBy: _orderBy, order: _order})
            } catch (e) {
                const message = `${_onSort} is not a function, can’t sort on ${_orderBy} \n ${e}`
                err(message)
            }
        }
        // 倒序or正序
        const copyData: T[] = originalData.slice()
        const isAsc = _order === SORT_ITEM.asc
        info(`根据${_orderBy}列进行${ isAsc ? '升序' : '降序' }排序`)
        return copyData.sort((a: T, b: T) => {
            const aName = String(isAsc ? a[_orderBy] : b[_orderBy])
            const bName = String(isAsc ? b[_orderBy] : a[_orderBy])
            return aName.localeCompare(bName, 'en', { numeric: true })
        })
    })
    return {
        sortData,
    }
}
