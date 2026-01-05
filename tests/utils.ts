import { parse as babelParse } from '@babel/parser'
import { expect } from 'vitest'
import type { SFCParseOptions, SFCScriptCompileOptions } from '../dist/compiler-sfc'
import {
  compileScript,
  parse,


} from '../dist/compiler-sfc'

export const mockId = 'xxxxxxxx'

export function compile(
  source: string,
  options?: Partial<SFCScriptCompileOptions>,
  parseOptions?: Partial<SFCParseOptions>,
) {
  const sfc = parse({
    ...parseOptions,
    source,
  })
  return compileScript(sfc, { id: mockId, ...options })
}

export function assertCode(code: string) {
  // parse the generated code to make sure it is valid
  try {
    babelParse(code, {
      sourceType: 'module',
      plugins: ['typescript'],
    })
  } catch (e: any) {
    console.log(code)
    throw e
  }
  expect(code).toMatchSnapshot()
}

export const enum BindingTypes {
  DATA = 'data',
  PROPS = 'props',
  PROPS_ALIASED = 'props-aliased',
  SETUP_LET = 'setup-let',
  SETUP_CONST = 'setup-const',
  SETUP_REACTIVE_CONST = 'setup-reactive-const',
  SETUP_MAYBE_REF = 'setup-maybe-ref',
  SETUP_REF = 'setup-ref',
  OPTIONS = 'options',
}
