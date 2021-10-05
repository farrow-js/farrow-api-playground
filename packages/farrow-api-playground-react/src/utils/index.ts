import { FormatResult } from 'farrow-api/dist/toJSON'
import type { IntrospectionCalling, ApiResponseSingle } from 'farrow-api-server'
import { Result, Ok, Err } from './result'

export type IntrospectionResult = Result<FormatResult>

export const getIntrospection = async (src: string): Promise<IntrospectionResult> => {
  const data: IntrospectionCalling = {
    type: 'Introspection',
  }
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }
  try {
    return fetch(src, options)
      .then((response) => {
        return response.json()
      })
      .then((result: ApiResponseSingle) => {
        if (result.type === 'ApiSuccessResponse') {
          return Ok(result.output as FormatResult)
        } else {
          return Err('Server Introspection Error')
        }
      })
      .catch((err) => {
        return Err(err.message)
      })
  } catch (err) {
    return Err('Server cannot be reached.')
  }
}
