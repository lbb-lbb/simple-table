<template>
  <div>
    <table :border=1>
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

    const renderColumns = computed(() => {
      return props.columns.map(v => {
        return {
          ...v,
          header: 'header-' + v.value
        }
      })
    })

    function changeSort(item: ColumnsType, type: string): void {
      orderBy.value = item.value
      order.value = type
    }
    // function changePage(page: number): void {
    //   emit('changePage') // 触发翻页事件
    // }
    return {order, orderBy, changeSort, renderColumns }
  },
});

</script>
<style>
table,table tr th, table tr td {
  border:1px solid #ccc;
}
th, td {
  min-width: 150px;
}

table{
  border-collapse: collapse;
}
</style>