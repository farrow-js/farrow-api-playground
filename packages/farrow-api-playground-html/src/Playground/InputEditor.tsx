import { useMemo } from 'react'
import styled from 'styled-components'

import { useAppSelector, useAppDispatch } from './hook'
import { sessionActions } from './store/sessionsSlice'

export const InputEditor = () => {
  const sessions = useAppSelector((state) => state.sessions.sessions)
  const id = useAppSelector((state) => state.sessions.activeSessionId)

  const session = useMemo(() => {
    return sessions.find((session) => session.id === id)!
  }, [id])

  const dispatch = useAppDispatch()

  return <InputEditorContainer></InputEditorContainer>
}

const InputEditorContainer = styled.div``
