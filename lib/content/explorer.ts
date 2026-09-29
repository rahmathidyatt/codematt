import type { ProjectMeta } from "./schema";
import { categories } from "./schema";
export type Filters = {
  q: string;
  category: string;
  stack: string;
  year: string;
  sort: "newest" | "featured" | "year";
};
export function readFilters(params: URLSearchParams): Filters {
  const category = params.get("category") ?? "";
  const sort = params.get("sort");
  const year = params.get("year") ?? "";
  return {
    q: (params.get("q") ?? "").slice(0, 200).trim(),
    category: categories.some((c) => c === category) ? category : "",
    stack: (params.get("stack") ?? "").slice(0, 100),
    year: /^\d{4}$/.test(year) ? year : "",
    sort: sort === "featured" || sort === "year" ? sort : "newest",
  };
}
const normalize = (value: string) =>
  value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
export function filterProjects<T extends ProjectMeta>(
  projects: T[],
  filters: Filters,
): T[] {
  const terms = normalize(filters.q).split(/\s+/).filter(Boolean);
  return projects
    .filter(
      (p) =>
        (!filters.category || p.category === filters.category) &&
        (!filters.stack || p.stack.includes(filters.stack)) &&
        (!filters.year || String(p.year) === filters.year) &&
        terms.every((term) =>
          normalize(
            [p.title, p.summary, ...p.tags, ...p.stack].join(" "),
          ).includes(term),
        ),
    )
    .sort((a, b) => {
      if (filters.sort === "featured")
        return (
          Number(b.featured) - Number(a.featured) ||
          a.order - b.order ||
          b.date.localeCompare(a.date) ||
          a.slug.localeCompare(b.slug)
        );
      if (filters.sort === "year")
        return b.year - a.year || a.title.localeCompare(b.title);
      return (
        b.date.localeCompare(a.date) ||
        a.order - b.order ||
        a.slug.localeCompare(b.slug)
      );
    });
}
export function filtersToQuery(filters: Filters) {
  const params = new URLSearchParams();
  for (const key of ["q", "category", "stack", "year", "sort"] as const)
    if (filters[key] && !(key === "sort" && filters[key] === "newest"))
      params.set(key, filters[key]);
  return params.toString();
}
