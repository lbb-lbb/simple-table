import { expect, test } from "vitest";
import tableBody from "../../src/components/lxy_table/table_body/index.vue"
import { myWrapper } from "../util";
import {COLUMNS, DATA, OPEN_OPTION} from "../const";
import {nextTick} from "vue";

test('data为空显示空状态', async () =>{
  const wrapper = myWrapper(tableBody, {props: {columns: COLUMNS}})

  const emptyElement = wrapper.get('.body-empty')
  expect(emptyElement.text()).toBe('数据为空')

  await wrapper.setProps({
    data: DATA
  })
  // 传入data，empty元素消失
  expect(wrapper.find('.body-empty').exists()).toBe(false)
})

test('插槽', async () => {
  const wrapper = myWrapper(tableBody, {
    props: { columns: COLUMNS },
    slots: {
      empty: '<div id="one">插槽内容: 数据为空</div>' // data数据为空时
    }
  })

  expect(wrapper.find('#one').exists()).toBe(true)
})

test('操作列的显隐', async () => {
  const wrapper = myWrapper(tableBody, {
    props: {
      columns: COLUMNS,
      data: DATA,
      openOption: OPEN_OPTION
    }
  })
  const optionList = wrapper.findAll('.body-option')
  expect(optionList).toHaveLength(DATA.length)

  await wrapper.setProps({
    openOption: false
  })

  expect(() => wrapper.get('.body-option')).toThrowError()

})

