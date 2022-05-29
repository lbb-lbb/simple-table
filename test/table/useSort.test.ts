import { expect, test } from "vitest";
import { useSort } from "../../src/components/lxy_table/hooks/useSort";
import { ref } from 'vue'
import {DATA} from "../const";
import {SORT_ITEM} from "../../src/const";

const data = ref(DATA)
const orderByName = ref('name')
const normal = ref(SORT_ITEM.normal)
const asc = ref(SORT_ITEM.asc)
const desc = ref(SORT_ITEM.desc)
const orderByAge = ref('name')
// 自定义回调排序
function onSort() {
  return []
}

test('使用默认的排序', async () => {
  const normalWrapper = useSort(data, orderByName, normal, undefined)
  // 不排序时返回的数组和传入的数组一致
  expect(normalWrapper.sortData.value === data.value).toEqual(true)

  // 基于name列正序
  const ascWrapper = useSort(data, orderByName, asc, undefined)

  const ascData = data.value.sort((a: any, b: any) => {
    return a[orderByName.value].localeCompare(b[orderByName.value], '', { numeric: true })
  })

  expect(ascWrapper.sortData.value === ascData).toEqual(true)

  // 基于age列倒序
  const descWrapper = useSort(data, orderByAge, desc, undefined)

  const descData = data.value.sort((a: any, b: any) => {
    return b[orderByAge.value] - a[orderByAge.value]
  })

  expect(descWrapper.sortData.value === descData).toEqual(true)
})

test('使用自定义回调的排序', async () => {
  const wrapper = useSort(data, orderByName, desc, onSort)

  // 设置回调返回的是个空数组
  expect(wrapper.sortData.value).toHaveLength(0)
})
