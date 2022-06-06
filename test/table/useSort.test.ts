import { expect, test, vi } from "vitest";
import { useSort } from "../../src/components/lxy_table/hooks/useSort";
import { ref } from "vue"
import {SORT_ITEM} from "../../src/const";
import {withSetup} from "../util";

const ascDataFormName = [{name: 'a', age: 1}, {name: 'b', age: 3}, {name: 'c', age: 2}]
const descDataFormAge = [{name: 'b', age: 3}, {name: 'c', age: 2}, {name: 'a', age: 1}]
const data = ref([{name: 'c', age: 2}, {name: 'a', age: 1}, {name: 'b', age: 3}])
const orderByName = ref('name')
const normal = ref(SORT_ITEM.normal)
const asc = ref(SORT_ITEM.asc)
const desc = ref(SORT_ITEM.desc)
const orderByAge = ref('age')
// 自定义回调排序
const onSort = vi.fn((data:Record<string, any>, option: Record<string, string>) => data[0])

test('使用默认的排序', async () => {
  const normalWrapper = useSort(data, orderByName, normal, undefined)
  // 不排序时返回的数组和传入的数组一致
  expect(normalWrapper.sortData.value).toEqual(data.value)

  // 基于name列正序
  const ascWrapper = useSort(data, orderByName, asc, undefined)

  expect(ascWrapper.sortData.value).toEqual(ascDataFormName)

  // 基于age列倒序
  const descWrapper = useSort(data, orderByAge, desc, undefined)
  expect(descWrapper.sortData.value).toEqual(descDataFormAge)
})

test('使用自定义回调的排序', async () => {
  const [result, app] = withSetup(() => useSort(data, orderByName, desc, onSort))
  // 回调onSort调用返回的是个空数组
  expect(result!.sortData.value).toEqual({name: 'c', age: 2})
  data.value = descDataFormAge
  expect(result!.sortData.value).toEqual({name: 'b', age: 3})
})

