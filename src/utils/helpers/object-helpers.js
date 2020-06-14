export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {
    return items.map(el => {
        if (el[objPropName] === itemId) {
            return {...el, ...newObjProps}
        }
        return el;
    })
};


export const objectToFormData = (obj) => {
    let form_data = new FormData();
    Object.keys(obj).forEach(key => form_data.append(key, obj[key]));
    return form_data;
};
