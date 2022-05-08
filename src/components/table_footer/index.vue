<template>
  <div class="page">
    <div>共{{pages.total}}条</div>
    <div @click="reducePage">当前显示条目{{pages.size}}</div>
    <button :disabled="isDisableReduceButton" @click="reducePage">上一页</button>
    <div>当前在第{{currentPage}}页</div>
    <button :disabled="isDisablePlusButton" @click="plusPage">下一页</button>
    <input placeholder="跳转至" @change="jumpPage($event.target.value)">
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { pagesProps, type PagesProps } from "../types";

export default defineComponent({
  name: "TableFooter",
  props: pagesProps,
  setup(props: PagesProps, { attrs, emit, slots }){

    const isDisablePlusButton = computed(() => {
      return props.currentPage * props.pages.size >= props.pages.total
    })
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

    function jumpPage(page: number): void {
      changePage(page)
    }

    function changePage(currentPage: number) {
      emit('update:currentPage', currentPage) // 改变当前页
      emit('changePage', Number(currentPage))
    }
    return { isDisablePlusButton, isDisableReduceButton, plusPage, reducePage, jumpPage }

  },
});

</script>
<style scoped>
.page{
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
</style>\
