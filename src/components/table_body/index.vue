<!-- @format -->

<template>
    <tbody>
        <tr v-for="item in sortData" :key="item.id">
            <td v-for="column in columns" :key="column.value">
                <slot :name="column.value" :item="item">{{ item[column.value] }}</slot>
            </td>
            <td v-if="openOption">
                <slot name="options" :item="item"></slot>
            </td>
        </tr>
    </tbody>
</template>

<script lang="ts" setup>
/**
 * @file 渲染表格body组件
 */
import {computed} from 'vue'
import {DataType, tableBodyProps} from '../types'

const props = defineProps({
    ...tableBodyProps,
})
const sortData: Partial<DataType> = computed(() => {
    if (props.orderBy) {
        if (props.onSort) {
            // 存在自定义回调函数，则调用返回
            return props.onSort(props.data, {orderBy: props.orderBy, order: props.order})
        }
        const data = props.data.slice()
        if (props.order === 'sort-asc') {
            // 正序
            return data.sort((a: any, b: any) => {
                const aName = a[props.orderBy]
                const bName = b[props.orderBy]
                if (typeof aName === 'string') {
                    // 字符串排序用localeCompare判断
                    return aName.localeCompare(bName)
                }
                return aName - bName
            })
        }
        if (props.order === 'sort-desc') {
            // 倒序
            return data.sort((a: any, b: any) => {
                const aName = a[props.orderBy]
                const bName = b[props.orderBy]
                if (typeof aName === 'string') {
                    return bName.localeCompare(aName)
                }
                return bName - aName
            })
        }
    }
    // 原本排序
    return props.data
})
</script>
