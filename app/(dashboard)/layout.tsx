import type { Metadata } from "next";
import ClientLayout from "./ClientLayout";
import { Providers } from "@/lib/providers";
import "../globals.css";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "SemaFacts Super Admin App",
    description: "Internal Management Tool for SemaFacts Whistleblowing Services",
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={`${quicksand.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">
                <Providers>
                    <ClientLayout>{children}</ClientLayout>
                </Providers>
            </body>
        </html>
    );
}