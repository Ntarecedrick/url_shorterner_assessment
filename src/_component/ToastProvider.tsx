"use client";
import { NotificationsProvider } from "@toolpad/core/useNotifications";

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  return <NotificationsProvider>{children}</NotificationsProvider>;
}
  