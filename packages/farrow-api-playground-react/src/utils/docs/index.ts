import { Api, ApiEntries, ApiType } from 'farrow-api'
import type { FormatResult, FormatEntries, FormatApi } from 'farrow-api/dist/toJSON'
import type { FieldDescriptor, SchemaCtor } from 'farrow-schema'
import type { FormatField } from 'farrow-schema/formatter'
import { controvertTypes } from './types'

export const genDocs = (input: FormatResult): ApiEntries => {
  const types = controvertTypes(input.types)

  const findType = (typeId: number): SchemaCtor => {
    const schemaCtor = types.get(typeId.toString())

    if (!schemaCtor) {
      throw new Error(`Unknown typeId: ${typeId}`)
    }

    return schemaCtor
  }

  const controvertFieldType = (input: FormatField): FieldDescriptor => {
    return {
      __type: findType(input.typeId),
      description: input.description,
      deprecated: input.deprecated,
    }
  }

  const controvertApi = (input: FormatApi): ApiType => {
    return Api({
      input: controvertFieldType(input.input),
      output: controvertFieldType(input.output),
      description: input.description,
      deprecated: input.deprecated,
    })
  }

  const controvertEntries = (input: FormatEntries): ApiEntries => {
    const entries: ApiEntries = {}

    for (const name in input.entries) {
      const item = input.entries[name as keyof typeof input.entries]
      if (item.type === 'Api') {
        entries[name] = controvertApi(item)
      } else {
        entries[name] = controvertEntries(item)
      }
    }

    return entries
  }

  return controvertEntries(input.entries)
}
