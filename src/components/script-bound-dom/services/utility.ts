export function GetLayoutFlow(source: { direction?: string; wrap?: boolean }): { direction: string, wrap: boolean } {
    const flows = new Set(["left-right", "right-left", "top-bottom", "bottom-top"]);
    const wraps = new Set([true, false]);
    return {
        direction: PickOne(flows, source?.direction?.toLowerCase(), 'top-bottom'),
        wrap: PickOne(wraps, source?.wrap, false),
    }
}

export function PickOne<T>(options: Set<T>, option?: T, fallback?: T): T {
    if (options.has(option as T))
        return option as T;
    if (typeof fallback != 'undefined')
        return fallback;
    return options.values().next().value as T;
}