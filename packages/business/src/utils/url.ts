export function join(base: string, part: string) {
    if (!(base.endsWith("/") || part.startsWith("/"))) base = base + "/";
    if (base.endsWith("/") && part.startsWith("/")) part = part.slice(1);
    return base + part
}