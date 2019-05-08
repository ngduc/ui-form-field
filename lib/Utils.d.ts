/// <reference types="react" />
export declare const animals: {
    value: string;
    label: string;
}[];
export declare const genders: {
    value: string;
    label: string;
}[];
export declare const roles: {
    value: string;
    label: string;
}[];
export declare function log(name: string): (val: any) => void;
export declare function cn(...items: string[]): string;
export declare function clone(obj: any): any;
export declare const getChildrenParts: (props: any) => {
    label: any;
    placeholder: any;
    fieldName: any;
};
export declare const DisplayFormState: (props: any) => JSX.Element;
export declare const isOptionArray: (v: any) => boolean;
export declare function deleteProperties(data: any, properties: string[]): void;
export declare function toPascalCase(s: string): string;
export declare function deepFind(obj: any, propPath: string, defaultVal?: any): any;
