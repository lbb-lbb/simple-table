<template>
  <tbody>
  <tr v-for="item in sortData" :key="item.id">
    <td v-for="column in columns" :key="column.accessor">
      {{item[column.accessor]}}
    </td>
  </tr>
  </tbody>
</template>

<script lang="ts">
import {defineComponent, computed} from "vue";
import { type TableProps, tableProps } from "../types";

export default defineComponent({
  name: "SimpleTable1",
  props: {
    orderBy: String,
    order: String,
    columns: Array,
    data: Array
  },
  setup(props: TableProps, { attrs, emit, slots }) {
    const originalData = JSON.parse(JSON.stringify(props.data))

    const sortData = computed(() => {
      if (props.orderBy) {
        let data = props.data.slice()
        if (props.order === 'sort-asc') {
          return  data.sort((a, b) => {
            let aName = a[props.orderBy]
            let bName = b[props.orderBy]
            if (typeof aName === 'string') {
              aName.localeCompare(bName)
            } else {
              return aName - bName
            }
          })
        } else if (props.order === 'sort-desc') {
          return  data.sort((a, b) => {
            let aName = a[props.orderBy]
            let bName = b[props.orderBy]
            if (typeof aName === 'string') {
              bName.localeCompare(aName)
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
