<template>
  <tbody>
  <tr v-for="item in sortData" :key="item.id">
    <td v-for="column in columns" :key="column.value">
      <slot :name="column.value" :item="item">{{item[column.value]}}</slot>
    </td>
    <td v-if="openOption">
      <slot name="options" :item="item"></slot>
    </td>
  </tr>
  </tbody>
</template>

<script lang="ts">
import {defineComponent, computed} from "vue";
import { tableBodyProps, type TableBodyProps } from "../types";

export default defineComponent({
  name: "TableBody",
  props: tableBodyProps,
  setup(props: TableBodyProps, { attrs, emit, slots }) {

    const sortData = computed(() => {
      if (props.orderBy) {
        let data = props.data.slice()
        if (props.order === 'sort-asc') { // 正序
          return  data.sort((a, b) => {
            let aName = a[props.orderBy]
            let bName = b[props.orderBy]
            if (typeof aName === 'string') {
              return aName.localeCompare(bName)
            } else {
              return aName - bName
            }
          })
        } else if (props.order === 'sort-desc') { // 倒序
          return  data.sort((a, b) => {
            let aName = a[props.orderBy]
            let bName = b[props.orderBy]
            if (typeof aName === 'string') {
              return bName.localeCompare(aName)
            } else {
              return bName - aName
            }
          })
        }
      }
      // 原本排序
      return props.data
    })
    return { sortData };
  }
});

</script>
