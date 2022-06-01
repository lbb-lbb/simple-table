<template>
  <tbody class="table-body">
    <tr v-for="item in sortData" :key="item.value">
      <td v-for="column in columns" :key="column.value">
        <slot :name="column.value" :item="item">{{ item[column.value] }}</slot>
      </td>
      <td v-if="openOption">
        <div class="body-option">
          <slot name="options" :item="item"></slot>
        </div>
      </td>
    </tr>
    <tr v-if="!data.length">
      <div class="body-empty">
        <slot name="empty">数据为空</slot>
      </div>
    </tr>
  </tbody>
</template>

<script lang="ts" setup>
/**
 * @file 渲染表格body组件
 */
import {defineProps, toRefs, withDefaults} from 'vue'
import {ColumnsType} from '../type'
import {useSort} from '../hooks/useSort'
import {SORT_ITEM} from "../../../const";

interface TableBodyType<T extends Record<string, any>> {
  columns: ColumnsType[],
  data?: T[],
  orderBy?: string,
  order?: string,
  openOption?: boolean,
  onSort?: (data: T[], option: { orderBy: string, order: string }) => T[]
}

const props = withDefaults(defineProps<TableBodyType<Record<string, any>>>(), {
  data: () => [],
  orderBy: '',
  order: SORT_ITEM.normal,
  openOption: false,
})

const { data, orderBy, order } = toRefs(props)
const {sortData} = useSort<Record<string, any>>(data, orderBy, order, props.onSort)

</script>

