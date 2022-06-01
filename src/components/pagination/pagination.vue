<template>
  <div v-if="pages.total" class="page">
    <div class="page-total">共{{ pages.total }}条</div>
    <div class="page-size" @click="reducePage">当前显示条目{{ pages.size }}</div>
    <button class="per-btn" :disabled="isDisableReduceButton" @click="reducePage">上一页</button>
    <div class="page-current">当前在第{{ currentPage }}页</div>
    <button class="next-btn" :disabled="isDisablePlusButton" @click="plusPage">下一页</button>
    <input class="page-input" :class="{valid: isValid}" placeholder="跳转至" type="number" v-model.number="inputValue"/>
    <button class="next-submit" @click="jumpPage(inputValue)">确定跳转</button>
  </div>
</template>

<script lang="ts" setup>
/**
 * @file 表格底部分页组件
 */
import {ref, toRefs} from 'vue'
import {usePagination} from './hooks/usePageation'
import {PagesType} from "./type";

export interface TableFooterType {
  currentPage: number,
  pages: PagesType
}

const props = defineProps<TableFooterType>()
const emit = defineEmits<{
  (e: 'update:currentPage', changePage: number): void,
  (e: 'changePage', changePage: number): void
}>()

const { currentPage, pages } = toRefs(props)

const inputValue = ref(currentPage.value)

const {
  isDisablePlusButton,
  isDisableReduceButton,
  value,
  isValid,
  plusPage,
  reducePage,
  jumpPage
} = usePagination(currentPage, pages, changePage)

function changePage(currentPage: number) {
  emit('update:currentPage', currentPage) // 改变当前页
  emit('changePage', currentPage)
}
</script>
<style scoped>
.page {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
.valid {
  border: 1px solid red
}
</style>
