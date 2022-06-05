import  Mock from "mockjs"

const arr = [1,2,3,4,5,6,7,8,9,10]

export const tableData = arr.map(() => {
  return Mock.mock({
    'list|10': [
      {
        name: '@cname',
        age: '@natural(10, 100)',
        isManager: '@boolean',
        description: '@csentence(3, 5)',
        date: '@date("yyyy-MM-dd")'
      }
    ]
  }).list
})