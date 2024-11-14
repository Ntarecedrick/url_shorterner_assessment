import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import AppProvider from "@/_component/AppProvider";
import ToastProvider from "@/_component/ToastProvider";
import { AppProvider as AppProviderContext } from "@/context/AppContext";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: "en" | "ger" };
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  const isValidLocale = routing.locales.includes(locale);
  if (!isValidLocale) {
    return notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body style={{ overflowX: "hidden", overflowY: "auto", width: "100vw",  }}>
        <NextIntlClientProvider messages={messages}>
          <AppProviderContext>
            <AppProvider>
              <ToastProvider>{children}</ToastProvider>
            </AppProvider>
          </AppProviderContext>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
