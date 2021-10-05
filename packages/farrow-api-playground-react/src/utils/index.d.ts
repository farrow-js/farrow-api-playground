import { FormatResult } from 'farrow-api/dist/toJSON';
import { Result } from './result';
export declare type IntrospectionResult = Result<FormatResult>;
export declare const getIntrospection: (src: string) => Promise<IntrospectionResult>;
