import React from 'react';
import * as monaco from 'monaco-editor';
export declare type MonacoEditorProps = {
    id: string;
    onSave?: (content: string) => void;
    onError?: (message: string) => void;
    containerStyle?: React.CSSProperties;
    style?: React.CSSProperties;
    value?: string;
    schema?: any;
    current?: string;
};
export declare const JSONEditor: ({ id, onSave, onError, style, current, containerStyle, value, schema }: MonacoEditorProps) => JSX.Element;
declare const createEditor: (id: string, container: HTMLElement, value: string, options?: monaco.editor.IStandaloneEditorConstructionOptions, _model?: monaco.editor.ITextModel | undefined, onSave?: ((content: string) => void) | undefined, onError?: ((message: string) => void) | undefined) => readonly [monaco.editor.IStandaloneCodeEditor, monaco.editor.ITextModel];
export default createEditor;
