import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "./ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Menu", path: "/menu" },
    { name: "Order", path: "/order" },
    { name: "Track Order", path: "/track-order" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-2xl md:text-3xl font-bold font-display bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ANN's Kitchen
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors hover:text-primary ${
                  isActive(link.path) ? "text-primary" : "text-foreground/80"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a href="tel:+1234567890">
              <Button size="sm" className="hero-gradient text-white hover:opacity-90 transition-opacity">
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`font-medium transition-colors ${
                    isActive(link.path) ? "text-primary" : "text-foreground/80"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <a href="tel:+1234567890">
                <Button size="sm" className="w-full hero-gradient text-white">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
