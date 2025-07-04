"use client";

import Link from "next/link";
import Image from "next/image";
import { SignIn, SignedOut, SignInButton, SignUpButton, SignedIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { UserControl } from "@/components/user-control";
import { Bot, Laptop2, Moon, MoonIcon, Sun, SunIcon, SunMediumIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuPortal } from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

export const Navbar = () => {
  const { setTheme, theme } = useTheme();
  return (
    <nav
      className="p-4 bg-transparent fixed top-0 left-0 right-0 z-50 transition-all duration-200
border-b border-transparent"
    >

<div className="max-w-5xl mx-auto w-full flex justify-between items-center">
 
<div className= " flex gap-3 ">
       
<Link href="/" className="flex items-center gap-2">
    {/* <Image src="/logo.svg" alt="Vibe" width={24} height={24} /> */}
    <Bot   width={24}  height={24} className="hidden md:block text-primary"/>

    <span className="font-semibold text-lg">Codey</span>
  </Link>

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only"> Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => setTheme("light")} className="flex font-bold  text-muted-foreground">
        <SunIcon className="mr-2" />
        <span>Light</span>
        </DropdownMenuItem  >
        <DropdownMenuItem onClick={() => setTheme("dark")} className="flex font-bold  text-muted-foreground">
        <MoonIcon className="mr-2" />
        <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="flex font-bold  text-muted-foreground">
        <Laptop2 className="mr-2" />
        <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

       </div>

  


  <SignedOut>
  <div className="flex gap-2">

    <SignUpButton>
      <Button variant="outline" size="sm">
        Sign up
      </Button>
    </SignUpButton>
    <SignInButton>
      <Button size="sm">
        Sign in
      </Button>
    </SignInButton>

  </div>
</SignedOut>
<SignedIn>
  <UserControl showName/>
</SignedIn>
</div>
    </nav>
  );
};

