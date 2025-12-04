import { Link, useLocation } from "wouter";
import { Menu, X, Globe, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/verify", label: "Verify" },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled ? "bg-background/80 backdrop-blur-md border-border" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group cursor-pointer">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Globe className="w-5 h-5 text-primary" />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-accent rounded-full border-2 border-background"></div>
          </div>
          <span className="font-heading font-bold text-xl tracking-tight text-text-main">
            VerifyMe<span className="text-primary">.world</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span className={cn(
                "text-sm font-medium cursor-pointer transition-colors hover:text-primary",
                location === link.href ? "text-primary" : "text-text-muted"
              )}>
                {link.label}
              </span>
            </Link>
          ))}
          
          <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-border">
             <Link href="/verify">
              <button className="text-sm font-medium text-text-main hover:text-white transition-colors">
                Verify a credential
              </button>
            </Link>
            <Link href="/auth">
              <button className="px-4 py-2 rounded-full bg-primary hover:bg-primary-hover text-white text-sm font-medium transition-all shadow-lg shadow-primary/20">
                Launch Demo
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-text-muted hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-surface border-b border-border p-4 animate-in slide-in-from-top-5">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span 
                  className="block p-2 text-base font-medium text-text-muted hover:text-white hover:bg-white/5 rounded-md cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <div className="h-px bg-border my-2"></div>
            <Link href="/verify">
              <span className="block p-2 text-base font-medium text-text-muted hover:text-white cursor-pointer" onClick={() => setIsOpen(false)}>
                Verify a credential
              </span>
            </Link>
            <Link href="/auth">
              <span className="block w-full text-center p-3 rounded-lg bg-primary text-white font-medium cursor-pointer" onClick={() => setIsOpen(false)}>
                Launch Demo
              </span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
