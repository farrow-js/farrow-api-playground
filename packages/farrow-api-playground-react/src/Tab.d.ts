/// <reference types="react" />
export declare type TabProps = {
    id: string;
    title: string;
};
export declare const Tab: ({ id, title }: TabProps) => JSX.Element;
export declare type TabItemProps = {
    active: boolean;
};
