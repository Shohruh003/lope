// The real layout (with fonts, `<html>`, `<body>`, providers) lives
// at `app/[locale]/layout.tsx` so next-intl can set the `lang`
// attribute per locale. This root file just passes children through.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
