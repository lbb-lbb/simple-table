<template>
  <thead>
  <tr>
    <th v-for="(item, index) in columns"
        :key="item.value">
      <div style="display: flex">
        <slot :name="addHeaderSlotName(item.value)" :item="item">{{ item.label }}</slot>
        <span :class="[item.sort ? index === sortIndex ? sortType : 'sort-normal' : '']"
              @click="changeSort(index)"/>
      </div>
    </th>
    <th v-if="openOption">
      <slot name="header-options" :item="columns">操作</slot>
    </th>
  </tr>
  </thead>
</template>

<script lang="ts" setup>
/**
 * @file 渲染表格header组件
 */
import {ref} from "vue";
import {tableBodyProps} from "../types";

  const props = defineProps({
    ...tableBodyProps
  })
  const emit = defineEmits(['changeSort'])

  const sortType = ref('sort-normal') //排序方式

  const sortIndex = ref<number>() // 按那一列排序

  function addHeaderSlotName(value: string) {
    return `header-${value}`
  }

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
