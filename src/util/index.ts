/** @format */

export function addHeaderSlotName(value: string) {
    return `header-${value}`
}

export function isInteger(n: string){
    return parseInt(n) === parseFloat(n)
}
