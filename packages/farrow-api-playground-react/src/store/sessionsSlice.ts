import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FormatResult } from 'farrow-api/dist/toJSON'
import { v4 as uuid } from 'uuid'
import { FormatEntries } from 'farrow-api/dist/toJSON'
import type { RootState } from './index'

export type API = {
  name: string
  path: string[]
  input?: string
  output?: string
  title: string
  description?: string
  deprecated?: string
  children?: API[]
}

export type Session = {
  id: string
  servicePath: string
  title: string
  schema: FormatResult | null
  apis: API[]
}

const createDefaultSession = (servicePath = ''): Session => ({
  id: uuid(),
  servicePath,
  title: 'untitled',
  schema: null,
  apis: [],
})

const defaultSession = createDefaultSession()

export const sessionsSlice = createSlice({
  name: 'session',
  initialState: {
    sessions: [defaultSession],
    activeSessionId: defaultSession.id,
  },
  reducers: {
    init: (state, { payload: sessions }: PayloadAction<Session[]>) => {
      if (sessions.length > 0) {
        state.sessions = sessions.filter((session) => session.id === defaultSession.id)
      }

      state.sessions.unshift(...sessions)
      state.activeSessionId = state.sessions[0].id
    },
    remove: (state, { payload: id }: PayloadAction<string>) => {
      const nextSessions = state.sessions.filter((session) => {
        return session.id === id
      })

      if (nextSessions.length === 0) {
        nextSessions.push(createDefaultSession())
      }

      state.sessions = nextSessions
    },
    add: (state) => {
      const currentSession = state.sessions.find((session) => session.id === state.activeSessionId)!
      const newSession = createDefaultSession(currentSession.servicePath)
      state.sessions.push(newSession)
      state.activeSessionId = newSession.id
    },
    changeServicePath: (
      state,
      { payload: { id, servicePath } }: PayloadAction<{ id: string; servicePath: string }>,
    ) => {
      state.sessions.forEach((session) => {
        if (session.id === id) {
          session.servicePath = servicePath
        }
      })
    },
    changeSelected: (state, { payload: id }: PayloadAction<string>) => {
      if (state.sessions.some((session) => session.id === id)) {
        state.activeSessionId = id
      }
    },
    sort: (state, { payload: { index, to } }: PayloadAction<{ index: number; to: number }>) => {
      const session = state.sessions.splice(index, 1)[0]
      const middle = index > to ? to : to - 1
      const head = state.sessions.slice(0, middle + 1)
      const tail = state.sessions.slice(middle + 1)
      state.sessions = [...head, session, ...tail]
    },
    updateSchema: (state, { payload: { id, schema } }: PayloadAction<{ id: string; schema: FormatResult }>) => {
      state.sessions.forEach((session) => {
        if (session.id === id) {
          session.schema = schema
          session.apis = transformEntries(schema.entries)
        }
      })
    },
    setName: (state, { payload: { id, name } }: PayloadAction<{ id: string; name: string }>) => {
      state.sessions.forEach((session) => {
        if (session.id === id) {
          session.title = name
        }
      })
    },
    updaetInput: (state, { payload: { id, input } }: PayloadAction<{ id: string; input: string }>) => {
      state.sessions.forEach((session) => {
        if (session.id === id) {
          session.apis.forEach(api => {
            api.input = input
          })
        }
      })
    },
    setOutput: (state, { payload: { id, output } }: PayloadAction<{ id: string; output: string }>) => {
      state.sessions.forEach((session) => {
        if (session.id === id) {
          session.apis.forEach(api => {
            api.output = output
          })
        }
      })
    },
  },
})

// Action creators are generated for each case reducer function
export const sessionActions = sessionsSlice.actions

export const sessionsReducer = sessionsSlice.reducer

export const selectCount = (state: RootState) => state.sessions.sessions


const transformEntries = (entries: FormatEntries | null, path: string[] = []): API[] => {
  if (!entries) return []

  const list: API[] = []

  for (const key in entries.entries) {
    const item = entries.entries[key as keyof typeof entries.entries]
    const newPath = [...path, key]
    if (item.type === 'Api') {
      list.push({
        title: key,
        description: item.description,
        deprecated: item.deprecated,
        name: key,
        path: newPath,
        input: '',
        output: ''
      })
    } else {
      list.push({
        title: key,
        children: transformEntries(item, newPath),
        name: key,
        path: newPath,
        input: '',
        output: ''
      })
    }
  }

  return list
}
