import {shallowMount, mount} from "@vue/test-utils";
import {VueNode} from "@vue/test-utils/dist/types";

export function myWrapper(vm: VueNode, options: Record<string, any>) {
  return shallowMount(vm, options)
}

export function myAllWrapper(vm: VueNode, options: Record<string, any>) {
  return mount(vm, options)
}