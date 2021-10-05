import { useEffect, useState } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { sessionActions } from './store/sessionsSlice'
import type { RootState, AppDispatch } from './store'
import { getIntrospection } from './utils'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type SyncProps = {
  id: string
  servicePath: string
}

export const useSync = ({ id, servicePath }: SyncProps) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(!servicePath ? 'Invalid Service URL' : null)

  const dispatch = useAppDispatch()

  const sync = () => {
    if (!servicePath) {
      setError('Invalid Service URL')
    }

    setError(null)
    setLoading(true)
    getIntrospection(servicePath)
      .then((result) => {
        if (result.isOk) {
          dispatch(sessionActions.updateSchema({ id, schema: result.value }))
        } else {
          setError('Server Error')
        }
      })
      .catch((err) => {
        setError('Unknown Error')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return {
    loading,
    error,
    sync,
  }
}

export const useInternal = (callback: () => void, intermittent: number) => {
  const [running, setRunning] = useState(false)
  const [intervalId, setIntervalId] = useState(0)

  const start = () => {
    setRunning(true)
    setIntervalId(setInterval(callback, intermittent) as unknown as number)
  }

  const stop = () => {
    setRunning(false)
    clearInterval(intervalId)
  }

  useEffect(() => {
    return () => {
      stop()
    }
  }, [])

  return {
    running,
    start,
    stop,
  }
}
