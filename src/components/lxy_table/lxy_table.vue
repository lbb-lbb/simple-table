<template>
  <table class="table">
    <table-header :open-option="openOption"
                  :columns="columns"
                  @changeSort="changeSort">
      <template v-for="item in columns"
                :key="item.value"
                v-slot:[addHeaderSlotName(item.value)]="scope">
        <slot :name="addHeaderSlotName(item.value)"
              :item="scope.item">
        </slot>
      </template>
      <template v-slot:header-options="scope">
        <slot name="header-options"
              :item="scope.item">
        </slot>
      </template>
    </table-header>
    <table-body :open-option="openOption"
                :data="data"
                :order-by="orderBy"
                :order="order"
                :on-sort="onSort"
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
</template>

<script lang="ts" setup>
/**
 * @file 表格组件
 */
import {ref, onBeforeMount, withDefaults, toRefs} from "vue"
import {ColumnsType, DataType, TableType} from "./type"
import TableBody from "./table_body/index.vue"
import TableHeader from "./table_header/index.vue"
import {SORT_ITEM} from "../../const"
import {addHeaderSlotName, err, warn} from "../../util"
import {useProps} from "./hooks/useProps";

const props = defineProps<TableType<DataType>>()

const { columns, data, onSort, openOption } = useProps(props)

const orderBy = ref('')
const order = ref(SORT_ITEM.normal)

/**
 * 接收header传递出来的排序字段和方式并改变，触发body里面的排序计算
 * @param item 排序的表头数据
 * @param type 排序的方式标识
 */
function changeSort(item: ColumnsType, type: (typeof SORT_ITEM)[keyof typeof SORT_ITEM]) {
  orderBy.value = item.value
  order.value = type
}
</script>

