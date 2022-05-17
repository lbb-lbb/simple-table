<!-- @format -->

<template>
    <div class="demo">
        <h2>基础使用,渲染表头和表格内容</h2>
        <simple-table :data="demo1.data" :columns="demo1.columns"> </simple-table>
    </div>
    <div class="demo">
        <h2>表格配合开启分页使用（分页事件触发app.vue中的loadData函数）</h2>
        <simple-table
            v-model:currentPage="demo2.currentPage"
            :data="demo2.data"
            :columns="demo2.columns"
            :open-page="demo2.openPage"
            :pages="demo2.pages"
            @change-page="loadData"
        >
        </simple-table>
    </div>
    <div class="demo">
        <h2>表格开启操作列，操作列自定义插槽</h2>
        <simple-table :data="demo3.data" :open-option="demo3.openOption" :columns="demo3.columns">
            <template v-slot:header-options="scope">
                <div>自定义操作列表头{{ scope }}</div>
            </template>
            <template v-slot:options="scope">
                <div>自定义操作列内容{{ scope }}</div>
            </template>
        </simple-table>
    </div>
    <div class="demo">
        <h2>自定义渲染表头和表格内容</h2>
        <simple-table :data="demo3.data" :columns="demo3.columns">
            <template v-slot:header-name="scope">
                <div>自定义name列表头{{ scope }}</div>
            </template>
            <template v-slot:name="scope">
                <div>自定义name列内容{{ scope }}</div>
            </template>
        </simple-table>
    </div>
    <div class="demo">
        <h2>按需开启表格列排序，使用默认排序</h2>
        <simple-table :data="demo4.data" :columns="demo4.columns"> </simple-table>
    </div>
    <div class="demo">
        <h2>按需开启表格列排序，使用用户自定义排序(调用app.vue中的onSort自定义排序函数)</h2>
        <simple-table :data="demo4.data" :on-sort="onSort" :columns="demo4.columns"> </simple-table>
    </div>
</template>

<script lang="ts" setup>
import {reactive} from 'vue'
import SimpleTable from '../../../src/components/simpleTable.vue'

const data = [
    {id: 1, name: 'Liz Lemon', age: 36, is_manager: true, start_date: '02-28-1999', date: new Date('1998-05-16')},
    {id: 2, name: '阀分撒', age: 40, is_manager: true, start_date: '03-05-1997', date: new Date('1998-05-17')},
    {id: 3, name: 'Tracy Morgan', age: 39, is_manager: false, start_date: '07-12-2002', date: new Date('1998-05-6')},
    {id: 4, name: 'Jenna Maroney', age: 40, is_manager: false, start_date: '02-28-1999', date: new Date('1998-05-7')},
    {
        id: 5,
        name: 'Kenneth Parcell',
        age: Infinity,
        is_manager: false,
        start_date: '01-01-1970',
        date: new Date('1998-05-30'),
    },
    {id: 6, name: '啊啊', age: null, is_manager: true, start_date: '04-01-2000', date: new Date('1998-05-28')},
    {id: 7, name: 'Frank Rossitano', age: 36, is_manager: false, start_date: null, date: new Date('1998-05-14')},
    {id: 8, name: null, age: 12, is_manager: null, start_date: null, date: new Date('1998-05-11')},
]

const noSortColumns = [
    {value: 'name', label: 'Name'},
    {value: 'age', label: 'Age'},
    {value: 'is_manager', label: 'Manager'},
    {value: 'start_date', label: 'Start Date'},
    {value: 'date', label: '时间'},
]

const demo1 = reactive({
    columns: noSortColumns,
    data,
})
const demo2 = reactive({
    columns: noSortColumns,
    data,
    openPage: true,
    pages: {
        total: 99,
        size: 10,
    },
    currentPage: 1,
})
const demo3 = reactive({
    columns: noSortColumns,
    data,
    openOption: true,
})
const demo4 = reactive({
    columns: [
        {value: 'name', label: 'Name', sort: true},
        {value: 'age', label: 'Age', sort: true},
        {value: 'is_manager', label: 'Manager', sort: true},
        {value: 'start_date', label: 'Start Date', sort: true},
        {value: 'date', label: '时间', sort: true},
    ],
    data,
})

/**
 * 分页触发事件
 */
function loadData(page: number) {
    console.log('跳转至', page)
}

function onSort(data: [], options: any) {
    console.log('传入要排序的list', data)
    console.log('用户点了那一列，正序还是倒序信息', options)
    return data
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
