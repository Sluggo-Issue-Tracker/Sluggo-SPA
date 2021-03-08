import { stringifyQuery } from "vue-router";

export const deepCopyObject = (object: Record<string, any>): Record<string, any> => {
    const copied: Record<string, any> = {};
    Object.entries(object).map(item => {
        const [key, value] = item;

        if (value instanceof Array) {
            copied[key] = value.map(item => item);
        } else if (value instanceof Object) {
            copied[key] = deepCopyObject(value);
        } else {
            copied[key] = value;
        }
    });
    return copied;
}