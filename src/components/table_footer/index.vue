<template>
  <div v-if="openPage"
       class="page">
    <div>共{{pages.total}}条</div>
    <div @click="reducePage">当前显示条目{{pages.size}}</div>
    <button :disabled="isDisableReduceButton" @click="reducePage">上一页</button>
    <div>当前在第{{currentPage}}页</div>
    <button :disabled="isDisablePlusButton" @click="plusPage">下一页</button>
    <input placeholder="跳转至" @change="jumpPage($event.target.value)">
  </div>
</template>

<script lang="ts" setup>
/**
 * @file 表格底部分页组件
 */
import { computed } from "vue";
import { pagesProps } from "../types";

    const props = defineProps({
      ...pagesProps
    })
    const emit = defineEmits(['update:currentPage', 'changePage'])

    // 判断下一页是否能点击
    const isDisablePlusButton = computed(() => {
      return props.currentPage * props.pages.size >= props.pages.total
    })
    // 判断上一页是否能点击
    const isDisableReduceButton = computed(() => {
      return props.currentPage * props.pages.size <= props.pages.size
    })

    function plusPage() {
      let unit = props.currentPage + 1
      changePage(unit)
    }
    function reducePage() {
      let unit = props.currentPage - 1
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
.page{
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
</style>
