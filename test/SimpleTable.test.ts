import { shallowMount } from "@vue/test-utils";
import { expect, test } from "vitest";
import SimpleTable from "../src/components/lxy_table/lxy_table.vue";

test("mount component", () => {
  const wrapper = shallowMount(SimpleTable, {
    props: {
      columns: [
        {id: 1, name: 'Liz Lemon', age: 36, is_manager: true, start_date: '02-28-1999', date: new Date('1998-05-16')},
        {id: 2, name: '阀分撒', age: 40, is_manager: true, start_date: '03-05-1997', date: new Date('1998-05-17')},
        {id: 3, name: 'Tracy Morgan', age: 39, is_manager: false, start_date: '07-12-2002', date: new Date('1998-05-6')},
        {id: 4, name: 'Jenna Maroney', age: 40, is_manager: false, start_date: '02-28-1999', date: new Date('1998-05-7')},
        {id: 5, name: 'Kenneth Parcell', age: Infinity, is_manager: false, tart_date: '01-01-1970', date: new Date('1998-05-30')},
        {id: 6, name: '啊啊', age: null, is_manager: true, start_date: '04-01-2000', date: new Date('1998-05-28')},
        {id: 7, name: 'Frank Rossitano', age: 36, is_manager: false, start_date: null, date: new Date('1998-05-14')},
        {id: 8, name: null, age: 12, is_manager: null, start_date: null, date: new Date('1998-05-11')},
      ],
      data: [
        {id: 1, name: 'Liz Lemon', age: 36, is_manager: true, start_date: '02-28-1999', date: new Date('1998-05-16')},
        {id: 2, name: '阀分撒', age: 40, is_manager: true, start_date: '03-05-1997', date: new Date('1998-05-17')},
        {id: 3, name: 'Tracy Morgan', age: 39, is_manager: false, start_date: '07-12-2002', date: new Date('1998-05-6')},
        {id: 4, name: 'Jenna Maroney', age: 40, is_manager: false, start_date: '02-28-1999', date: new Date('1998-05-7')},
        {id: 5, name: 'Kenneth Parcell', age: Infinity, is_manager: false, tart_date: '01-01-1970', date: new Date('1998-05-30'),},
        {id: 6, name: '啊啊', age: null, is_manager: true, start_date: '04-01-2000', date: new Date('1998-05-28')},
        {id: 7, name: 'Frank Rossitano', age: 36, is_manager: false, start_date: null, date: new Date('1998-05-14')},
        {id: 8, name: null, age: 12, is_manager: null, start_date: null, date: new Date('1998-05-11')},
      ]
    },
  });

  expect(wrapper.html()).toMatchSnapshot();
});
