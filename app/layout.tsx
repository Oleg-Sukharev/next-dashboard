import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import "./globals.css";
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import {
  Container,
  Theme,
  // ThemePanel
} from '@radix-ui/themes';
import NavBar from './NavBar';
import AuthProvider from "./auth/Provider";

const font = Roboto({
  weight: ['400'],
  // style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${font.variable} font-sans`}>
        <AuthProvider>
          <Theme appearance="light" accentColor="violet">
            <NavBar />
            <main className="p-5">
              <Container>
                {children}
              </Container>
            </main>

            {/* <ThemePanel /> */}
          </Theme>
        </AuthProvider>
      </body>
    </html>
  );
}