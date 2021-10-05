import styled from 'styled-components'

import { useAppSelector, useAppDispatch } from './hook'
import { sessionActions } from './store/sessionsSlice'

export type TabProps = {
  id: string
  title: string
}

export const Tab = ({ id, title }: TabProps) => {
  const activeId = useAppSelector((state) => state.sessions.activeSessionId)

  const dispatch = useAppDispatch()

  const active = id === activeId

  const handleClick = () => {
    dispatch(sessionActions.changeSelected(id))
  }

  return (
    <TabItem active={active} onClick={handleClick}>
      {title}
    </TabItem>
  )
}

export type TabItemProps = {
  active: boolean
}

const TabItem = styled.div<TabItemProps>`
  -webkit-app-region: no-drag;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  height: 43px;
  padding: 10px;
  padding-top: 9px;
  margin-right: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #0451a5;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  background: ${({ active }) => (active ? '#fff' : '#fafafa')};
  border-bottom: 1px solid ${({ active }) => (active ? '#fff' : '#ccc')};
  cursor: pointer;
  user-select: none;
  &:hover {
    .close {
      opacity: 1;
    }
  }
`
