import { CSSProperties } from 'react'
export declare type IProps = {
  title?: string
  color?: string
  width?: number | string
  height?: number | string
  stroke?: string
  style?: CSSProperties
  fill?: string
  strokeWidth?: number
  className?: string
  children?: any
  viewBox?: string
  version?: string
  xmlns?: string
  y?: string
  x?: string
  t?: string
  onClick?: () => void
}
export declare const Svg: ({ title, children, ...props }: IProps) => JSX.Element
export declare const CirclePlug: (props: IProps) => JSX.Element
export declare const DownArrow: (props: IProps) => JSX.Element
export declare const Loading: (props: IProps) => JSX.Element
export declare const Unsmile: (props: IProps) => JSX.Element