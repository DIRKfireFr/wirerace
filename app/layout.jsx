import { ThemeProvider } from "@/Providers/ThemeProvider";
import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "WireRace - LeaderBoad",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="container mx-auto mt-3">
            <Header />
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
