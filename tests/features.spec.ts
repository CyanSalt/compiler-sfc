import { describe, expect, it } from 'vitest'
import { compileTemplate } from '../dist/compiler-sfc'

describe('shouldDetectErrors', () => {

  it('should detect error for non-TS template', () => {
    const result = compileTemplate({
      filename: 'example.vue',
      source: `<input :value="foo as string">`,
    })
    expect(result.errors.length).toBe(1)
  })

  it('should not detect error for TS template by default', () => {
    const result = compileTemplate({
      filename: 'example.vue',
      source: `<input :value="foo as string">`,
      isTS: true,
    })
    expect(result.errors.length).toBe(0)
  })

  it('should be controlled by compiler options', () => {
    const result = compileTemplate({
      filename: 'example.vue',
      source: `<input :value="foo as string">`,
      isTS: true,
      compilerOptions: {
        shouldDetectErrors: true,
      },
    })
    expect(result.errors.length).toBe(1)
  })

})

describe('ignoreUpdateEventNameCasing', () => {

  it('should transform update event from camel case to hyphen case', () => {
    const result = compileTemplate({
      filename: 'example.vue',
      source: `<input @update:modelValue="handleUpdate">`,
    })
    expect(result.code).toMatch(`{
    on: {
      "update:modelValue": _vm.handleUpdate,
      "update:model-value": _vm.handleUpdate,
    },
  }`)
  })

  it('should transform update event from hyphen case to camel case', () => {
    const result = compileTemplate({
      filename: 'example.vue',
      source: `<input @update:model-value="handleUpdate">`,
    })
    expect(result.code).toMatch(`{
    on: {
      "update:model-value": _vm.handleUpdate,
      "update:modelValue": _vm.handleUpdate,
    },
  }`)
  })

  it('should be controlled by compiler options', () => {
    const result = compileTemplate({
      filename: 'example.vue',
      source: `<input @update:modelValue="handleUpdate">`,
      compilerOptions: {
        ignoreUpdateEventNameCasing: false,
      },
    })
    expect(result.code).toMatch(`{ on: { "update:modelValue": _vm.handleUpdate } }`)
  })

})
