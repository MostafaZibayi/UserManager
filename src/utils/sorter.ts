export function uniqSorted(arr: string[]) {
    return Array.from(new Set(arr)).sort((a, b) => a.localeCompare(b));
}