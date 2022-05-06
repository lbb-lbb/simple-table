<template>
  <div>
    <table :border=1 :width=1200 :height=400>
      <table-header :columns="columns" @changeSort="changeSort" />
      <table-body :order-by="orderBy" :order="order" :columns="columns" :data="data" />
    </table>
    <table-footer :pages="pages" @changePage="changePage" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
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
    const order = ref('normal')
    function changeSort(item: ColumnsType, type: string): void {
      orderBy.value = item.value
      order.value = type
    }
    function changePage(page: number): void {
      props.pages.currentPage = page
      emit('changePage', page)
    }
    return {order, orderBy, changeSort, changePage }
  },
});

</script>