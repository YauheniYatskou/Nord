export const patch = (item, fieldValues, fields) => {
    fields.forEach(field => {
        if (item[field] !== fieldValues[field] && fieldValues[field] !== undefined) {
            item[field] = fieldValues[field];
        }
    });

    return item;
};