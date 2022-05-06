<template>
  <tbody>
  <tr v-for="item in sortData" :key="item.id">
    <td v-for="column in columns" :key="column.value">
      {{item[column.value]}}
    </td>
  </tr>
  </tbody>
</template>

<script lang="ts">
import {defineComponent, computed} from "vue";
import {tableProps, type TableProps} from "../types";

export default defineComponent({
  name: "TableBody",
  props: {
    ...tableProps,
    orderBy: String,
    order: String
  },
  setup(props: TableProps, { attrs, emit, slots }) {

    const sortData = computed(() => {
      if (props.orderBy) {
        let data = props.data.slice()
        if (props.order === 'sort-asc') {
          return  data.sort((a, b) => {
            let aName = a[props.orderBy]
            let bName = b[props.orderBy]
            if (typeof aName === 'string') {
              return aName.localeCompare(bName)
            } else {
              return aName - bName
            }
          })
        } else if (props.order === 'sort-desc') {
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
      return props.data
    })
    return { sortData };
  }
});

</script>
