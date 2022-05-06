<template>
  <div>
    <table :border=1 :width=600 :height=400>
      <table-header :columns="columns" @changeSort="changeSort" />
      <table-body :order-by="orderBy" :order="order" :columns="columns" :data="data" />
    </table>
    <table-footer :pages="pages" @changePage="changePage" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { type TableProps, tableProps } from "./types";
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
    const pages = reactive({
      currentPage: 1,
      total: 99,
      size: 10
    })
    const columns = reactive([
      { accessor: 'name', label: 'Name', sort: true },
      { accessor: 'age', label: 'Age', sort: true },
      { accessor: 'is_manager', label: 'Manager', sort: true  },
      { accessor: 'start_date', label: 'Start Date' },
    ])
    const data = reactive([
      { id: 1, name: 'Liz Lemon', age: 36, is_manager: true, start_date: '02-28-1999' },
      { id: 2, name: 'Jack Donaghy', age: 40, is_manager: true, start_date: '03-05-1997' },
      { id: 3, name: 'Tracy Morgan', age: 39, is_manager: false, start_date: '07-12-2002' },
      { id: 4, name: 'Jenna Maroney', age: 40, is_manager: false, start_date: '02-28-1999' },
      { id: 5, name: 'Kenneth Parcell', age: Infinity, is_manager: false, start_date: '01-01-1970' },
      { id: 6, name: 'Pete Hornberger', age: null, is_manager: true, start_date: '04-01-2000' },
      { id: 7, name: 'Frank Rossitano', age: 36, is_manager: false, start_date: null },
      { id: 8, name: null, age: 12, is_manager: null, start_date: null },
    ])
    function changeSort(item: any) {
      orderBy.value = item.accessor
      order.value = item.sortType
    }
    function changePage(page: number) {
      pages.currentPage = page
      emit('changePage', page)
    }
    return { order, orderBy, pages, data, columns, changeSort, changePage }
  },
});

</script>