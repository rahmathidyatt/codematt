"use client";
import { useRouter, useSearchParams } from "next/navigation";
import type { FormEvent } from "react";
import type { LocalizedProjectMeta } from "@/lib/content/schema";
import { categories } from "@/lib/content/schema";
import {
  readFilters,
  filterProjects,
  filtersToQuery,
} from "@/lib/content/explorer";
import { localizedPath, type Locale } from "@/lib/i18n";
import { categoryLabels, dictionaries } from "@/config/messages";
import { ProjectGrid } from "./project-card";
export function ProjectExplorer({
  projects,
  locale,
}: {
  projects: LocalizedProjectMeta[];
  locale: Locale;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const filters = readFilters(new URLSearchParams(params));
  const results = filterProjects(projects, filters);
  const t = dictionaries[locale];
  const base = localizedPath(locale, "/work");
  const stacks = [...new Set(projects.flatMap((p) => p.stack))].sort();
  const years = [...new Set(projects.map((p) => p.year))].sort((a, b) => b - a);
  const active = Boolean(
    filters.q ||
    filters.category ||
    filters.stack ||
    filters.year ||
    filters.sort !== "newest",
  );
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const raw = new URLSearchParams();
    for (const [key, value] of data)
      if (typeof value === "string") raw.set(key, value);
    const query = filtersToQuery(readFilters(raw));
    router.push(`${base}${query ? `?${query}` : ""}`, { scroll: false });
  }
  return (
    <>
      <form className="explorer-controls" action={base} onSubmit={submit}>
        <div className="search-row">
          <label htmlFor="project-search">{t.search}</label>
          <div>
            <input
              id="project-search"
              name="q"
              type="search"
              key={filters.q}
              defaultValue={filters.q}
              maxLength={200}
              placeholder={t.searchPlaceholder}
            />
            <button className="button primary" type="submit">
              {t.searchButton}
            </button>
          </div>
        </div>
        <div className="filter-row">
          <div className="filter-field">
            <label htmlFor="filter-category">{t.category}</label>
            <select
              id="filter-category"
              name="category"
              value={filters.category}
              onChange={(e) => e.currentTarget.form?.requestSubmit()}
            >
              <option value="">{t.allCategories}</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {categoryLabels[locale][c]}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-field">
            <label htmlFor="filter-stack">{t.technology}</label>
            <select
              id="filter-stack"
              name="stack"
              value={filters.stack}
              onChange={(e) => e.currentTarget.form?.requestSubmit()}
            >
              <option value="">{t.allTechnologies}</option>
              {stacks.map((s) => (
                <option key={s}>{s}</option>
              ))}
              {filters.stack && !stacks.includes(filters.stack) && (
                <option>{filters.stack}</option>
              )}
            </select>
          </div>
          <div className="filter-field">
            <label htmlFor="filter-year">{t.year}</label>
            <select
              id="filter-year"
              name="year"
              value={filters.year}
              onChange={(e) => e.currentTarget.form?.requestSubmit()}
            >
              <option value="">{t.allYears}</option>
              {years.map((y) => (
                <option key={y}>{y}</option>
              ))}
              {filters.year && !years.includes(Number(filters.year)) && (
                <option>{filters.year}</option>
              )}
            </select>
          </div>
          <div className="filter-field">
            <label htmlFor="filter-sort">{t.sort}</label>
            <select
              id="filter-sort"
              name="sort"
              value={filters.sort}
              onChange={(e) => e.currentTarget.form?.requestSubmit()}
            >
              <option value="newest">{t.newest}</option>
              <option value="featured">{t.featured}</option>
              <option value="year">{t.yearSort}</option>
            </select>
          </div>
        </div>
      </form>
      <div className="results-header">
        <p role="status" aria-live="polite">
          {results.length} {t.result}
        </p>
        {active && (
          <button
            className="text-link reset-button"
            onClick={() => router.push(base, { scroll: false })}
          >
            {t.reset}
          </button>
        )}
      </div>
      {results.length ? (
        <ProjectGrid projects={results} locale={locale} />
      ) : (
        <div className="empty-state">
          <h2>{t.emptyTitle}</h2>
          <p>{t.emptyText}</p>
          <button
            className="button"
            onClick={() => router.push(base, { scroll: false })}
          >
            {t.reset}
          </button>
        </div>
      )}
    </>
  );
}
