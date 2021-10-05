import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import * as monaco from 'monaco-editor'

export type MonacoEditorProps = {
  id: string
  onSave?: (content: string) => void
  onError?: (message: string) => void
  containerStyle?: React.CSSProperties
  style?: React.CSSProperties
  value?: string
  schema?: any
  current?: string
}

const defaultStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
}

const defaultOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
  fontSize: 12,
}

export const JSONEditor = ({
  id,
  onSave,
  onError,
  style,
  current,
  containerStyle,
  value = '',
  schema,
}: MonacoEditorProps) => {
  const [code] = useState(value)
  const containerRef = useRef<HTMLDivElement>(null)
  const editor = useRef<monaco.editor.IStandaloneCodeEditor>()
  const model = useRef<monaco.editor.ITextModel>()
  const subscription = useRef<monaco.IDisposable>()

  useLayoutEffect(() => {
    initMonaco()
    return () => {
      destoryMonaco()
    }
  }, [schema, current])

  const initMonaco = () => {
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [
        {
          uri: `http://farrow/${id}-input.json`,
          schema,
        },
      ],
    })
    const result = createEditor(
      id,
      containerRef.current as HTMLElement,
      code,
      defaultOptions,
      model.current,
      onSave,
      onError,
    )
    editor.current = result[0]
    model.current = result[1]
  }

  const destoryMonaco = () => {
    if (editor.current) {
      editor.current.dispose()
      const model = editor.current.getModel()
      if (model) {
        model.dispose()
      }
    }

    if (subscription.current) {
      subscription.current.dispose()
    }
  }

  style = {
    ...defaultStyle,
    ...style,
  }

  return (
    <div style={containerStyle}>
      <div ref={containerRef} style={style} />
    </div>
  )
}

const createEditor = (
  id: string,
  container: HTMLElement,
  value: string,
  options: monaco.editor.IStandaloneEditorConstructionOptions = {},
  _model?: monaco.editor.ITextModel,
  onSave?: (content: string) => void,
  onError?: (message: string) => void,
) => {
  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: true,
    allowComments: true,
    schemaValidation: 'warning',
    schemaRequest: 'warning',
    trailingCommas: 'warning',
  })
  const modelUri = monaco.Uri.parse(`a://b/${id}-input.json`)
  const model = _model || monaco.editor.createModel(value, 'json', modelUri)
  const editor = monaco.editor.create(container, {
    ...options,
    value,
    language: 'json',
    model,
    minimap: {
      enabled: false,
    },
  })
  model.onDidChangeContent(() => {
    onSave && onSave(model.getValue())
  })

  return [editor, model] as const
}

export default createEditor
