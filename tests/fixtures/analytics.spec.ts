import { test, expect } from "@playwright/test";
for (const locale of ["id", "en"] as const)
  test(`${locale}: analytics is opt-in and can be revoked`, async ({
    page,
  }) => {
    let loads = 0;
    await page.route("**/_vercel/insights/script.js", async (route) => {
      loads++;
      await route.fulfill({
        contentType: "application/javascript",
        body: "/* Analytics test stub: no network telemetry */",
      });
    });
    await page.goto(`/${locale}`);
    const allow = page.getByRole("button", {
      name: locale === "id" ? "Izinkan statistik" : "Allow analytics",
    });
    await expect(allow).toBeVisible();
    expect(loads).toBe(0);
    await expect(page.locator('script[src*="insights"]')).toHaveCount(0);
    await allow.click();
    const disable = page.getByRole("button", {
      name: locale === "id" ? "Nonaktifkan statistik" : "Disable analytics",
    });
    await expect(disable).toBeVisible();
    await expect.poll(() => loads).toBe(1);
    await expect(page.locator('script[src*="insights"]')).toHaveCount(1);
    const redacted = await page.evaluate(() => {
      const queue = (
        window as unknown as {
          vaq: Array<[string, (e: { url: string; type: string }) => unknown]>;
        }
      ).vaq;
      const callback = queue.filter((e) => e[0] === "beforeSend").at(-1)?.[1];
      return callback?.({
        url: "https://example.com/id/notes?q=private#anchor",
        type: "pageview",
      });
    });
    expect(redacted).toEqual({
      url: "https://example.com/id/notes",
      type: "pageview",
    });
    await disable.click();
    await expect(allow).toBeVisible();
    await expect(page.locator('script[src*="insights"]')).toHaveCount(0);
    expect(loads).toBe(1);
  });
