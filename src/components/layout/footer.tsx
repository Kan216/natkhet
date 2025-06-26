"use client";

import { useState, useEffect } from "react";
import { content } from "@/lib/content";
import { Moon } from "lucide-react";

export function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full bg-primary text-primary-foreground">
      <div className="container flex flex-col items-center justify-center gap-4 py-8 md:h-24 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Moon className="hidden h-6 w-6 md:block" />
          <p className="text-center text-sm leading-loose md:text-left">
            © {year} {content.appName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
