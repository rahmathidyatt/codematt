import { test, expect } from "@playwright/test";
for (const locale of ["id", "en"] as const) {
  const search = locale === "id" ? "Pencarian cepat" : "Quick search";
  test(`${locale}: command dialog keyboard, ranking, empty and focus`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(`/${locale}`);
    const trigger = page.getByRole("button", { name: search, exact: true });
    await trigger.click();
    const input = page.getByRole("combobox", { name: search });
    await expect(input).toBeFocused();
    await input.fill("zzznomatch");
    await expect(page.getByRole("option")).toHaveCount(0);
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog")).toBeVisible();
    await input.fill("python");
    await expect(page.getByRole("option")).not.toHaveCount(0);
    await page.keyboard.press("ArrowDown");
    await expect(input).toHaveAttribute("aria-activedescendant", /-1$/);
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
    await page.keyboard.press("Control+k");
    await expect(input).toHaveValue("");
    await input.fill("Code Reader");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(new RegExp(`/${locale}/work/code-reader$`));
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await page.keyboard.press("Meta+k");
    await expect(input).toBeFocused();
    await page.keyboard.press("Escape");
    expect(errors).toEqual([]);
  });
  test(`${locale}: mobile touch search and Lab selection with reduced motion`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`/${locale}/lab`);
    const choices = page
      .getByRole("group", {
        name: locale === "id" ? "Meja eksperimen" : "Experiment desk",
      })
      .getByRole("button");
    await choices.nth(1).focus();
    await page.keyboard.press("Enter");
    await expect(choices.nth(1)).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("#desk-preview h3")).toHaveText(
      "Brighton HUB Dashboard",
    );
    await expect(choices.nth(1)).toBeFocused();
    expect(
      await page
        .locator("#desk-preview")
        .evaluate((e) => getComputedStyle(e).transform),
    ).toBe("none");
    await page.getByRole("button", { name: search, exact: true }).click();
    await page.getByRole("combobox", { name: search }).fill("notes");
    await page.getByRole("option").click();
    await expect(page).toHaveURL(new RegExp(`/${locale}/notes$`));
  });
  for (const width of [360, 1440])
    test(`${locale}: experience preview ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(`/${locale}/lab`);
      await page
        .getByLabel(locale === "id" ? "Tema tampilan" : "Color theme")
        .selectOption(width === 1440 ? "dark" : "light");
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await page.screenshot({
        path: `docs/previews/phase3-${locale}-lab-${width}.png`,
        fullPage: true,
      });
      await page.getByRole("button", { name: search, exact: true }).click();
      await page.getByRole("combobox", { name: search }).fill("python");
      await page.screenshot({
        path: `docs/previews/phase3-${locale}-search-${width}.png`,
      });
    });
}
