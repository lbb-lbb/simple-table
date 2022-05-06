<template>
  <thead>
  <tr>
    <th v-for="(item, index) in renderColumns"
        :key="item.accessor">
      {{item.label}}
      <span :class="[item.sort ? item.sortType : '']" @click="changeSort(index)" />
    </th>
  </tr>
  </thead>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import {tableProps, type TableProps} from "../types";

export default defineComponent({
  name: "TableHeader",
  props: tableProps,
  setup(props: TableProps, { attrs, emit, slots }) {

    const columns = props.columns

    const renderColumns = computed(() => {
      columns.forEach(v => {
        if (v.sort) {
          v.sortType = 'sort-normal'
        }
      })
      return columns
    })


    function changeSort(index: number) {
      switch (columns[index].sortType) {
        case 'sort-normal':
          columns[index].sortType = 'sort-asc'
          emit('changeSort', props.columns[index], 'sort-asc')
          break;
        case 'sort-asc':
          columns[index].sortType = 'sort-desc'
          emit('changeSort', props.columns[index], 'sort-desc')
          break;
        case 'sort-desc':
          props.columns[index].sortType = 'sort-normal'
          emit('changeSort', props.columns[index], 'sort-normal')
          break;
      }
    }
    return {renderColumns, changeSort}
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
}
</style>
