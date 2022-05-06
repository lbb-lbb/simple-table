import { defineComponent, ref, reactive } from "vue";
import { type TableProps, tableProps } from "../types";

export default defineComponent({
  name: "SimpleTable5",
  props: { a: String },
  setup(props: TableProps, { attrs, emit, slots }) {

    const a = reactive({...props})
    const columns = reactive([
      { accessor: 'name', label: 'Name' },
      { accessor: 'age', label: 'Age' },
      { accessor: 'is_manager', label: 'Manager', },
      { accessor: 'start_date', label: 'Start Date' },
    ])
    return () => {
      return (
        <thead>
        <tr>
          {columns.map(column => {
            return <th key={column.accessor}>{column.label}{a.a}</th>
          })}
        </tr>
        </thead>
      );
    };
  },
});
