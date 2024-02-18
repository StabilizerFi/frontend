import type { Metadata } from "next";
import { Navbar } from "@/Components/Navbar/page";

export const metadata: Metadata = {
    title: "",
    description: "",
  };  

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
