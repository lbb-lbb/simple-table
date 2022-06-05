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

test("传入空表头", async () => {
  function html() {
    myWrapper(lxyTable)
  }

  expect(html).toThrowError('传入的columns必须是个非空数组');
})

test('options插槽名冲突', () => {
  function html() {
    myWrapper(lxyTable, {
      props: {
        columns: [{value: 'options', label: 'Name'}],
        openOption: true
      }
    })
  }

  expect(html).toThrowError('开启的操作列插槽名"options"与columns里的value存在重名');
})

test('empty插槽名冲突', () => {
  function html() {
    myWrapper(lxyTable, {
      props: {
        columns: [{value: 'empty', label: 'Name'}]
      }
    })
  }

  expect(html).toThrowError('为空的插槽名"empty"与columns里的value存在重名');
})


