<template>
    <simple-table  :data="data.data"
                   :columns="columns"
                   :pages="pages"
                   :openOption="true"
                   v-model:currentPage="currentPage"
                   @changePage="loadData">
      <template v-slot:header-age="scope">
        <div>自定义表头</div>
      </template>
      <template v-slot:name="scope">
        <div>自定义内容</div>
      </template>
      <template v-slot:options="scope">
        <div>自定义操作列内容</div>
      </template>
      <template v-slot:header-options="scope">
        <div>自定义操作列表头内容</div>
      </template>
    </simple-table>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import SimpleTable from "./components/SimpleTable.vue";
import { PagesType, ColumnsType } from './components/types'
export default defineComponent({
  name: "App",
  components: {
    SimpleTable
  },
  setup() {
    const pages: PagesType = reactive({
      total: 99,
      size: 20
    })
    const currentPage = ref(1)
    const columns: ColumnsType[] = reactive([
      { value: 'name', label: 'Name', sort: true },
      { value: 'age', label: 'Age', sort: true },
      { value: 'is_manager', label: 'Manager', sort: true  },
      { value: 'start_date', label: 'Start Date' },
      { value: 'date', label: '时间', sort: true },
    ])
    let data = reactive({
      data:  [
        { id: 1, name: 'Liz Lemon', age: 36, is_manager: true, start_date: '02-28-1999', date: new Date('1998-05-16') },
        { id: 2, name: '阀分撒', age: 40, is_manager: true, start_date: '03-05-1997', date: new Date('1998-05-17') },
        { id: 3, name: 'Tracy Morgan', age: 39, is_manager: false, start_date: '07-12-2002', date: new Date('1998-05-6')},
        { id: 4, name: 'Jenna Maroney', age: 40, is_manager: false, start_date: '02-28-1999', date: new Date('1998-05-7') },
        { id: 5, name: 'Kenneth Parcell', age: Infinity, is_manager: false, start_date: '01-01-1970',date: new Date('1998-05-30') },
        { id: 6, name: '啊啊', age: null, is_manager: true, start_date: '04-01-2000',date: new Date('1998-05-28') },
        { id: 7, name: 'Frank Rossitano', age: 36, is_manager: false, start_date: null, date: new Date('1998-05-14') },
        { id: 8, name: null, age: 12, is_manager: null, start_date: null, date: new Date('1998-05-11')},
      ]
    })
    function loadData() {
      data.data = [
        { id: 22, name: 'Liz Lemon', age: 36, is_manager: true, start_date: '02-28-1999', date: new Date('1998-05-16') }
      ]
    }

    return { pages, data, columns, loadData, currentPage }
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

