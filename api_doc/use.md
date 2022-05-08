## <center> simple-table组件使用api文档

### 表格可用功能

- 表头渲染（可自定义渲染）
- 表格内容列渲染（可自定义渲染）
- 表格右侧操作列（表头内容及表格内容均可自定义渲染）
- 分页功能（上一页、下一页、跳页、总数显示、当前页数量显示）
- 按列排序功能（正序、倒叙、恢复无序）

### 表格属性

| 参数          | 说明                            | 类型           | 可选值          | 默认值                           |
|-------------|-------------------------------|--------------|--------------|-------------------------------|
| data        | 表格的内容数据                       | array        | -            | [ ]                           |
| columns     | 表头数据                          | array        | -            | [ ]                           |
| openOption  | 是否打开操作列                       | boolean      | true         | false                         |
| pages       | 分页参数                          | object       | -            | ```{ total: 0, size: 10 } ``` |
| currentPage | 当前页（双向绑定）                     | number       | ```number``` | 1                             |
| @changePage | 当前页修改时抛出来的数据，可用于重新请求表格数据，分页参数 | ``` event``` | -            | -                             |

### 表格属性补充说明

参数```columns```说明：
```javascript
export interface ColumnsType {
  label: string;  // 表头默认label，既在表头的默认展示内容，必须要有
  value: string;  // 表头默认展示的标识，匹配data中的key值。
  sort?: boolean; // 该列是否开启排序
}

//例子
columns = [
  { value: 'name', label: 'Name', sort: true },
  { value: 'age', label: 'Age', sort: true },
  { value: 'is_manager', label: 'Manager', sort: true  },
  { value: 'start_date', label: 'Start Date' },
  { value: 'date', label: '时间', sort: true },
]
```
参数```data```说明：
```javascript
//例子, id作为唯一key标识
data = [
  { id: 1, name: 'Liz Lemon', age: 36, is_manager: true, start_date: '02-28-1999', date: new Date('1998-05-16') }]
```

参数```currentPage```说明：
```javascript
//例子
<simple-table v-model:currentPage="currentPage" />
```

参数```pages```说明：
```javascript

export interface PagesType {
  total: number; // 总数
  size: number  // 当前页最多可显示的数量
}
// 例子
pages = {
  total: 0,
  size: 10
}
```
### 使用自定义渲染表头、表格列内容、操作列

```html
<simple-table>
      <template v-slot:header-age="scope">
        <div>自定义表头</div>
        <div>{{scope}}</div>
      </template>
      <template v-slot:name="scope">
        <div>自定义内容</div>
        <div>{{scope}}</div>
      </template>
      <template v-slot:options="scope">
        <div>自定义操作列</div>
        <div>{{scope}}</div>
      </template>
    </simple-table>
```
如上面的例子，要自定义表头列的```age```（年龄）列，在```columns```中对应的value值为```age```那么在```<simple-table> ```组件中，其对应的
具名插槽为```header-age```, 即该列的```header-``` + ```age```。

同理，自定义表格列内容，其对应的具名插槽为该列的```value```值，操作列表头具名插槽为```header-options```,操作列内容具名插槽为```options```




