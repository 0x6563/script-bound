export function GetLayoutFlow(source: { flow?: string; wrap?: boolean }) {
    const flows = new Set(["left-right", "right-left", "top-bottom", "bottom-top"]);
    const wraps = new Set([true, false]);
    return {
        flow: PickOne(flows, source?.flow?.toLowerCase(), 'top-bottom'),
        wrap: PickOne(wraps, source?.wrap, false),
    }
}

export function PickOne<T>(options: Set<T>, option?: T, fallback?: T) {
    if (options.has(option as T))
        return option;
    if (typeof fallback != 'undefined')
        return fallback;
    return options.values().next().value;
}