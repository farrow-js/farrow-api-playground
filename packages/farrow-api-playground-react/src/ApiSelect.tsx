import { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { FormatEntries } from 'farrow-api/dist/toJSON'

import { DownArrow, Unsmile } from './icons'

import { useAppSelector, useAppDispatch } from './hook'
import { sessionActions, API } from './store/sessionsSlice'

export type ApiSelectProps = {
  id: string
  api: API | null
  apis: API[]
  description?: string
  deprecated?: string
}

export const ApiSelect = ({ id, api, apis: options }: ApiSelectProps) => {
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (focused) {
      inputRef.current?.focus()
    }
  }, [focused])

  const handleFocus = () => {
    setFocused(!focused)
  }

  const handleOptionClick = (name: string) => {
    setFocused(false)
    dispatch(sessionActions.setName({ id, name }))
  }

  return (
    <ApiSelectContainer>
      <ApiSelectController focused={focused} onClick={handleFocus}>
        <ApiSelectInputContainer>
          {!api && <Placeholder>Select...</Placeholder>}
          <ApiSelectInput value={api ? api.name : ''} onChange={() => {}} onFocus={handleFocus} />
        </ApiSelectInputContainer>
        <IndicatorsContainer>
          <IndicatorSeparator />
          <IndicatorContainer>
            <DownArrow
              style={{
                display: 'inline-block',
                fill: 'currentColor',
                lineHeight: 1,
                stroke: 'currentColor',
                strokeWidth: 0,
              }}
            />
          </IndicatorContainer>
        </IndicatorsContainer>
      </ApiSelectController>
      {focused && (
        <OptionsContainer>
          {options.length > 0 ? (
            options.map((option) => {
              return <TopOption key={option.title} onClick={handleOptionClick} {...option} />
            })
          ) : (
            <EnptyOptionsContainer></EnptyOptionsContainer>
          )}
        </OptionsContainer>
      )}
    </ApiSelectContainer>
  )
}

const Title = styled.div`
  width: 180px;
  padding: 0 3px 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #0451a5;
  font-weight: 550;
`

const Description = styled.div`
  flex: 1 1 0%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #999;
`

const Deprecated = styled.div`
  width: 24px;
  padding: 5px 0;
`

const OptionContent = styled.div`
  font-size: 14px;
  position: relative;
  display: flex;
  width: 100%;
  height: 32px;
  align-items: center;
  justify-content: space-between;
  cursor: default;
  border-bottom: 1px solid #ccc;
  &:hover {
    background-color: #eee;
  }
`
export type OptionProps = API & {
  onClick: (name: string) => void
}
const Option = ({ title, deprecated, description, children, onClick }: OptionProps) => {
  const handleClick = () => {
    if (children && children.length > 0) return
    onClick(title)
  }
  return (
    <OptionContainer>
      <OptionContent onClick={handleClick}>
        <Title>{title}</Title>
        <Description>{description}</Description>
        {deprecated && (
          <Deprecated>
            <Unsmile fill="rgb(242, 92, 84)" />
          </Deprecated>
        )}
      </OptionContent>
      {children?.map((option) => {
        return <Option key={option.title} onClick={onClick} {...option} />
      })}
    </OptionContainer>
  )
}

const OptionContainer = styled.div`
  width: 100%;
  padding-left: 24px;
  box-sizing: border-box;
`

const TopOption = ({ title, deprecated, description, children, onClick }: OptionProps) => {
  const handleClick = () => {
    if (children && children.length > 0) return
    onClick(title)
  }

  return (
    <TopOptionContainer>
      <OptionContent onClick={handleClick}>
        <Title>{title}</Title>
        <Description>{description}</Description>
        {deprecated && (
          <Deprecated>
            <Unsmile fill="rgb(242, 92, 84)" />
          </Deprecated>
        )}
      </OptionContent>
      {children?.map((option) => {
        return <Option key={option.title} onClick={onClick} {...option} />
      })}
    </TopOptionContainer>
  )
}

const TopOptionContainer = styled.div`
  width: 100%;
`

const EnptyOptionsContainer = styled.div`
  width: 100%;
  height: 36px;
`

const ApiSelectContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  min-height: 38px;
  min-width: 500px;
`

export type ApiSelectControllerProps = {
  focused: boolean
}
const ApiSelectController = styled.div<ApiSelectControllerProps>`
  position: relative;
  box-sizing: border-box;
  min-height: 38px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  background-color: hsl(0, 0%, 100%);
  outline-radius: 3px;
  border-radius: 3px;
  outline: none;
  background: ${({ focused }) => (focused ? '#fff' : '#ececec')};
  box-shadow: ${({ focused }) => (focused ? '0 0 0 1px #d4d4d4' : '')};
  &:hover {
    box-shadow: 0 0 0 1px #d4d4d4;
  }
  &:focus {
    box-shadow: 0 0 0 1px #d4d4d4;
  }
`

const ApiSelectInputContainer = styled.div`
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  -webkit-box-flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  padding: 2px 8px;
  -webkit-overflow-scrolling: touch;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
`

const ApiSelectInput = styled.input`
  color: rgb(80, 80, 80);
  font-weight: 500;
  cursor: default;
  border: none;
  font-size: 14px;
  background: inherit;
  &:focus {
    border: none;
    outline: none;
  }
`

const IndicatorsContainer = styled.div`
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-align-self: stretch;
  -ms-flex-item-align: stretch;
  align-self: stretch;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  box-sizing: border-box;
`

const IndicatorContainer = styled.div`
  color: hsl(0, 0%, 80%);
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding: 8px;
  -webkit-transition: color 150ms;
  transition: color 150ms;
  box-sizing: border-box;
`

const IndicatorSeparator = styled.span`
  -webkit-align-self: stretch;
  -ms-flex-item-align: stretch;
  align-self: stretch;
  background-color: hsl(0, 0%, 80%);
  margin-bottom: 8px;
  margin-top: 8px;
  width: 1px;
  box-sizing: border-box;
`

const Placeholder = styled.div`
  color: hsl(0, 0%, 50%);
  margin-left: 2px;
  margin-right: 2px;
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  box-sizing: border-box;
`

const OptionsContainer = styled.div`
  position: absolute;
  width: 100%;
  z-index: 100;
  border-color: hsl(0, 0%, 80%);
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  box-sizing: border-box;
  padding: 8px;
  max-height: 400px;
  background-color: #fff;
  box-shadow: 0 6px 16px -8px #00000014, 0 9px 28px #0000000d, 0 12px 48px 16px #00000008; ;
`
