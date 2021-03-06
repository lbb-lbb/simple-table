<template>
  <thead>
    <tr>
      <th v-for="(item, index) in columns"
          :key="item.value">
        <div style="display: flex"
             class="header-wrapper">
          <slot :name="addHeaderSlotName(item.value)"
                :item="item">{{ item.label }}</slot>
          <span class="header-filter"
                :class="[item.sort ? (index === sortIndex ? sortType : SORT_ITEM.normal) : '']"
                @click="changeSort(index, item)"
          />
        </div>
      </th>
      <th v-if="openOption">
        <slot name="header-options"
              :item="columns">操作</slot>
      </th>
    </tr>
  </thead>
</template>

<script lang="ts" setup>
/**
 * @file 渲染表格header组件
 */
import {defineProps, ref, withDefaults, defineEmits} from "vue"
import {ColumnsType, DataType, TableType} from "../type"
import {SORT_ITEM} from "../../../const"
import {addHeaderSlotName} from "../../../util"
import {useProps} from "../hooks/useProps";

const props = withDefaults(defineProps<TableType<DataType>>(), {
  openOption: false
})
const { columns, openOption } = useProps(props)

const emit = defineEmits<{ (e: 'changeSort', columns: ColumnsType, orderBy: string): void }>()

const sortType = ref(SORT_ITEM.normal) // 排序方式

const sortIndex = ref<number>(-1) // 按那一列排序


function changeSort(index: number, item: ColumnsType) {
  switch (sortType.value) {
    case SORT_ITEM.normal:
      sortIndex.value = index
      sortType.value = SORT_ITEM.asc
      emit('changeSort', item, SORT_ITEM.asc)
      break
    case SORT_ITEM.asc:
      sortIndex.value = index
      sortType.value = SORT_ITEM.desc
      emit('changeSort', item, SORT_ITEM.desc)
      break
    case SORT_ITEM.desc:
      sortIndex.value = index
      sortType.value = SORT_ITEM.normal
      emit('changeSort', item, SORT_ITEM.normal)
      break
  }
}
</script>
<style scoped>
.sort-normal, .sort-asc, .sort-desc {
  position: relative;
  margin-left: 2px;
}

.sort-normal:before, .sort-desc:before {
  position: absolute;
  top: 2px;
  content: '';
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid #333;
  cursor: pointer;
}

.sort-normal:after, .sort-asc:after  {
  position: absolute;
  bottom: 2px;
  content: '';
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #333;
  cursor: pointer;
}


.sort-asc:before {
  position: absolute;
  top: 2px;
  content: '';
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid #333;
  border-bottom-color: #1770e6;
  cursor: pointer;
}

.sort-desc:after {
  position: absolute;
  bottom: 2px;
  content: '';
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #333;
  border-top-color: #1770e6;
  cursor: pointer;
}
</style>
