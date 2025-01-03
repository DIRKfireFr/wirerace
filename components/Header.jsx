"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const path = usePathname();

  return (
    <div className="container flex items-center justify-end gap-3">
      <Button asChild="true" variant="outline">
        <Link href={`/${path === "/" ? "rules" : ""}`}>
          {path === "/" ? "Go to rules" : "Go to LeaderBoard"}
        </Link>
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}
