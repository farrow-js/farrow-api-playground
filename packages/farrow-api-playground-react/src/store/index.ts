import { configureStore } from '@reduxjs/toolkit'
// FIXME: https://github.com/microsoft/TypeScript/issues/42873
import 'redux-thunk'
import { sessionsReducer } from './sessionsSlice'
import { configReducer } from './configSlice'

const FARROWN_PALYGROUND_SESSIONS = 'farrow-playground'

const stateStr = localStorage.getItem(FARROWN_PALYGROUND_SESSIONS)
const state = JSON.parse(stateStr || '{}')

const store = configureStore({
  reducer: {
    sessions: sessionsReducer,
    config: configReducer,
  },
  preloadedState: {
    sessions: state && state.sessions ? state.sessions : undefined,
    config: state && state.config ? state.config : undefined,
  },
})

store.subscribe(() => {
  const state = store.getState()
  localStorage.setItem(FARROWN_PALYGROUND_SESSIONS, JSON.stringify(state))
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
