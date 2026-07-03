import type { Metadata } from "next";
import "./globals.css";
import { DemoProvider } from "@/lib/demo-context";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { DemoBanner } from "@/components/DemoBanner";

export const metadata: Metadata = {
  title: "NorthStar Partner Portal",
  description: "Microsoft AI Cloud Partner — MSSP · Indirect CSP · ISV",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0d0f14] text-white antialiased font-sans">
        <DemoProvider>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <Header />
              <DemoBanner />
              <main className="flex-1 overflow-y-auto p-6">
                {children}
              </main>
            </div>
          </div>
        </DemoProvider>
      </body>
    </html>
  );
}
