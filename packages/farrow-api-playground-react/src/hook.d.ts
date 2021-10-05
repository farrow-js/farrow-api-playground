import { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from './store'
export declare const useAppDispatch: () => import('@reduxjs/toolkit').ThunkDispatch<
  {
    sessions: {
      sessions: import('./store/sessionsSlice').Session[]
      activeSessionId: string
    }
    config: {
      intermittent: number
    }
  },
  null,
  import('redux').AnyAction
> &
  import('@reduxjs/toolkit').ThunkDispatch<
    {
      sessions: {
        sessions: import('./store/sessionsSlice').Session[]
        activeSessionId: string
      }
      config: {
        intermittent: number
      }
    },
    undefined,
    import('redux').AnyAction
  > &
  import('redux').Dispatch<import('redux').AnyAction>
export declare const useAppSelector: TypedUseSelectorHook<RootState>
export declare type SyncProps = {
  id: string
  servicePath: string
}
export declare const useSync: ({ id, servicePath }: SyncProps) => {
  loading: boolean
  error: string | null
  sync: () => void
}
export declare const useInternal: (
  callback: () => void,
  intermittent: number,
) => {
  running: boolean
  start: () => void
  stop: () => void
}
