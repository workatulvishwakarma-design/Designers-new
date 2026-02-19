import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Strengths', path: '/strengths' },
    { name: 'Designer', path: '/designer' },
    { name: 'Escort', path: '/escort' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-xl shadow-lg shadow-[#003926]/5'
          : 'bg-transparent'
          }`}
      >
        <div className="w-full px-6 lg:px-16 xl:px-24">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 interactive group">
              <span className="text-2xl font-black tracking-[0.2em] text-[#003926] group-hover:text-[#02523A] transition-colors">
                DSIGNER'S
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-12">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-300 interactive px-4 py-2 ${location.pathname === link.path
                    ? 'text-[#003926] nav-active'
                    : 'text-[#2D2D2D]/50 hover:text-[#003926]'
                    }`}
                >
                  {link.name}
                  <div className="nav-underline" />
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-8">
              {/* Cart Button */}
              <button className="group relative p-3 text-[#003926] hover:bg-[#003926] hover:text-white rounded-full transition-all duration-300 interactive shadow-sm">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#003926] group-hover:bg-[#D4A574] text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-[#FAF8F5] transition-colors">
                  0
                </span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-3 text-[#003926] bg-[#FAF8F5] rounded-full shadow-md interactive"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[#003926]/40 backdrop-blur-md"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-0 right-0 w-full max-w-sm h-full bg-[#FAF8F5] shadow-2xl transition-transform duration-500 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <div className="p-12 pt-32 h-full flex flex-col justify-between">
            <div className="space-y-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-3xl font-black transition-all duration-300 interactive ${location.pathname === link.path
                    ? 'text-[#003926] translate-x-4'
                    : 'text-[#2D2D2D]/60 hover:text-[#003926] hover:translate-x-2'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Contact Info */}
            <div className="pt-12 border-t border-[#003926]/10">
              <p className="text-[#003926]/40 text-[10px] uppercase tracking-[0.3em] font-black mb-6">Connect with us</p>
              <div className="space-y-4">
                <p className="text-[#003926] font-black text-lg">hello@dsigners.in</p>
                <p className="text-[#003926] font-black text-lg">+91 98201 06589</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
