import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
    title: 'GrowthCRM - AI-Powered Customer Relationship Management',
    description: 'A comprehensive CRM with AI-powered growth planning and analytics',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="antialiased bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
                <ThemeProvider>
                    <div className="flex min-h-screen">
                        <Sidebar />
                        <main className="relative flex-1 lg:ml-64">
                            <div className="p-6 lg:p-8">{children}</div>
                        </main>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
