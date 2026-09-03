"use client";

const HREF =
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";

/** Material Symbols loaded non-blocking — decorative icons only. */
export default function MaterialSymbols() {
  return (
    <>
      <link
        href={HREF}
        rel="stylesheet"
        media="print"
        onLoad={(e) => {
          const l = e.target as HTMLLinkElement;
          l.media = "all";
        }}
      />
      <noscript>
        <link href={HREF} rel="stylesheet" />
      </noscript>
    </>
  );
}
