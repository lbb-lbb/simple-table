import { expect, test } from "vitest";
import Pagination from "../../src/components/pagination/pagination.vue"
import {myWrapper} from "../util";
import {nextTick} from "vue";

const currentPage = 2
const pages = {
    size: 10,
    total: 99
}


test("注入props数据是否正常展示分页", async () => {
    const wrapper = myWrapper(Pagination, {props: { currentPage: currentPage, pages: pages }})

    const totalElement = wrapper.get('.page-total')
    const sizeElement = wrapper.get('.page-size')
    const currentElement = wrapper.get('.page-current')
    // 测试html中包含传入的props数据文本
    expect(totalElement.text()).toBe('共99条')
    expect(sizeElement.text()).toBe('当前显示条目10')
    expect(currentElement.text()).toBe('当前在第2页')

    expect(wrapper.html()).toMatchSnapshot();
})

test("点击下一页触发事件改变currentPage", async () => {
    const wrapper = myWrapper(Pagination, {props: { currentPage: currentPage, pages: pages }})

    const plusElement = wrapper.get('.next-btn')
    await plusElement.trigger('click')
    const currentPageEvent = wrapper.emitted('update:currentPage')
    expect(currentPageEvent).toBeTruthy()

    await wrapper.setProps({
        currentPage: (currentPageEvent![0] as number[])[0]
    })
    await plusElement.trigger('click')



    expect(currentPageEvent).toHaveLength(2)

    expect(currentPageEvent![0]).toEqual([3])

    expect(currentPageEvent![1]).toEqual([4])

})

test("点击上一页触发事件改变currentPage", async () => {
    const wrapper = myWrapper(Pagination, {props: { currentPage: currentPage, pages: pages }})

    const subElement = wrapper.get('.per-btn')
    await subElement.trigger('click')
    const currentPageEvent = wrapper.emitted('update:currentPage')

    expect(currentPageEvent![0]).toEqual([1])
})

test("input输入点击触发事件改变currentPage", async () => {
    const wrapper = myWrapper(Pagination, {props: { currentPage: currentPage, pages: pages }})

    const inputElement = wrapper.get('.page-input')
    await inputElement.setValue(9)
    await wrapper.get('.next-submit').trigger('click')
    // 跳转第九页可以正常跳转，9包含在边界条件
    const currentPageEvent = wrapper.emitted('update:currentPage')
    expect(currentPageEvent).toBeTruthy()

    expect(currentPageEvent![0]).toEqual([9])

})

test("input输入负数或者小数或者大于最大页数输入框报红，且不会触发currentPage改变", async () => {
    const wrapper = myWrapper(Pagination, {props: { currentPage: currentPage, pages: pages }})

    const inputElement = wrapper.get('.page-input')
    // 输入小数，输入框变红，不触发事件
    await inputElement.setValue(1.2)
    const submitElement = wrapper.get('.next-submit')
    await submitElement.trigger('click')
    expect(inputElement.classes()).toContain('valid')
    const currentPageEvent = wrapper.emitted('update:currentPage')
    expect(currentPageEvent).toBe(undefined)

    // 输入负数，输入框变红，不触发事件
    await inputElement.setValue(-1)
    await submitElement.trigger('click')
    expect(inputElement.classes()).toContain('valid')
    expect(currentPageEvent).toBe(undefined)

    // 输入超过最大页数，输入框变红，不触发事件
    await inputElement.setValue(12)
    await submitElement.trigger('click')
    expect(inputElement.classes()).toContain('valid')
    expect(currentPageEvent).toBe(undefined)
    // 超过最大页数，不触发更新页数事件，当前页数仍然是传初始传入2
    expect(wrapper.props().currentPage).toEqual(2)

    // 输入最大页数，正常跳转触发事件
    await inputElement.setValue(10)
    await submitElement.trigger('click')

    expect(inputElement.classes()).not.toContain('valid')
    expect(wrapper.emitted('update:currentPage')![0][0]).toEqual(10)

})

test("测试页数边界", async () => {
    // 测试边界为1-10页，等于1无法点击上一页，等于10无法点击下一页
    const wrapper = myWrapper(Pagination, {props: { currentPage: 1, pages: pages }})
    // 在第一页，无法点击上一页进行跳转
    const preElement = wrapper.get('.per-btn')
    const plusElement = wrapper.get('.next-btn')
    // 上一页按钮disabled属性为true
    expect(preElement.isDisabled()).toEqual(true)
    // 下一页按钮disabled属性为false
    expect(plusElement.isDisabled()).toEqual(false)

    await wrapper.setProps({
        currentPage: 10
    })
    // 上一页按钮disabled属性为false
    expect(preElement.isDisabled()).toEqual(false)
    // 下一页按钮disabled属性为true
    expect(plusElement.isDisabled()).toEqual(true)
})
