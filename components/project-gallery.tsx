"use client";
import Image from "next/image";
import { useState } from "react";
import type { ProjectMeta } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n";
import { experienceMessages } from "@/config/experience-messages";
import {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogBackdrop,
  DialogPopup,
  DialogTitle,
  DialogClose,
} from "./ui/dialog";
function GalleryImage({
  asset,
  locale,
  large = false,
}: {
  asset: ProjectMeta["gallery"][number];
  locale: Locale;
  large?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <p role="status">{experienceMessages[locale].imageError}</p>
  ) : (
    <Image
      src={asset.src}
      alt={asset.alt}
      width={asset.width}
      height={asset.height}
      sizes={large ? "90vw" : "(max-width:700px) 90vw, 40vw"}
      onError={() => setFailed(true)}
    />
  );
}
export function ProjectGallery({
  images,
  locale,
  contentLocale = locale,
}: {
  images: ProjectMeta["gallery"];
  locale: Locale;
  contentLocale?: Locale;
}) {
  const [index, setIndex] = useState(0);
  const t = experienceMessages[locale];
  if (!images.length) return null;
  const current = images[index];
  function move(step: number) {
    setIndex((value) => (value + step + images.length) % images.length);
  }
  return (
    <section className="project-gallery" aria-labelledby="gallery-title">
      <h2 id="gallery-title">{t.gallery}</h2>
      <DialogRoot>
        <div className="gallery-thumbnails">
          {images.map((asset, i) => (
            <DialogTrigger
              key={asset.src}
              className="gallery-thumbnail"
              onClick={() => setIndex(i)}
              aria-label={`${t.enlarge}: ${asset.alt}`}
            >
              <span lang={contentLocale}>
                <GalleryImage asset={asset} locale={locale} />
                <span className="gallery-caption">
                  {asset.alt} <span aria-hidden="true">↗</span>
                </span>
              </span>
            </DialogTrigger>
          ))}
        </div>
        <DialogPortal>
          <DialogBackdrop className="dialog-backdrop" />
          <DialogPopup
            className="gallery-dialog"
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") {
                e.preventDefault();
                move(1);
              }
              if (e.key === "ArrowLeft") {
                e.preventDefault();
                move(-1);
              }
            }}
          >
            <div className="dialog-heading">
              <DialogTitle>{t.gallery}</DialogTitle>
              <DialogClose className="button small">{t.close}</DialogClose>
            </div>
            <figure lang={contentLocale}>
              <GalleryImage
                key={current.src}
                asset={current}
                locale={locale}
                large
              />
              <figcaption>{current.alt}</figcaption>
            </figure>
            <div className="gallery-controls">
              <button
                className="button small"
                onClick={() => move(-1)}
                disabled={images.length < 2}
              >
                {t.previous}
              </button>
              <p role="status">
                {index + 1} {t.of} {images.length}
              </p>
              <button
                className="button small"
                onClick={() => move(1)}
                disabled={images.length < 2}
              >
                {t.next}
              </button>
            </div>
          </DialogPopup>
        </DialogPortal>
      </DialogRoot>
    </section>
  );
}
