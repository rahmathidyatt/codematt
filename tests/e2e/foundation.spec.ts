import { test, expect } from "@playwright/test";
test("Indonesian default, language switch retains route and preference", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page).toHaveURL(/\/id$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "id");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Membuat hal",
  );
  await page.goto("/id/work/code-reader");
  await expect(
    page.getByRole("heading", { name: "Gambaran proyek", exact: true }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Switch to English" }).click();
  await expect(page).toHaveURL(/\/en\/work\/code-reader$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(
    page.getByRole("heading", { name: "Overview", exact: true }),
  ).toBeVisible();
  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);
  await page.getByRole("link", { name: "Ganti ke Bahasa Indonesia" }).click();
  await page.goto("/");
  await expect(page).toHaveURL(/\/id$/);
  expect(errors).toEqual([]);
});
test("legacy links preserve project path and query", async ({ page }) => {
  await page.goto("/work?category=automation");
  await expect(page).toHaveURL(/\/id\/work\?category=automation$/);
  await expect(page.locator("[data-project]")).not.toHaveCount(0);
  await page.goto("/work/code-reader");
  await expect(page).toHaveURL(/\/id\/work\/code-reader$/);
});
test("search, category, stack, year, sorting, empty/reset and URL history", async ({
  page,
}) => {
  await page.goto("/id/work");
  await expect(page.locator("[data-project=code-reader]")).toBeVisible();
  await page.getByLabel("Cari proyek", { exact: true }).fill("Code Reader");
  await page.getByRole("button", { name: "Cari", exact: true }).click();
  await expect(page).toHaveURL(/q=Code\+Reader/);
  await expect(page.locator("[data-project]")).not.toHaveCount(0);
  await page.getByRole("button", { name: "Hapus filter", exact: true }).click();
  await expect(page).toHaveURL(/\/id\/work$/);
  await page.getByRole("combobox", { name: "Kategori", exact: true }).focus();
  await page
    .getByRole("combobox", { name: "Kategori", exact: true })
    .selectOption("machine-learning");
  await expect(page).toHaveURL(/category=machine-learning/);
  await expect(
    page.getByRole("combobox", { name: "Kategori", exact: true }),
  ).toBeFocused();
  await expect(
    page.locator('[data-project]:not([data-category="machine-learning"])'),
  ).toHaveCount(0);
  await expect(page.locator("[data-project]")).not.toHaveCount(0);
  await page
    .getByRole("combobox", { name: "Teknologi", exact: true })
    .selectOption("Python");
  await expect(page).toHaveURL(/stack=Python/);
  await page
    .getByRole("combobox", { name: "Tahun", exact: true })
    .selectOption("2026");
  await expect(page).toHaveURL(/year=2026/);
  await page
    .getByRole("combobox", { name: "Urutkan", exact: true })
    .selectOption("featured");
  await expect(page).toHaveURL(/sort=featured/);
  await page.getByRole("link", { name: "Switch to English" }).click();
  await expect(page).toHaveURL(
    /\/en\/work\?category=machine-learning&stack=Python&year=2026&sort=featured$/,
  );
  await expect(
    page.getByRole("combobox", { name: "Category", exact: true }),
  ).toHaveValue("machine-learning");
  await page.reload();
  await expect(page.locator("[data-project]")).not.toHaveCount(0);
  await page
    .getByRole("button", { name: "Clear filters", exact: true })
    .click();
  await expect(page).toHaveURL(/\/en\/work$/);
  await page.goBack();
  await expect(
    page.getByRole("combobox", { name: "Category", exact: true }),
  ).toHaveValue("machine-learning");
  await page.getByLabel("Search projects", { exact: true }).fill("zzznomatch");
  await page.getByRole("button", { name: "Search", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "No projects match yet." }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Clear filters", exact: true })
    .last()
    .click();
  await expect(page.locator("[data-project=code-reader]")).toBeVisible();
});
for (const locale of ["id", "en"] as const) {
  test(`${locale}: theme, mobile menu and localized 404`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto(`/${locale}`);
    const theme = page.getByLabel(
      locale === "id" ? "Tema tampilan" : "Color theme",
    );
    await theme.selectOption("dark");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await theme.selectOption("system");
    await page.emulateMedia({ colorScheme: "light" });
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await page.emulateMedia({ colorScheme: "dark" });
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    const menu = page.getByRole("button", { name: /Menu/ });
    await menu.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(menu).toBeFocused();
    await menu.click();
    await page
      .getByRole("navigation", {
        name: locale === "id" ? "Navigasi seluler" : "Mobile navigation",
      })
      .getByRole("link", {
        name: locale === "id" ? "Tentang" : "About",
        exact: true,
      })
      .click();
    await expect(page).toHaveURL(new RegExp(`/${locale}/about$`));
    await expect(page.getByRole("dialog")).toHaveCount(0);
    for (const missing of ["/work/missing", "/nothing/here"]) {
      const response = await page.goto(`/${locale}${missing}`);
      expect(response?.status()).toBe(404);
      await expect(page.getByRole("heading", { level: 1 })).toContainText(
        locale === "id" ? "Halaman ini" : "beaten path",
      );
    }
  });
  test(`${locale}: translated metadata and headings`, async ({ page }) => {
    await page.goto(`/${locale}/work`);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page).toHaveTitle(
      locale === "id" ? "Proyek · codematt" : "Work · codematt",
    );
    await expect(
      page.locator('link[rel="alternate"][hreflang="id"]'),
    ).toHaveAttribute("href", /\/id\/work$/);
    await expect(
      page.locator('link[rel="alternate"][hreflang="en"]'),
    ).toHaveAttribute("href", /\/en\/work$/);
  });
}
for (const width of [360, 390, 768, 1024, 1440, 1920])
  test(`both languages responsive at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    for (const locale of ["id", "en"]) {
      for (const route of [
        "",
        "/work",
        "/work/code-reader",
        "/lab",
        "/about",
        "/notes",
        "/contact",
      ]) {
        await page.goto(`/${locale}${route}`);
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= window.innerWidth,
          ),
        ).toBe(true);
        if ([360, 1440].includes(width) && ["", "/work"].includes(route)) {
          await page
            .getByLabel(locale === "id" ? "Tema tampilan" : "Color theme")
            .selectOption(width === 1440 ? "dark" : "light");
          await page.screenshot({
            path: `docs/previews/phase2-${locale}-${route ? "work" : "home"}-${width}.png`,
            fullPage: true,
          });
        }
      }
    }
  });
