import { verifyAdminSession } from "@/lib/admin-auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthed = await verifyAdminSession();

  // Login page (/admin) doesn't need auth check
  // Middleware handles /admin/dashboard/* protection
  // This layout just provides the wrapper
  return <>{children}</>;
}
