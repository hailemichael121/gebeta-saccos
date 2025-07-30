"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", labelAm: "ቤት" },
    { href: "/about", label: "About", labelAm: "ስለ እኛ" },
    { href: "/services", label: "Services", labelAm: "አገልglot" },
    { href: "/apply", label: "Loans", labelAm: "ብድር" },
    { href: "/branches", label: "Branches", labelAm: "ቅርንጫፎች" },
    { href: "/gallery", label: "Gallery", labelAm: "ምስሎች" },
    { href: "/news", label: "News", labelAm: "ዜና" },
    { href: "/contact", label: "Contact", labelAm: "ያግኙን" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl shadow-lg border-b border-blue-100/50"
          : "bg-white/20 backdrop-blur-md border-b border-white/20"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo.png"
                  alt="Gebeta SACCOS Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1
                  className={`text-xl font-bold transition-colors ${
                    scrolled ? "text-blue-800" : "text-blue-950 drop-shadow-lg"
                  }`}
                >
                  Gebeta SACCOS
                </h1>
                <p
                  className={`text-xs transition-colors ${scrolled ? "text-green-600" : "text-green-950 drop-shadow-sm"}`}
                >
                  LTD
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative font-medium transition-colors ${
                  pathname === item.href
                    ? scrolled
                      ? "text-blue-600"
                      : "text-blue-950 font-semibold"
                    : scrolled
                      ? "text-gray-700 hover:text-blue-600"
                      : "text-black/90 hover:text-green-900-950 drop-shadow-sm"
                }`}
              >
                {language === "en" ? item.label : item.labelAm}
                {pathname === item.href && (
                  <motion.div
                    className={`absolute -bottom-1 left-0 right-0 h-0.5 ${scrolled ? "bg-blue-600" : "bg-black"}`}
                    layoutId="activeTab"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "am" : "en")}
              className={`border-2 transition-all ${
                scrolled
                  ? "border-blue-200 text-blue-700 hover:bg-blue-50 bg-white/80"
                  : "border-blue-200 text-blue-700 hover:bg-blue-50 bg-white/80"
              } hidden md:flex`}
            >
              <Globe className="w-4 h-4 mr-1" />
              {language === "en" ? "አማ" : "EN"}
            </Button>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <Button
                variant="ghost"
                asChild
                className={`transition-all ${
                  scrolled
                    ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button
                asChild
                className={`transition-all ${
                  scrolled
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                <Link href="/auth/register">Join Now</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className={`lg:hidden ${scrolled ? "text-gray-700 hover:bg-blue-50" : "text-white hover:bg-white/20"}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pb-4 border-t border-white/20 bg-white/95 backdrop-blur-xl rounded-lg shadow-lg"
            >
              <div className="flex flex-col space-y-3 pt-4 px-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-gray-700 hover:text-blue-600 transition-colors font-medium ${
                      pathname === item.href
                        ? "text-blue-600 font-semibold"
                        : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {language === "en" ? item.label : item.labelAm}
                  </Link>
                ))}
                <div className="flex flex-col space-y-2 pt-4 border-t border-blue-100">
                  <Button variant="ghost" asChild>
                    <Link href="/auth/login">Sign In</Link>
                  </Button>
                  <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <Link href="/auth/register">Join Now</Link>
                  </Button>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
