import { StorageValue, StorageObject } from '@/utils/storage/types';

// 获取存储的值
export const getStorage = (key: string): StorageValue => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error(`Error getting item ${key} from localStorage`, error);
    return null;
  }
};

// 设置存储的值
export const setStorage = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(`Error setting item ${key} in localStorage`, error);
  }
};

// 删除存储的值
export const removeStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item ${key} from localStorage`, error);
  }
};

// 存储对象
export const setObjectStorage = (key: string, value: object): void => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error setting object ${key} in localStorage`, error);
  }
};

// 获取对象
export const getObjectStorage = (key: string): StorageObject => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error getting object ${key} from localStorage`, error);
    return null;
  }
};
