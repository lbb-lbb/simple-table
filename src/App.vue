<template>
  <div class="demo">
    <h2>基础使用,渲染表头和表格内容</h2>
    <lxy-table :data='demo1.data'
               :columns='demo1.columns'>
    </lxy-table>
  </div>
  <div class="demo">
    <h2>表格配合开启分页组件使用（分页事件触发app.vue中的loadData函数,从新赋值表格data）</h2>
    <lxy-table :data="demo2.data"
               :columns="demo2.columns">
    </lxy-table>
    <pagination v-model:current-page="demo2.currentPage"
                :pages="demo2.pages"
                @change-page="loadData"/>
  </div>
  <div class="demo">
    <h2>表格开启操作列，操作列自定义插槽</h2>
    <lxy-table :data="demo3.data"
               :open-option="demo3.openOption"
               :columns="demo3.columns">
      <template v-slot:header-options="scope">
        <div>自定义操作列表头{{ scope }}</div>
      </template>
      <template v-slot:options="scope">
        <div>自定义操作列内容{{ scope }}</div>
      </template>
    </lxy-table>
  </div>
  <div class="demo">
    <h2>自定义渲染表头和表格内容</h2>
    <lxy-table :data="demo3.data"
               :columns="demo3.columns">
      <template v-slot:header-name="scope">
        <div>自定义name列表头{{ scope }}</div>
      </template>
      <template v-slot:name="scope">
        <div>自定义name列内容{{ scope }}</div>
      </template>
    </lxy-table>
  </div>
  <div class="demo">
    <h2>按需开启表格列排序，使用默认排序</h2>
    <lxy-table :data="demo4.data"
               :columns="demo4.columns">
    </lxy-table>
  </div>
  <div class="demo">
    <h2>按需开启表格列排序，使用用户自定义排序(调用app.vue中的onSort自定义排序函数)</h2>
    <lxy-table :data="demo5.data"
               :on-sort="onSort"
               :columns="demo4.columns">
    </lxy-table>
  </div>
  <div class="demo">
    <h2>data为空时候</h2>
    <lxy-table :columns="noSortColumns" />
  </div>
</template>

<script lang="ts" setup>
import {reactive, watch} from "vue"
import lxyTable from "./components/lxy_table/lxy_table.vue"
import Pagination from "./components/pagination/pagination.vue";
import {ColumnsType, DataType, sortOption} from "./components/lxy_table/type";
import {tableData} from "../mock";
import {info} from "./util";

const noSortColumns: ColumnsType[] = [
  {value: 'name', label: 'Name'},
  {value: 'age', label: 'Age'},
  {value: 'isManager', label: 'Manager'},
  {value: 'description', label: 'Start Date'},
  {value: 'date', label: '时间'},
]

const columns: ColumnsType[] = [
  {value: 'name', label: 'Name', sort: true},
  {value: 'age', label: 'Age', sort: true},
  {value: 'isManager', label: 'Manager', sort: true},
  {value: 'description', label: 'Start Date', sort: true},
  {value: 'date', label: '时间', sort: true},
]

const demo1 = reactive({
  columns: noSortColumns,
  data: tableData[0],
})
const demo2 = reactive({
  columns: noSortColumns,
  data: tableData[1],
  pages: {
    total: 99,
    size: 10,
  },
  currentPage: 1,
})
const demo3 = reactive({
  columns: noSortColumns,
  data: tableData[2],
  openOption: true,
})
const demo4 = reactive({
  columns: columns,
  data: tableData[3],
})
const demo5 = reactive({
  columns: columns,
  data: tableData[4],
})

watch(() => demo2.currentPage, (newVal: number) => {
  loadData(newVal)
})

/**
 * 分页触发事件
 */
function loadData(page: number) {
  demo2.data = tableData[page - 1]
}

function onSort(data: DataType[], options: sortOption) {
  info(`调用自定义排序-对${options.orderBy}倒叙`)
  return data.reverse()
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  max-width: 1333px;
}

.demo {
  margin-bottom: 30px;
}
</style>