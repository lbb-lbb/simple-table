import { expect, test } from "vitest";
import { usePagination } from "../../src/components/pagination/hooks/usePageation"
import {ref} from 'vue'

const currentPage = ref(1)
const currentPage1 = ref(10)
const pages = ref({
  size: 20,
  total: 99
})
const changePage = function(val: number) {
  return currentPage.value = val
}
test("isDisablePlusButton、isDisableReduceButton根据currentPage，size,total自动为true或false", async () => {
  const wrapper = usePagination(currentPage, pages, changePage)
  // 首页时候上一页返回为true
  expect(wrapper.isDisableReduceButton.value).toEqual(true)
  expect(wrapper.isDisablePlusButton.value).toEqual(false)

  const changeCurrent = usePagination(currentPage1, pages, changePage)
  // 首页时候上一页返回为false
  expect(changeCurrent.isDisableReduceButton.value).toEqual(false)
  expect(changeCurrent.isDisablePlusButton.value).toEqual(true)
})

test('调用plusPage，reducePage，reducePage触发回调', async () => {
  const wrapper = usePagination(currentPage, pages, changePage)
  await wrapper.plusPage()
  expect(currentPage.value).toEqual(2)
  await wrapper.reducePage()
  expect(currentPage.value).toEqual(1)
  await wrapper.jumpPage(12)
  expect(currentPage.value).toEqual(12)
})

test('输入错误跳转，isValid为true，currentPage不改变', async () => {
  const wrapper = usePagination(currentPage, pages, changePage)

  await wrapper.jumpPage(12)
  expect(currentPage.value).toEqual(12)
  expect(wrapper.isValid.value).toEqual(false)
  // 跳转到一个小数或者大于0的数， currentPage将保持不变
  await wrapper.jumpPage(-14)
  expect(currentPage.value).toEqual(12)

  await wrapper.jumpPage(1.8)
  expect(wrapper.isValid.value).toEqual(true)
  expect(currentPage.value).toEqual(12)
})