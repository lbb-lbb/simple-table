<!-- @format -->

<template>
    <div v-if="pages.total" class="page">
        <div>共{{ pages.total }}条</div>
        <div @click="reducePage">当前显示条目{{ pages.size }}</div>
        <button :disabled="isDisableReduceButton" @click="reducePage">上一页</button>
        <div>当前在第{{ currentPage }}页</div>
        <button :disabled="isDisablePlusButton" @click="plusPage">下一页</button>
        <input placeholder="跳转至" type="number" @change="jumpPage($event.target.value)" />
    </div>
</template>

<script lang="ts" setup>
/**
 * @file 表格底部分页组件
 */
import {computed, defineProps, withDefaults} from 'vue'
interface TableFooterType {
  currentPage?: number,
  pages?: PagesType
}
export interface PagesType {
  total: number
  size: number
}

const props = withDefaults(defineProps<TableFooterType>(), {
  currentPage: 1,
  pages: () => ({
    size: 10,
    total: 0
  })
})
const emit = defineEmits<{
  (e: 'update:currentPage', changePage: number): void,
  (e: 'changePage', changePage: number): void
}>()

// 判断下一页是否能点击
const isDisablePlusButton = computed(() => {
    return props.currentPage * props.pages.size >= props.pages.total
})
// 判断上一页是否能点击
const isDisableReduceButton = computed(() => {
    return props.currentPage * props.pages.size <= props.pages.size
})
// 下一页
function plusPage() {
    const unit = props.currentPage + 1
    changePage(unit)
}
// 上一页
function reducePage() {
    const unit = props.currentPage - 1
    changePage(unit)
}

function jumpPage(page: number) {
    changePage(page)
}

function changePage(currentPage: number) {
    emit('update:currentPage', currentPage) // 改变当前页
    emit('changePage', Number(currentPage))
}
</script>
<style scoped>
.page {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
}
</style>
