//export an object that has getItem and setItem functions using local storage

export const customStorage = {
    getItem: (key: string) => {
        return localStorage.getItem(key);
    },
    setItem: (key: string, value: string) => {
        localStorage.setItem(key, value);
    },
    removeItem: (key: string) => {
        localStorage.removeItem(key);
    },
    clear: () => {
        localStorage.clear();
    }
}

