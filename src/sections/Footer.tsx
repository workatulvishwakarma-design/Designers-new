import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white pt-24 pb-12 border-t border-[#E8E0D4] overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-16 xl:px-24">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">

          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8">
            <Link to="/" className="inline-block interactive">
              <span className="text-3xl font-black tracking-[0.2em] text-[#003926]">
                DSIGNER'S
              </span>
            </Link>
            <p className="text-[#2D2D2D]/60 text-lg leading-relaxed max-w-sm">
              An integrated watch enterprise operating across manufacturing, distribution, and brand development for over four decades.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <button
                  key={i}
                  className="w-12 h-12 rounded-full border border-[#E8E0D4] flex items-center justify-center text-[#003926] hover:bg-[#003926] hover:text-white hover:border-transparent hover:-translate-y-1 transition-all duration-300 interactive shadow-sm"
                >
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-[#003926] text-xs uppercase tracking-[0.3em] font-black">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Our Strengths', 'Designer'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '')}`}
                    className="text-[#2D2D2D]/60 hover:text-[#003926] hover:translate-x-2 transition-all duration-300 inline-block font-medium"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Other Links */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-[#003926] text-xs uppercase tracking-[0.3em] font-black">Company</h4>
            <ul className="space-y-4">
              {['Escort', 'Contact Us', 'Privacy Policy', 'Terms of Use'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Contact Us' ? '/contact' : `/${item.toLowerCase().replace(' ', '')}`}
                    className="text-[#2D2D2D]/60 hover:text-[#003926] hover:translate-x-2 transition-all duration-300 inline-block font-medium"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-4 space-y-8">
            <h4 className="text-[#003926] text-xs uppercase tracking-[0.3em] font-black">Newsletter</h4>
            <p className="text-[#2D2D2D]/60 text-sm leading-relaxed">
              Subscribe to receive updates on our latest collections and exclusive releases.
            </p>
            <form className="relative group">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-[#FAF8F5] border border-[#E8E0D4] rounded-full px-8 py-5 focus:outline-none focus:border-[#003926] focus:ring-4 focus:ring-[#003926]/5 transition-all outline-none pr-16 font-medium"
              />
              <button className="absolute right-2 top-2 bottom-2 w-12 h-12 bg-[#003926] text-white rounded-full flex items-center justify-center hover:bg-[#02523A] transition-colors shadow-lg shadow-[#003926]/20 active:scale-95 group-hover:scale-105">
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-12 border-t border-[#E8E0D4] flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8 text-[#2D2D2D]/40 text-[10px] uppercase tracking-[0.2em] font-black">
            <p>© {currentYear} DSIGNER'S. All Rights Reserved.</p>
            <div className="flex gap-8">
              <Link to="/privacy" className="hover:text-[#003926] transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-[#003926] transition-colors">Terms</Link>
            </div>
          </div>
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-1.5 h-1.5 rounded-full bg-[#003926] group-hover:animate-ping" />
            <p className="text-[#003926] text-[10px] uppercase tracking-[0.3em] font-black">Swiss Precision | Indian Mastery</p>
          </div>
        </div>
      </div>

      {/* Subtle Bottom Accent */}
      <div className="mt-12 w-full h-2 bg-[#003926]" />
    </footer>
  );
};

export default Footer;
