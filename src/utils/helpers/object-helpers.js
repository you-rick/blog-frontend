import _ from 'lodash';

export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => items.map((el) => {
  if (el[objPropName] === itemId) {
    return { ...el, ...newObjProps };
  }
  return el;
});

export const objectToFormData = (obj) => {
  const formDataObj = new FormData();
  Object.keys(obj).forEach((key) => formDataObj.append(key, obj[key]));
  return formDataObj;
};

export const toggleArrayEl = (array, item) => _.xor(array, [item]);
