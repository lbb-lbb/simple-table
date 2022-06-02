import { expect, test } from "vitest";
import lxyTable from "../../src/components/lxy_table/lxy_table.vue";
import {myAllWrapper, myWrapper} from "../util";
import {COLUMNS, DATA} from "../const";

test("mount component", async () => {
  const wrapper = myAllWrapper(lxyTable, {
    props: {
      columns: COLUMNS,
      data: DATA
    },
  });

  // 点击排序图标
  await wrapper.findAll('.header-filter')[0].trigger('click')

  expect(wrapper.html()).toMatchSnapshot();
});

test("使用name列插槽以及操作列插槽", () => {
  const wrapper = myAllWrapper(lxyTable, {
    props: {
      columns: COLUMNS,
      data: DATA,
      openOption: true
    },
    slots: {
      name: '<div class="name">name列内容</div>',
      'header-name': '<div class="header-name">name列表头</div>',
      options: '<div class="body-options">表格操作列内容</div>',
      'header-options': '<div class="header-options">表头操作列内容</div>'
    }
  });
  expect(wrapper.find('.header-options').exists()).toBe(true)
  expect(wrapper.find('.body-options').exists()).toBe(true)
  expect(wrapper.find('.header-name').exists()).toBe(true)
  expect(wrapper.find('.name').exists()).toBe(true)
  expect(wrapper.html()).toMatchSnapshot();
});

test("不传入表头", async () => {
  const wrapper = myWrapper(lxyTable);
  expect(wrapper.html()).toMatchSnapshot();
})
