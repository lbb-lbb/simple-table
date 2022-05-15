<template>
  <div>
    <table class="table">
      <table-header v-bind="$attrs"
                    :columns="columns"
                    @changeSort="changeSort">
        <template v-for="item in columns"
                  :key="item.value"
                  v-slot:[addHeaderSlotName(item.value)]="scope">
          <slot :name="addHeaderSlotName(item.value)"
                :item="scope.item">
          </slot>
        </template>
      </table-header>
      <table-body v-bind="$attrs"
                  :order-by="orderBy"
                  :order="order"
                  :columns="columns">
        <template v-for="item in columns"
                  :key="item.value"
                  v-slot:[item.value]="scope">
          <slot :name="item.value"
                :item="scope.item">
          </slot>
        </template>
        <template v-slot:options="scope">
          <slot name="options"
                :item="scope.item">
          </slot>
        </template>
      </table-body>
    </table>
    <table-footer v-bind="$attrs"/>
  </div>
</template>

<script lang="ts" setup>
/**
 * @file 表格组件
 */
import {ref} from "vue";
import { tableProps, ColumnsType} from "./types";
import TableBody from './table_body/index.vue'
import TableHeader from './table_header/index.vue'
import TableFooter from './table_footer/index.vue'

  const props = defineProps({
    ...tableProps
  })
  const orderBy = ref('')
  const order = ref('sort-normal')

  function addHeaderSlotName(value: string) {
    return `header-${value}`
  }
  /**
   * 接收header传递出来的排序字段和方式并改变，触发body里面的排序计算
   * @param item 排序的表头数据
   * @param type 排序的方式标识
   */
  function changeSort(item: ColumnsType, type: string) {
    orderBy.value = item.value
    order.value = type
  }

</script>
<style>
table, table tr th, table tr td {
  border: 1px solid #ccc;
}

</style>