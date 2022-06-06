import {DataType, TableType} from "../type";
import {ref, toRefs, computed} from "vue";
import {err, warn} from "../../../util";

export function useProps(props: TableType<DataType>) {
    const { columns, onSort } = toRefs(props)

    if (!columns.value) {
        warn('传入的columns必须是个非空数组')
        throw new Error('传入的columns必须是个非空数组')
    }
    if (columns.value.findIndex((v => v.value === 'options')) !== -1 && props.openOption) {
        err('开启的操作列插槽名"options"与columns里的value存在重名')
        throw new Error('开启的操作列插槽名"options"与columns里的value存在重名')
    }
    if (columns.value.findIndex((v => v.value === 'empty')) !== -1) {
        err('为空的插槽名"empty"与columns里的value存在重名')
        throw new Error('为空的插槽名"empty"与columns里的value存在重名')
    }

    /** 对props的类型判断重写 */

    const data = computed(() => {
        return props.data ? props.data : []
    });

    const orderBy = computed(() => {
        return props.orderBy ? props.orderBy : ''
    })

    const order = computed(() => {
        return props.order ? props.order : ''
    })

    const openOption = computed(() => {
        return props.openOption ? props.openOption : false
    })

    return {
        columns,
        data,
        onSort,
        orderBy,
        order,
        openOption
    }
}
