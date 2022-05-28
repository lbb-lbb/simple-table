<!-- @format -->

<template>
  <div v-if="pages.total" class="page">
    <div class="page-total">共{{ pages.total }}条</div>
    <div class="page-size" @click="reducePage">当前显示条目{{ pages.size }}</div>
    <button class="per-btn" :disabled="isDisableReduceButton" @click="reducePage">上一页</button>
    <div class="page-current">当前在第{{ currentPage }}页</div>
    <button class="next-btn" :disabled="isDisablePlusButton" @click="plusPage">下一页</button>
    <input class="page-input" placeholder="跳转至" type="number" v-model.number="value"/>
    <button class="next-submit" @click="jumpPage">确定跳转</button>
  </div>
</template>

<script lang="ts" setup>
/**
 * @file 表格底部分页组件
 */
import {defineProps, ref, toRefs} from 'vue'
import {usePagination} from './hooks/usePageation'

interface TableFooterType {
  currentPage: number,
  pages: PagesType
}

interface PagesType {
  total: number
  size: number
}

const props = defineProps<TableFooterType>()
const emit = defineEmits<{
  (e: 'update:currentPage', changePage: number): void,
  (e: 'changePage', changePage: number): void
}>()

const { currentPage, pages } = toRefs(props)

const {
  isDisablePlusButton,
  isDisableReduceButton,
} = usePagination(currentPage, pages)

const value = ref(currentPage.value)

// 下一页
function plusPage() {
  console.log('下一页点击')
  const unit = props.currentPage + 1
  changePage(unit)
}

// 上一页
function reducePage() {
  console.log('上一页点击')
  const unit = props.currentPage - 1
  changePage(unit)
}

function jumpPage() {
  if (value.value <= 0) {
    console.trace('输入的页数必须大于0')
    return
  }
  console.log(`跳转至第${value.value}页`)
  changePage(value.value)
}

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
</style>
