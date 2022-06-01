
export function addHeaderSlotName(value: string) {
    return `header-${value}`
}
/** 存在小数位数返回true */
export function isInteger(n: string){
    return parseInt(n) === parseFloat(n)
}

export function info(message: unknown) {
    if (import.meta.env.MODE !== 'production') {
        console.info(message + '----------------' + loggerMessage())
    }
}

export function err(message: unknown) {
    if (import.meta.env.MODE !== 'production') {
        console.error(message + '----------------' + loggerMessage())
    }
}
export function trace(message: unknown) {
    if (import.meta.env.MODE !== 'production') {
        console.trace(message + '----------------' + loggerMessage())
    }
}

export function warn(message: unknown) {
    if (import.meta.env.MODE !== 'production') {
        console.warn(message + '----------------' + loggerMessage())
    }
}
function loggerMessage() {
    return `components name [lxy-table] ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
}

