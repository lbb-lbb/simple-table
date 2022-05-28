<!-- @format -->

<template>
  <div v-if='pages.total' class='page'>
    <div>共{{ pages.total }}条</div>
    <div @click='reducePage'>当前显示条目{{ pages.size }}</div>
    <button :disabled='isDisableReduceButton' @click='reducePage'>上一页</button>
    <div>当前在第{{ currentPage }}页</div>
    <button :disabled='isDisablePlusButton' @click='plusPage'>下一页</button>
    <input placeholder='跳转至' type='number' @input='jumpPage'/>
  </div>
</template>

<script lang='ts' setup>
/**
 * @file 表格底部分页组件
 */
import {defineProps, toRefs, withDefaults} from 'vue'
import {usePagination} from './hooks/usePageation'

interface TableFooterType {
  currentPage: number,
  pages: PagesType
}

interface PagesType {
  total: number
  size: number
}

const props = withDefaults(defineProps<TableFooterType>(), {
  currentPage: 1,
  pages: () => ({
    size: 10,
    total: 0,
  }),
})
const emit = defineEmits<{
  (e: 'update:currentPage', changePage: number): void,
  (e: 'changePage', changePage: number): void
}>()

const { currentPage, pages } = toRefs(props)

const {
  isDisablePlusButton,
  isDisableReduceButton,
} = usePagination(currentPage, pages)

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

function jumpPage(e: any) {
  const page = e.event.value
  if (page < 0) {
    console.trace('输入的页数必须大于0')
    return
  }
  console.log(`跳转至第${page}页`)
  changePage(Number(page))
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
