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
};
export declare const JSONDisplayer: ({ id, onSave, onError, style, containerStyle, value, schema }: MonacoEditorProps) => JSX.Element;
declare const createEditor: (id: string, container: HTMLElement, value: string, options?: monaco.editor.IStandaloneEditorConstructionOptions, onSave?: ((content: string) => void) | undefined, onError?: ((message: string) => void) | undefined) => monaco.editor.IStandaloneCodeEditor;
export default createEditor;
