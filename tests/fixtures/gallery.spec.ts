import { test, expect } from "@playwright/test";
for (const locale of ["id", "en"] as const)
  test(`${locale}: gallery keyboard, controls, errors and focus`, async ({
    page,
  }) => {
    await page.goto(`/${locale}/gallery-test`);
    const trigger = page.getByRole("button", { name: /Test fixture A/ });
    await trigger.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("img")).toHaveAttribute("alt", /fixture A/);
    await page.keyboard.press("ArrowRight");
    await expect(dialog.getByRole("img")).toHaveAttribute("alt", /fixture B/);
    await dialog
      .getByRole("button", {
        name: locale === "id" ? "Berikutnya" : "Next",
        exact: true,
      })
      .click();
    await expect(
      dialog.getByText(
        locale === "id"
          ? "Gambar tidak dapat dimuat."
          : "This image could not be loaded.",
      ),
    ).toBeVisible();
    await page.keyboard.press("ArrowRight");
    await expect(dialog.getByRole("img")).toHaveAttribute("alt", /fixture A/);
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
    await page.setViewportSize({ width: 360, height: 800 });
    await page.getByRole("button", { name: /Test fixture B/ }).click();
    await expect(dialog).toBeVisible();
    expect(
      await dialog.evaluate(
        (e) => e.getBoundingClientRect().right <= innerWidth,
      ),
    ).toBe(true);
    await dialog
      .getByRole("button", {
        name: locale === "id" ? "Tutup" : "Close",
        exact: true,
      })
      .click();
    await expect(dialog).toHaveCount(0);
  });
