
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToDemo = () => {
    const demoSection = document.getElementById('demo-section');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold">
              <span className="text-[#221F26] font-extrabold">miti</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#how-it-works">How It Works</NavLink>
            <NavLink href="#testimonials">Risk Operations Center</NavLink>
            <Link to="/login">
              <Button variant="ghost" className="font-medium">
                Login
              </Button>
            </Link>
            <Button 
              className="font-medium bg-[#221F26] text-white hover:bg-[#221F26]/90"
              onClick={scrollToDemo}
            >
              Request Demo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden fixed inset-x-0 bg-white shadow-md transition-all duration-300 ease-in-out",
          isOpen ? "top-16 opacity-100" : "-top-96 opacity-0"
        )}>
          <div className="flex flex-col space-y-4 p-4">
            <MobileNavLink href="#features" onClick={toggleMenu}>Features</MobileNavLink>
            <MobileNavLink href="#how-it-works" onClick={toggleMenu}>How It Works</MobileNavLink>
            <MobileNavLink href="#testimonials" onClick={toggleMenu}>Risk Operations Center</MobileNavLink>
            <Link to="/login" onClick={toggleMenu}>
              <Button variant="ghost" className="justify-start font-medium w-full text-left">
                Login
              </Button>
            </Link>
            <Button 
              className="font-medium bg-[#221F26] text-white hover:bg-[#221F26]/90"
              onClick={() => {
                toggleMenu();
                scrollToDemo();
              }}
            >
              Request Demo
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <a 
      href={href} 
      className="text-[#221F26] hover:text-[#221F26]/70 font-medium transition-colors"
    >
      {children}
    </a>
  );
};

const MobileNavLink = ({ 
  href, 
  children, 
  onClick 
}: { 
  href: string; 
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <a 
      href={href} 
      className="text-[#221F26] hover:text-[#221F26]/70 font-medium transition-colors py-2 block"
      onClick={onClick}
    >
      {children}
    </a>
  );
};

export default Navbar;
