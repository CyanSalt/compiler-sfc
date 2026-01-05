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
