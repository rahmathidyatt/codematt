import { test, expect } from "@playwright/test";
for (const locale of ["id", "en"] as const) {
  test(`${locale}: Notes search, topic, reader and navigation`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(`/${locale}/notes`);
    await expect(page.locator("[data-note]")).toHaveCount(2);
    await page
      .getByRole("searchbox", {
        name: locale === "id" ? "Cari catatan" : "Search notes",
      })
      .fill("zzznomatch");
    await expect(page.locator("[data-note]")).toHaveCount(0);
    await page
      .getByRole("button", {
        name: locale === "id" ? "Hapus filter" : "Clear filters",
      })
      .click();
    await page
      .getByRole("combobox", { name: locale === "id" ? "Topik" : "Topic" })
      .selectOption("Website");
    await expect(page.locator("[data-note]")).toHaveCount(1);
    await page.locator("[data-note] h2 a").click();
    await expect(page).toHaveURL(
      new RegExp(`/${locale}/notes/mengelola-konten-dua-bahasa$`),
    );
    const toc = page.getByRole("navigation", {
      name: locale === "id" ? "Dalam catatan ini" : "On this page",
    });
    await expect(toc).toBeVisible();
    await toc.getByRole("link").last().click();
    await expect(page).toHaveURL(/#note-/);
    await expect
      .poll(async () =>
        Number(
          await page.getByRole("progressbar").getAttribute("aria-valuenow"),
        ),
      )
      .toBeGreaterThan(0);
    const headings = await page
      .locator("#note-content h2,#note-content h3")
      .evaluateAll((els) => els.map((e) => e.id));
    expect(new Set(headings).size).toBe(headings.length);
    expect(headings.every(Boolean)).toBe(true);
    await page
      .getByRole("navigation", {
        name: locale === "id" ? "Navigasi catatan" : "Note navigation",
      })
      .getByRole("link")
      .click();
    await expect(page).toHaveURL(
      new RegExp(`/${locale}/notes/menyiapkan-case-study$`),
    );
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
      "content",
      "article",
    );
    const json = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    expect(
      json.map((j) => JSON.parse(j)).some((j) => j["@type"] === "BlogPosting"),
    ).toBe(true);
    expect(errors).toEqual([]);
  });
  test(`${locale}: command finds articles and preserves translation route`, async ({
    page,
  }) => {
    await page.goto(`/${locale}`);
    await page
      .getByRole("button", {
        name: locale === "id" ? "Pencarian cepat" : "Quick search",
        exact: true,
      })
      .click();
    await page
      .getByRole("combobox", {
        name: locale === "id" ? "Pencarian cepat" : "Quick search",
      })
      .fill(locale === "id" ? "Mengelola konten" : "Managing Indonesian");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(
      new RegExp(`/${locale}/notes/mengelola-konten-dua-bahasa$`),
    );
    await page
      .getByRole("link", {
        name:
          locale === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia",
      })
      .click();
    await expect(page).toHaveURL(
      new RegExp(
        `/${locale === "id" ? "en" : "id"}/notes/mengelola-konten-dua-bahasa$`,
      ),
    );
  });
  for (const width of [360, 1440])
    test(`${locale}: Notes layout at ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const path of ["notes", "notes/menyiapkan-case-study"]) {
        await page.goto(`/${locale}/${path}`);
        await page
          .getByLabel(locale === "id" ? "Tema tampilan" : "Color theme")
          .selectOption(width === 360 ? "light" : "dark");
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
        await page.screenshot({
          path: `docs/previews/phase4-${locale}-${path.includes("/") ? "article" : "notes"}-${width}.png`,
          fullPage: true,
        });
      }
    });
}
test("sitemap, robots, OG and missing notes", async ({ request, page }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain("/en/notes/menyiapkan-case-study");
  expect(await sitemap.text()).toContain("/id/work/code-reader");
  expect(await sitemap.text()).not.toContain("gallery-test");
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("Disallow: /");
  for (const url of [
    "/og?locale=id",
    "/og?locale=en&kind=notes&slug=menyiapkan-case-study",
    "/og?locale=id&kind=work&slug=code-reader",
  ]) {
    const res = await request.get(url);
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("image/png");
    expect((await res.body()).length).toBeGreaterThan(1000);
  }
  expect(
    (
      await request.get("/og?locale=en&kind=notes&slug=does-not-exist")
    ).status(),
  ).toBe(404);
  expect((await page.goto("/id/notes/does-not-exist"))?.status()).toBe(404);
  await page.goto("/id");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
  await expect(page.locator('script[src*="insights"]')).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Izinkan statistik" }),
  ).toHaveCount(0);
});
