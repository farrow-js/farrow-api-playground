import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// FIXME: https://github.com/microsoft/TypeScript/issues/42873
import 'immer'
import type { RootState } from '../store'

export type Config = {
  intermittent: number
}

export const configSlice = createSlice({
  name: 'config',
  initialState: {
    intermittent: 3000,
  },
  reducers: {
    updateIntermittent: (state, { payload }: PayloadAction<number>) => {
      state.intermittent = payload
    },

    init: (state, { payload }: PayloadAction<Config>) => {
      for (const key in payload) {
        // @ts-ignore
        state[key] = payload[key]
      }
    },
  },
})

export const configActions = configSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectIntermittent = (state: RootState) => state.config.intermittent

export const configReducer = configSlice.reducer
