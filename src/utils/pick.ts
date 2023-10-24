const pick = (object: object, keys: string[]) => {
    return keys.reduce((obj: any, key: string) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            obj[key] = object[key as keyof object];
        }
        return obj as object;
    }, {});
};

export default pick;