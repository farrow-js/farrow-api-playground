import { useState } from 'react'
import styled from 'styled-components'
import { Loading } from './icons'

import { useAppSelector, useAppDispatch, useSync, useInternal } from './hook'
import { sessionActions } from './store/sessionsSlice'

export type ServiceLinkerProps = {
  id: string
  servicePath: string
}

export const ServiceLinker = ({ id, servicePath }: ServiceLinkerProps) => {
  const intermittent = useAppSelector((state) => state.config.intermittent)

  const dispatch = useAppDispatch()

  const { sync, error, loading } = useSync({ id, servicePath })
  const { running, start, stop } = useInternal(sync, intermittent)

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (element) => {
    const value = element.target.value
    dispatch(sessionActions.changeServicePath({ id, servicePath: value }))
  }

  const handleSyncClick = () => {
    sync()
  }

  const handleSubscribeClick = () => {
    if (error) {
      return
    }

    if (running) {
      stop()
    } else {
      start()
    }
  }

  return (
    <ServiceLinkerContainer>
      <ServiceLinkerInputContainer>
        <ServiceLinkerInput type="text" placeholder="Farrow Service URL" value={servicePath} onChange={handleChange} />
        <ServiceLinkerStatus>
          {loading && <Loading />}
          {error && error}
        </ServiceLinkerStatus>
      </ServiceLinkerInputContainer>
      <ServiceSyncButtonContainer>
        <ServiceSyncButton className={running ? 'running' : ''} onClick={handleSyncClick}>
          Sync
        </ServiceSyncButton>
      </ServiceSyncButtonContainer>
      <ServiceSubscribeButton onClick={handleSubscribeClick}>
        {running ? 'Unsubscribe' : 'Subscribe'}
      </ServiceSubscribeButton>
    </ServiceLinkerContainer>
  )
}

const ServiceLinkerContainer = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  padding: 10px 0;
  justify-content: space-between;
  width: 100%;
`

const ServiceLinkerStatus = styled.div`
  color: rgb(242, 92, 84);
  position: absolute;
  right: 5px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  height: 36px;
  min-width: 36px;
  padding: 8px;
  box-sizing: border-box;
`

const ServiceLinkerInputContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1 1 0%;
`

type ServiceLinkerInputProps = {}
const ServiceLinkerInput = styled.input<ServiceLinkerInputProps>`
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  color: rgb(80, 80, 80);
  display: flex;
  font-family: OpenSans, Helvetica, Arial, sans-serif;
  overflow-x: hidden;
  overflow-y: hidden;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  position: relative;
  text-align: start;
  text-size-adjust: 100%;
  border: none;
  background: #ececec;
  outline: none;
  border-radius: 3px;
  outline-radius: 3px;
  &:active {
    box-shadow: 0 0 0 1px #d4d4d4;
  }
  &:hover {
    box-shadow: 0 0 0 1px #d4d4d4;
  }
  &:focus {
    box-shadow: 0 0 0 1px #d4d4d4;
    background-color: #fff;
  }
`

const ServiceSyncButtonContainer = styled.div`
  margin-left: 6px;
  width: 100px;
  box-sizing: border-box;
  border-radius: 3px;
  height: 40px;
  background: rgb(9, 123, 237);
  &:hover {
    background-color: rgb(40, 143, 247);
  }
  &:active {
    background-color: rgb(20, 133, 246);
  }
`

const ServiceSyncButton = styled.button`
  border-radius: 3px;
  padding: 0 10px 0 10px;
  background: inherit;
  width: 100%;
  height: 100%;
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
  &.running {
    background: linear-gradient(90deg, white 50%, transparent 50%), linear-gradient(90deg, white 50%, transparent 50%),
      linear-gradient(0deg, white 50%, transparent 50%), linear-gradient(0deg, white 50%, transparent 50%);
    background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
    background-size: 15px 2px, 15px 2px, 2px 15px, 2px 15px;
    background-position: 0px 0px, 98px 38px, 0px 38px, 98px 0px;
    padding: 10px;
    animation: border-dance 2s infinite linear;
  }
  @keyframes border-dance {
    0% {
      background-position: 0px 0px, 100px 38px, 0px 40px, 98px 0px;
    }
    100% {
      background-position: 100px 0px, 0px 38px, 0px 0px, 98px 40px;
    }
  }
`

const ServiceSubscribeButton = styled.button`
  margin-left: 6px;
  width: 100px;
  background-color: rgb(236, 236, 236);
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
  color: var(--dark-color-lightest);
  cursor: default;
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  border: none;
  font-weight: 600;
  color: rgb(128, 128, 128);
  &:hover {
    background-color: rgb(216, 216, 216);
  }
  &:active {
    background-color: rgb(198, 198, 198);
  }
`
