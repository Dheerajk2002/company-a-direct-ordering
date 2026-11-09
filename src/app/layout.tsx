import "./globals.css";
import React from "react";

export const metadata = {
  title: "Company A | Direct Ordering & Kitchen Display System",
  description: "Hyderabadi Direct Ordering Web App & 2m Kitchen Display",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
