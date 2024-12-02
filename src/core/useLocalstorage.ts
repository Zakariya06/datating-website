export function useLocalstorage(key: string) {
    const value = localStorage.getItem(key);
    const setValue = (value: string) => localStorage.setItem(key, value);

    return {
        value,
        setValue,
    };
}
