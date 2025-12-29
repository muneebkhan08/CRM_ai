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
        <html lang="en" className="light" suppressHydrationWarning>
            <body className="antialiased bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
                <ThemeProvider>
                    <div className="flex min-h-screen">
                        <Sidebar />
                        <main className="flex-1 w-full lg:ml-64 min-w-0">
                            <div className="p-4 pt-16 sm:p-6 sm:pt-16 lg:p-8 lg:pt-8">
                                {children}
                            </div>
                        </main>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
