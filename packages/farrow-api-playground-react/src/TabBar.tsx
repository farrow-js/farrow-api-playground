import { useState } from 'react'
import { SortableContainer, SortableElement, SortStart, SortEnd } from 'react-sortable-hoc'
import styled from 'styled-components'

import { CirclePlug } from './icons'

import { useAppSelector, useAppDispatch } from './hook'
import { sessionActions } from './store/sessionsSlice'

import { Tab } from './Tab'

const SortableTab = SortableElement(Tab)

const TabBarContainer = styled.header`
  height: 57px;
  overflow: hidden;
  background: #fafafa;
  -webkit-app-region: drag;
  &:hover {
    overflow-x: overlay;
  }
`

const SortableTabBar = SortableContainer(TabBarContainer)

export const TabBar = () => {
  const [sorting, setSorting] = useState(false)

  const sessions = useAppSelector((state) => state.sessions.sessions)

  const dispatch = useAppDispatch()

  const onSortStart = ({}: SortStart) => {
    setSorting(true)
  }

  const onSortEnd = ({}: SortEnd) => {
    setSorting(false)
  }

  const handlePlusClick = () => {
    console.log('test')
    dispatch(sessionActions.add())
  }

  return (
    <SortableTabBar
      axis="x"
      lockAxis="x"
      lockToContainerEdges={true}
      distance={10}
      transitionDuration={200}
      onSortStart={onSortStart}
      onSortEnd={onSortEnd}
    >
      <Tabs>
        {sessions.map((session, index) => {
          return <SortableTab index={index} key={session.id} id={session.id} title={session.title} />
        })}
        <Plus sorting={sorting} onClick={handlePlusClick}>
          <CirclePlug width="25px" height="25px" />
        </Plus>
      </Tabs>
    </SortableTabBar>
  )
}

export type PlusProps = {
  sorting: boolean
}

type TabsProps = {
  isApp?: boolean
}

const Tabs = styled.div<TabsProps>`
  display: flex;
  align-items: center;
  margin-top: 16px;
  background: #fafafa;
  padding-left: ${(p) => (p.isApp ? '43px' : '10px')};
  padding-right: 10px;
`

const Plus = styled.div<PlusProps>`
  -webkit-app-region: no-drag;
  box-sizing: border-box;
  padding: 8px;
  display: flex;
  visibility: ${(p) => (p.sorting ? 'hidden' : 'visible')};
  height: 43px;
  width: 43px;
  border-radius: 4px 4px 0 0;
  border: 1px solid #ccc;
  justify-content: center;
  align-items: center;
  color: #ccc;
  cursor: pointer;
  &:hover {
    & > .icon > path {
      fill: #097bed;
    }
  }
  & > .icon > path {
    fill: #666;
  }
`
