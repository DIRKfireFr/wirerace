import { ThemeProvider } from "@/Providers/ThemeProvider";
import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "WireRace - LeaderBoad",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
          <main className="container mx-auto mt-3 p-6 md:p-0">
            <Header />
            <div>{children}</div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
