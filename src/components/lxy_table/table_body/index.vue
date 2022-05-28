<!-- @format -->

<template>
  <tbody>
  <tr v-for='item in sortData' :key='item.id'>
    <td v-for='column in columns' :key='column.value'>
      <slot :name='column.value' :item='item'>{{ item[column.value] }}</slot>
    </td>
    <td v-if='openOption'>
      <slot name='options' :item='item'></slot>
    </td>
  </tr>
  <tr v-if='!data.length'>
    <slot name='empty'>数据为空</slot>
  </tr>
  </tbody>
</template>

<script lang='ts' setup>
/**
 * @file 渲染表格body组件
 */
import {defineProps, toRefs, withDefaults} from 'vue'
import {ColumnsType, DataType} from '../type'
import {useSort} from '../hooks/useSort'

interface TableBodyType<T extends {}> {
  data: T[],
  columns: ColumnsType[],
  orderBy: string,
  order: string,
  openOption?: boolean,
  onSort?: (data: T[], option: { orderBy: string, order: string }) => T[]
}

const props = withDefaults(defineProps<TableBodyType<DataType>>(), {
  orderBy: '',
  order: 'sort-normal',
  openOption: false,
  data: () => [],
  columns: () => [],
})

const { data, orderBy, order } = toRefs(props)
const {sortData} = useSort<DataType>(data, orderBy, order, props.onSort)

</script>
