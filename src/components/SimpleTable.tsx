import { defineComponent, ref } from "vue";
import { type TableProps, tableProps } from "./types";
import TableBody from './table_body'
import TableHeader from './table_header'
import TableFooter from './table_footer'
export default defineComponent({
  name: "SimpleTable",
  props: tableProps,
  components: {
    TableBody,
    TableFooter,
    TableHeader
  },
  setup(props: TableProps, { attrs, emit, slots }) {
    const a = ref('我是头部')
    return () => {
      return (
        <div>
          <table border={1} width={600} height={400}>
            <table-header a={a} />
            <table-body />
          </table>
          <table-footer />
        </div>
      );
    };
  },
});
