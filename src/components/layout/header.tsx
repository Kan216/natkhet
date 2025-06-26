
"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Moon, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { content } from "@/lib/content";

const navLinks = [
  { href: "#zodiac-signs", label: "ခန့်မှန်းချက်များ" },
  { href: "#zodiac-signs", label: "ရာသီခွင်များ" },
  { href: "#zodiac-elements", label: "ဒြပ်စင်များ" },
  { href: "#love-compatibility", label: "လိုက်ဖက်မှု" },
  { href: "#why-believe", label: "ယုံကြည်မှု" },
];

export function Header() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Moon className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline sm:inline-block">
            {content.appName}
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="hidden md:flex md:gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-6">
                <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
                  <Moon className="h-6 w-6 mr-2 text-primary" />
                  <span className="font-bold font-headline">{content.appName}</span>
                </Link>
                <nav className="grid gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="py-2 text-lg font-medium"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
