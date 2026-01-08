import { ReactNode } from "react";
import AdminLayoutClient from "@/components/admin/AdminLayoutClient";

export default async function AdminLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <AdminLayoutClient locale={locale}>{children}</AdminLayoutClient>;
}
