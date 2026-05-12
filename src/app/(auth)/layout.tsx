export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Each auth page is responsible for its own full-screen layout and centering.
  // login  → split-screen (full viewport)
  // signup / forgot-password / reset-password → centered card (handled inside each page)
  return <>{children}</>;
}
