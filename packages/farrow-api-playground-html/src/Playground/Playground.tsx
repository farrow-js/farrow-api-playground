import { useMemo } from 'react'
import styled from 'styled-components'
import { createApiPipelineWithUrl } from 'farrow-api-client'
import { JSONEditor } from './JSONEditor'
import { JSONDisplayer } from './JSONDisplayer'

import { useAppSelector, useAppDispatch } from './hook'
import { sessionActions, Session, API, sessionsReducer } from './store/sessionsSlice'

import { ServiceLinker } from './ServiceLinker'
import { ApiSelect } from './ApiSelect'

export const Playground = () => {
  const sessions = useAppSelector((state) => state.sessions.sessions)
  const id = useAppSelector((state) => state.sessions.activeSessionId)
  return (
    <>
      {sessions.map((session) => {
        return <SinglePlayground isCurrent={id === session.id} key={session.id} session={session} />
      })}
    </>
  )
}

export type SinglePlaygroundProps = {
  session: Session
  isCurrent: boolean
}


const findAPI = (apis: API[], name: string): API | null => {
  for(const api of apis) {
    if (api.name === name) return api
    if (api.children) {
      const result = findAPI(api.children, name)
      if (result) return result
    }
  }

  return null
}

const SinglePlayground = ({ session, isCurrent }: SinglePlaygroundProps) => {
  const id = useAppSelector((state) => state.sessions.activeSessionId)
  const api = useMemo(() => findAPI(session.apis, session.title), [session, session.schema, session.title, session.apis])

  const dispatch = useAppDispatch()

  const handleInputChange = (content: string) => {
    dispatch(sessionActions.updaetInput({ id, input: content }))
  }

  const send = () => {
    if (!api) {
      return
    }
    const pipeline = createApiPipelineWithUrl(session.servicePath)
    pipeline.invoke({
      type: 'Single',
      path: [api.name],
      input: JSON.parse(api?.input || '')
    }).then(res => {
      dispatch(sessionActions.setOutput({ id, output: JSON.stringify(res) }))
    })
  }

  const handleSendClick = () => {
    send()
  }

  return (
    <SinglePlaygroundContainer isCurrent={isCurrent}>
      <ServiceLinker id={session.id} servicePath={session.servicePath} />
      <OperatorContainer>
        <ApiSelectWrapper>
          <ApiSelect api={api} {...session} />
        </ApiSelectWrapper>
        <SendButton onClick={handleSendClick}>Send</SendButton>
      </OperatorContainer>
      <InputEditorContainer>
        <JSONEditor
          id={session.id}
          current={id}
          onSave={handleInputChange}
          value={api?.input || ''}
          style={{ width: '100%', height: 'auto', minHeight: '350px', border: '1px solid #d4d4d4' }}
        />
      </InputEditorContainer>
      <OutDisplayerContainer>
        <JSONDisplayer
          id={session.id}
          value={api?.output || ''}
          style={{ width: '100%', height: 'auto', minHeight: '450px' }} />
      </OutDisplayerContainer>
    </SinglePlaygroundContainer>
  )
}

const InputEditorContainer = styled.div`
`

const OutDisplayerContainer = styled.div`
margin-top: 20px;
`

export type SinglePlaygroundContainerProps = {
  isCurrent: boolean
}

const SinglePlaygroundContainer = styled.main<SinglePlaygroundContainerProps>`
  display: flex;
  width: 100%;
  animation: ease-in 0.5s ease-out forwards 0.2s;
  padding: 0 10px 40px 10px;
  box-sizing: border-box;
  display: ${({ isCurrent }) => (isCurrent ? 'block' : 'none')};
`

const OperatorContainer = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  padding: 10px 0;
  justify-content: space-between;
  width: 100%;
`

const ApiSelectWrapper = styled.div`
  flex: 1 1 0%;
`

const SendButton = styled.button`
  margin-left: 6px;
  width: 206px;
  box-sizing: border-box;
  border-radius: 3px;
  height: 40px;
  padding: 0 10px 0 10px;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 14px;
  font-weight: normal;
  font-family: 'OpenSans', Helvetica, Arial, sans-serif;
  cursor: default;
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  border: none;
  font-weight: 600;
  color: #fff;
  background: rgb(9, 123, 237);
  &:hover {
    background-color: rgb(40, 143, 247);
  }
  &:active {
    background-color: rgb(20, 133, 246);
  }
`
