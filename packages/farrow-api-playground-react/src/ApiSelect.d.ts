/// <reference types="react" />
import { API } from './store/sessionsSlice'
export declare type ApiSelectProps = {
  id: string
  api: API | null
  apis: API[]
  description?: string
  deprecated?: string
}
export declare const ApiSelect: ({ id, api, apis: options }: ApiSelectProps) => JSX.Element
export declare type OptionProps = API & {
  onClick: (name: string) => void
}
export declare type ApiSelectControllerProps = {
  focused: boolean
}
