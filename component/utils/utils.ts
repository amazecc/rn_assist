// TODO: REFACTOR
export function memoize<T>(fn: (...parameters: any[]) => T, cacheKey: string) {
    const cache: { [key: string]: T } = {};
    return (...parameters: any[]) => {
        if (!cache[cacheKey]) {
            cache[cacheKey] = fn(...parameters);
        }
        return cache[cacheKey];
    };
}
