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
}

const defaultStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
}

const defaultOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
  fontSize: 12,
}

export const JSONDisplayer = ({
  id,
  onSave,
  onError,
  style,
  containerStyle,
  value = '',
  schema,
}: MonacoEditorProps) => {
  const [code] = useState(value)
  const containerRef = useRef<HTMLDivElement>(null)
  const editor = useRef<monaco.editor.IStandaloneCodeEditor>()
  const subscription = useRef<monaco.IDisposable>()

  useLayoutEffect(() => {
    initMonaco()
    return () => {
      destoryMonaco()
    }
  }, [schema])

  useEffect(() => {
    try {
      if (typeof value === 'string') {
        editor.current?.getModel()?.setValue(value === '' ? value : JSON.stringify(JSON.parse(value), null, '\t'))
      }
    } catch (err) {
      console.error(err)
    }
  }, [value])

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
    editor.current = createEditor(id, containerRef.current as HTMLElement, code, defaultOptions, onSave, onError)
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
  const modelUri = monaco.Uri.parse(`a://b/${id}-output.json`)
  const model = monaco.editor.createModel(value, 'json', modelUri)
  const editor = monaco.editor.create(container, {
    ...options,
    value,
    language: 'json',
    model,
    readOnly: true,
    minimap: {
      enabled: false,
    },
  })
  const messageContribution = editor.getContribution('editor.contrib.messageController')
  const diposable = editor.onDidAttemptReadOnlyEdit(() => {
    messageContribution.dispose()
  })

  return editor
}

export default createEditor
