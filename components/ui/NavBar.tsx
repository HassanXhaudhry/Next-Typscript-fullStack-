"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { X, Menu } from "lucide-react"; // Import missing icons
import DropdownMenu from "./dropdown";

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const navLinks = [
        { href: "/cart", label: "Cart" },
        { href: "/chat", label: "Chat" },
        { href: "/blogs", label: "Blogs" },
    ];

    return (
        <header className="w-full shadow-sm bg-gray-200">
            <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-2">
                {/* Logo Section */}
                <Link href="/dashboard" className="flex justify-center items-center gap-1">
                    <Image src="/logo.png" alt="Logo" width={55} height={5} className="object-contain" />
                    <h1 className="text-2xl font-semibold">Bust</h1>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-16 text-lg">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                        >
                            {link.label}
                            {link.label === "Cart" && ` (${cartItems.length})`}
                        </Link>
                    ))}
                    <DropdownMenu />
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="absolute z-10 top-[72px] left-0 right-0 bg-gray-200 text-lg shadow-lg md:hidden">
                        <div className="flex flex-col items-center gap-4 py-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                    {link.label === "Cart" && ` (${cartItems.length})`}
                                </Link>
                            ))}
                                <DropdownMenu />
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default NavBar;
