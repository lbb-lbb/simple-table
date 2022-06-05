import { expect, test } from "vitest";
import { usePagination } from "../../src/components/pagination/hooks/usePageation"
import {ref} from "vue"
import {withSetup} from "../util";

const currentPage = ref(1)
const pages = ref({
  size: 10,
  total: 99
})
const changePage = function(val: number) {
  return currentPage.value = val
}
test("isDisablePlusButton、isDisableReduceButton根据currentPage，size,total自动为true或false", async () => {
  const currentPage = ref(1)
  const [result, app] = withSetup(() => usePagination(currentPage, pages, changePage))
  // 首页时候上一页返回为true
  expect(result!.isDisableReduceButton.value).toEqual(true)
  expect(result!.isDisablePlusButton.value).toEqual(false)

  currentPage.value = 10
  // 末页时候上一页返回为false
  expect(result!.isDisableReduceButton.value).toEqual(false)
  expect(result!.isDisablePlusButton.value).toEqual(true)
})

test('调用plusPage，reducePage，reducePage触发回调', async () => {
  const wrapper = usePagination(currentPage, pages, changePage)
  await wrapper.plusPage()
  expect(currentPage.value).toEqual(2)
  await wrapper.reducePage()
  expect(currentPage.value).toEqual(1)
  await wrapper.jumpPage(10)
  expect(currentPage.value).toEqual(10)
})

test('输入错误跳转，isInvalid为true，currentPage不改变', async () => {
  const wrapper = usePagination(currentPage, pages, changePage)

  await wrapper.jumpPage(10)
  expect(currentPage.value).toEqual(10)
  expect(wrapper.isInvalid.value).toEqual(false)
  // 跳转到一个小数或者大于0的数， currentPage将保持不变
  await wrapper.jumpPage(-14)
  expect(currentPage.value).toEqual(10)

  await wrapper.jumpPage(1.8)
  expect(wrapper.isInvalid.value).toEqual(true)
  expect(currentPage.value).toEqual(10)
  // 正确跳转
  await wrapper.jumpPage(2)
  expect(wrapper.isInvalid.value).toEqual(false)
  expect(currentPage.value).toEqual(2)
})
