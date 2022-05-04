import { defineComponent, ref } from "vue";
import { type TableProps, tableProps } from "../types";

export default defineComponent({
  name: "SimpleTable2",
  props: tableProps,
  setup(props: TableProps, { attrs, emit, slots }) {
    const a = ref('上一页下一页')
    return () => {
      return (
        <div>{a.value}</div>
      );
    };
  },
});
