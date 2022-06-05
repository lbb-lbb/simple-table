import {expect, test} from "vitest";
import tableHeader from "../../src/components/lxy_table/table_header/index.vue"
import {myWrapper} from "../util";
import {SORT_ITEM} from "../../src/const";
import {COLUMNS, OPEN_OPTION} from "../const";


test('mount', async () => {
  const wrapper = myWrapper(tableHeader, {props: {columns: COLUMNS}})
  expect(wrapper.html()).toMatchSnapshot();
})

test('表头数据配sort为true时出现排序图标', async () => {
  const wrapper = myWrapper(tableHeader, {props: {columns: COLUMNS}})
  const thList = wrapper.findAll('th')

  expect(thList.length).toEqual(5)
  // 传入的数据只有第一列开启了排序功能
  expect(thList[0].get('.header-filter').classes(SORT_ITEM.normal)).toBe(true)
  expect(thList[1].get('.header-filter').classes(SORT_ITEM.normal)).toBe(false)
})

test('点击排序，排序图标由原序转为顺序正序-倒叙-原序', async () => {
  const wrapper = myWrapper(tableHeader,
    {
        props: {columns: COLUMNS},
        data() {
          return {sortType: SORT_ITEM.normal}
        }
    })
  const thList = wrapper.findAll('th')
  const sortElement = thList[0].get('.header-filter')
  // 第一次点击，原序变正序
  await sortElement.trigger('click')
  const changeSortEvent = wrapper.emitted('changeSort')

  expect(changeSortEvent).toBeTruthy()

  await wrapper.setData({
    sortType: (changeSortEvent![0])[0].sort
  })
  expect(sortElement.classes()).toContain(SORT_ITEM.asc)
// 第二次点击，正序变倒叙
  await sortElement.trigger('click')
  await wrapper.setData({
    sortType: (changeSortEvent![1])[0].sort
  })
  expect(sortElement.classes()).toContain(SORT_ITEM.desc)
// 第三次点击，倒叙变原序
  await sortElement.trigger('click')
  await wrapper.setData({
    sortType: (changeSortEvent![2])[0].sort
  })
  expect(sortElement.classes()).toContain(SORT_ITEM.normal)

  expect(changeSortEvent).toHaveLength(3)

})

test('开启操作列', async () => {
  const wrapper = myWrapper(tableHeader, {props: {columns: COLUMNS, openOption: OPEN_OPTION}})
  const thList = wrapper.findAll('th')
  // 最后一个th为操作列，判断其text
  expect(thList[thList.length - 1].text()).toEqual('操作')
  expect(wrapper.html()).toMatchSnapshot();
})
