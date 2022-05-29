import { expect, test } from "vitest";
import Pagination from "../../src/components/pagination/pagination.vue"
import {myWrapper} from "../util";

const currentPage = 2
const pages = {
    size: 20,
    total: 99
}


test("注入props数据是否正常展示分页", async () => {
    const wrapper = myWrapper(Pagination, {props: { currentPage: currentPage, pages: pages }})

    const totalElement = wrapper.get('.page-total')
    const sizeElement = wrapper.get('.page-size')
    const currentElement = wrapper.get('.page-current')

    expect(totalElement.text()).toBe('共99条')
    expect(sizeElement.text()).toBe('当前显示条目20')
    expect(currentElement.text()).toBe('当前在第2页')

    expect(wrapper.html()).toMatchSnapshot();
})

test("点击下一页触发事件改变currentPage", async () => {
    const wrapper = myWrapper(Pagination, {props: { currentPage: currentPage, pages: pages }})

    const plusElement = wrapper.get('.next-btn')
    await plusElement.trigger('click')
    const changePageEvent = wrapper.emitted('changePage')
    const currentPageEvent = wrapper.emitted('update:currentPage')
    expect(changePageEvent).toBeTruthy()
    expect(currentPageEvent).toBeTruthy()

    await wrapper.setProps({
        currentPage: (changePageEvent![0] as number[])[0]
    })
    await plusElement.trigger('click')


    expect(changePageEvent).toHaveLength(2)

    expect(changePageEvent![0]).toEqual([3])

    expect(changePageEvent![1]).toEqual([4])

    expect(currentPageEvent).toHaveLength(2)

    expect(currentPageEvent![0]).toEqual([3])

    expect(currentPageEvent![1]).toEqual([4])

})

test("点击上一页触发事件改变currentPage", async () => {
    const wrapper = myWrapper(Pagination, {props: { currentPage: currentPage, pages: pages }})

    const subElement = wrapper.get('.per-btn')
    await subElement.trigger('click')
    const changePageEvent = wrapper.emitted('changePage')
    const currentPageEvent = wrapper.emitted('update:currentPage')

    expect(changePageEvent![0]).toEqual([1])
    expect(currentPageEvent![0]).toEqual([1])
})

test("input输入点击触发事件改变currentPage", async () => {
    const wrapper = myWrapper(Pagination, {props: { currentPage: currentPage, pages: pages }})

    const inputElement = wrapper.get('.page-input')
    await inputElement.setValue(9)
    const submitElement = wrapper.get('.next-submit')
    await submitElement.trigger('click')

    const changePageEvent = wrapper.emitted('changePage')
    const currentPageEvent = wrapper.emitted('update:currentPage')

    expect(changePageEvent![0]).toEqual([9])
    expect(currentPageEvent![0]).toEqual([9])

})

test("input输入负数或者小数输入框报红，且不会触发currentPage改变", async () => {
    const wrapper = myWrapper(Pagination, {props: { currentPage: currentPage, pages: pages }})

    const inputElement = wrapper.get('.page-input')
    await inputElement.setValue(1.2)
    const submitElement = wrapper.get('.next-submit')
    await submitElement.trigger('click')

    expect(inputElement.classes()).toContain('valid')

    const changePageEvent = wrapper.emitted('changePage')
    const currentPageEvent = wrapper.emitted('update:currentPage')

    expect(changePageEvent).toBe(undefined)
    expect(currentPageEvent).toBe(undefined)

    await inputElement.setValue(-1)
    await submitElement.trigger('click')

    expect(inputElement.classes()).toContain('valid')
    expect(changePageEvent).toBe(undefined)
    expect(currentPageEvent).toBe(undefined)

})
