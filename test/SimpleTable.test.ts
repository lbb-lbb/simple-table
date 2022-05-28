import { shallowMount } from "@vue/test-utils";
import { expect, test } from "vitest";
import SimpleTable from "../src/components/lxy_table/lxy_table.vue";

test("mount component", () => {
  const wrapper = shallowMount(SimpleTable, {
    props: {},
  });

  expect(wrapper.html()).toMatchSnapshot();
});
