/// <reference types="react" />
import { Session } from './store/sessionsSlice'
export declare const Playground: () => JSX.Element
export declare type SinglePlaygroundProps = {
  session: Session
  isCurrent: boolean
}
export declare type SinglePlaygroundContainerProps = {
  isCurrent: boolean
}
