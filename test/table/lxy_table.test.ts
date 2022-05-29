import { expect, test } from "vitest";
import lxyTable from "../../src/components/lxy_table/lxy_table.vue";
import {myAllWrapper} from "../util";
import {COLUMNS, DATA} from "../const";

test("mount component", () => {
  const wrapper = myAllWrapper(lxyTable, {
    props: {
      columns: COLUMNS,
      data: DATA
    },
  });

  expect(wrapper.html()).toMatchSnapshot();
});
