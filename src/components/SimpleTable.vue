<template>
  <div>
    <table class="table">
      <table-header v-bind="$attrs"
                    :columns="renderColumns"
                    @changeSort="changeSort">
        <template v-for="item in renderColumns"
                  :key="item.value"
                  v-slot:[item.header]="scope">
          <slot :name="item.header"
                :item="scope.item">
          </slot>
        </template>
      </table-header>
      <table-body v-bind="$attrs"
                  :order-by="orderBy"
                  :order="order"
                  :columns="renderColumns">
        <template v-for="item in renderColumns"
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

<script lang="ts">
/**
 * @file 表格组件
 */
import { defineComponent, ref, computed } from "vue";
import { type TableProps, tableProps, ColumnsType } from "./types";
import TableBody from './table_body/index.vue'
import TableHeader from './table_header/index.vue'
import TableFooter from './table_footer/index.vue'
export default defineComponent({
  name: "SimpleTable",
  props: tableProps,
  components: {
    TableBody,
    TableFooter,
    TableHeader
  },
  setup(props: TableProps, { attrs, emit, slots }) {
    const orderBy = ref('')
    const order = ref('sort-normal')
    // 为表头数据增加一个属性作为name插槽标识
    const renderColumns = computed(() => {
      return props.columns.map(v => {
        return {
          ...v,
          header: 'header-' + v.value
        }
      })
    })

    /**
     * 接收header传递出来的排序字段和方式并改变，触发body里面的排序计算
     * @param item 排序的表头数据
     * @param type 排序的方式标识
     */
    function changeSort(item: ColumnsType, type: string) {
      orderBy.value = item.value
      order.value = type
    }
    return {order, orderBy, changeSort, renderColumns }
  },
});

</script>
<style>
table,table tr th, table tr td {
  border:1px solid #ccc;
}

</style>