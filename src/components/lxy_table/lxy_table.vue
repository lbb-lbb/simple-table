<!-- @format -->

<template>
  <div>
    <table class='table'>
      <table-header v-bind='$attrs'
                    :columns='columns'
                    @changeSort='changeSort'>
        <template v-for='item in columns'
                  :key='item.value'
                  v-slot:[addHeaderSlotName(item.value)]='scope'>
          <slot :name='addHeaderSlotName(item.value)'
                :item='scope.item'>

          </slot>
        </template>
        <template v-slot:header-options='scope'>
          <slot
              name='header-options'
              :item='scope.item'></slot>
        </template>
      </table-header>
      <table-body v-bind='$attrs'
                  :order-by='orderBy'
                  :order='order'
                  :columns='columns'>
        <template v-for='item in columns'
                  :key='item.value'
                  v-slot:[item.value]='scope'>
          <slot :name='item.value'
                :item='scope.item'>

          </slot>
        </template>
        <template v-slot:options='scope'>
          <slot name='options'
                :item='scope.item'>
          </slot>
        </template>
      </table-body>
    </table>
  </div>
</template>

<script lang='ts' setup>
/**
 * @file 表格组件
 */
import {ref, defineProps, withDefaults, onBeforeMount} from 'vue'
import {ColumnsType} from './type'
import TableBody from './table_body/index.vue'
import TableHeader from './table_header/index.vue'
import {SORT_ITEM} from '../../const'
import {addHeaderSlotName} from '../../util'


onBeforeMount(() => {
  if (!props.columns.length) {
    console.trace('传入的表头数据columns不能为空')
  }
})


const props = withDefaults(defineProps<{ columns: ColumnsType[] }>(), {
  columns: () => [],
})
const orderBy = ref('')
const order = ref(SORT_ITEM.normal)

/**
 * 接收header传递出来的排序字段和方式并改变，触发body里面的排序计算
 * @param item 排序的表头数据
 * @param type 排序的方式标识
 */
function changeSort(item: any, type: string) {
  console.log(`根据${item.value}列进行排序`)
  orderBy.value = item.value
  order.value = type
}
</script>