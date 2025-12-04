import { Link, useLocation } from "wouter";
import { ShieldCheck, Menu, X, LayoutDashboard, User, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import logoSymbol from "@assets/generated_images/verifyme_logo_symbol.png";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home", icon: null },
    { href: "/verify", label: "Verify Certificate", icon: Search },
    { href: "/dashboard", label: "Issuer Dashboard", icon: LayoutDashboard },
    { href: "/profile", label: "Student Profile", icon: User },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <img src={logoSymbol} alt="VerifyMe Logo" className="h-8 w-8" />
          <span className="font-heading text-xl font-bold tracking-tight text-primary">
            VerifyMe<span className="text-foreground">.world</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={`cursor-pointer text-sm font-medium transition-colors hover:text-primary ${
                  location === link.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </span>
            </Link>
          ))}
          <Link href="/dashboard">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t bg-background p-4 space-y-4 animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <div 
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                {link.icon && <link.icon size={18} />}
                <span className="font-medium">{link.label}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
