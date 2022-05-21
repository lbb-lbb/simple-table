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
  <tr v-if="!data.length">
    <slot name="empty">数据为空</slot>
  </tr>
  </tbody>
</template>

<script lang="ts" setup>
/**
 * @file 渲染表格body组件
 */
import {computed, defineProps, withDefaults} from 'vue'
import {ColumnsType, DataType} from '../types'

interface TableBodyType<T extends {} = Record<string, unknown>> {
  data: T[],
  columns: ColumnsType[],
  orderBy: string,
  order: string,
  openOption?: boolean,
  onSort?: (data: T[], option: { orderBy: string, order: string }) => T[]
}

const props = withDefaults(defineProps<TableBodyType>(), {
  orderBy: '',
  order: 'sort-normal',
  openOption: false,
  data: () => [],
  columns: () => [],
})
const sortData: Partial<DataType> = computed(() => {
  if (props.orderBy) {
    if (props.onSort) {
      // 存在自定义回调函数，则调用返回
      try {
        return props.onSort(props.data, {orderBy: props.orderBy, order: props.order})
      } catch (e) {
        console.error(e)
      }
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
