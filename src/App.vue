<template>
    <simple-table :data="data"
                  :columns="columns"
                  :pages="pages"
                  @changePage="loadData"/>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import SimpleTable from "./components/SimpleTable.vue";
import { PagesType, ColumnsType } from './components/types'
export default defineComponent({
  name: "App",
  components: {
    SimpleTable
  },
  setup() {
    const pages: PagesType = reactive({
      currentPage: 1,
      total: 0,
      size: 10
    })
    const columns: ColumnsType[] = reactive([
      { value: 'name', label: 'Name', sort: true },
      { value: 'age', label: 'Age', sort: true },
      { value: 'is_manager', label: 'Manager', sort: true  },
      { value: 'start_date', label: 'Start Date', sort: true },
      { value: 'date', label: '时间', sort: true },
    ])
    const data: unknown[] = reactive([
      { id: 1, name: 'Liz Lemon', age: 36, is_manager: true, start_date: '02-28-1999', date: new Date('1998-05-16') },
      { id: 2, name: '阀分撒', age: 40, is_manager: true, start_date: '03-05-1997', date: new Date('1998-05-17') },
      { id: 3, name: 'Tracy Morgan', age: 39, is_manager: false, start_date: '07-12-2002', date: new Date('1998-05-6')},
      { id: 4, name: 'Jenna Maroney', age: 40, is_manager: false, start_date: '02-28-1999', date: new Date('1998-05-7') },
      { id: 5, name: 'Kenneth Parcell', age: Infinity, is_manager: false, start_date: '01-01-1970',date: new Date('1998-05-30') },
      { id: 6, name: '啊啊', age: null, is_manager: true, start_date: '04-01-2000',date: new Date('1998-05-28') },
      { id: 7, name: 'Frank Rossitano', age: 36, is_manager: false, start_date: null, date: new Date('1998-05-14') },
      { id: 8, name: null, age: 12, is_manager: null, start_date: null, date: new Date('1998-05-11')},
    ])
    function loadData() {
      // todo
    }

    return { pages, data, columns, loadData }
  }
})

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px;
}
</style>

