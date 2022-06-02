import {shallowMount, mount} from "@vue/test-utils";
import {expect} from "vitest";
import { createApp } from "vue";

type ParamsType = Parameters<typeof shallowMount>;
type OptionsType = ParamsType extends [ any, ...infer R ] ? R : []

export function myWrapper(vm: ParamsType, options: OptionsType) {
  return shallowMount(vm, options)
}

export function myAllWrapper(vm: ParamsType, options: OptionsType) {
  return mount(vm, options)
}

export function withSetup(composable) {
  let result
  const app = createApp({
    setup() {
      result = composable()
      return () => {}
    }
  })
  app.mount(document.createElement('div'))
  // 返回结果和应用实例
  // 用于测试提供/卸载
  return [result, app]
}
