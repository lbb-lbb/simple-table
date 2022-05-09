<template>
  <thead>
  <tr>
    <th v-for="(item, index) in columns"
        :key="item.value">
      <div style="display: flex">
        <slot :name="item.header" :item="item">{{item.label}}</slot>
        <span :class="[item.sort ? index === sortIndex ? sortType : 'sort-normal' : '']"
              @click="changeSort(index)" />
      </div>
    </th>
    <th v-if="openOption">
      <slot name="header-options">操作</slot>
    </th>
  </tr>
  </thead>
</template>

<script lang="ts">
/**
 * @file 渲染表格header组件
 */
import { defineComponent, ref } from "vue";
import { tableBodyProps, type TableBodyProps } from "../types";

export default defineComponent({
  name: "TableHeader",
  props: tableBodyProps,
  setup(props: TableBodyProps, { attrs, emit, slots }) {

    const sortType = ref('sort-normal') //排序方式

    const sortIndex = ref(undefined) // 按那一列排序

    function changeSort(index: number) {
      switch (sortType.value) {
        case 'sort-normal':
          sortIndex.value = index
          sortType.value = 'sort-asc'
          emit('changeSort', props.columns[index], 'sort-asc')
          break;
        case 'sort-asc':
          sortIndex.value = index
          sortType.value = 'sort-desc'
          emit('changeSort', props.columns[index], 'sort-desc')
          break;
        case 'sort-desc':
          sortIndex.value = index
          sortType.value = 'sort-normal'
          emit('changeSort', props.columns[index], 'sort-normal')
          break;
      }
    }
    return { changeSort, sortIndex, sortType}
  },
});
</script>
<style scoped>
.sort-normal {
  position: relative;
  margin-left: 2px;
}
.sort-normal:before {
  position: absolute;
  top: 2px;
  content: "";
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid #333;
  cursor: pointer;
}
.sort-normal:after {
  position: absolute;
  bottom: 2px;
  content: "";
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #333;
  cursor: pointer;
}

.sort-asc {
  position: relative;
  margin-left: 2px;
}
.sort-asc:before {
  position: absolute;
  top: 2px;
  content: "";
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid #333;
  border-bottom-color: #1770E6;
  cursor: pointer;
}
.sort-asc:after {
  position: absolute;
  bottom: 2px;
  content: "";
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #333;
  cursor: pointer;
}

.sort-desc {
  position: relative;
  margin-left: 2px;
}
.sort-desc:before {
  position: absolute;
  top: 2px;
  content: "";
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid #333;
  cursor: pointer;
}
.sort-desc:after {
  position: absolute;
  bottom: 2px;
  content: "";
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #333;
  border-top-color: #1770E6;
  cursor: pointer;
}
</style>
