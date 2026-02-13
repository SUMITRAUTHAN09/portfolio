import Link from "next/link";

export default function Footer() {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/#projects" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <footer className="relative w-full bg-black text-white py-14 px-4 sm:px-6 lg:px-8 border-t border-gray-900 font-serif">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-10">
        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* BRAND */}
          <div className="flex flex-col space-y-5">
            <h2 className="text-2xl font-semibold tracking-wide text-blue-400 cursor-pointer">
              SUMIT RAUTHAN
            </h2>

            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Building fast, responsive, and user-focused digital experiences.
            </p>

            {/* SOCIAL LINKS */}
            <div className="flex md:gap-8 gap-6 pt-2">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/sumit-rauthan-277b91230/"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-blue-500 transition-all duration-300 hover:scale-110"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452H17.21V14.87c0-1.33-.027-3.042-1.852-3.042-1.853 0-2.136 1.445-2.136 2.94v5.684H9.984V9h3.112v1.561h.044c.433-.82 1.492-1.683 3.068-1.683 3.28 0 3.884 2.159 3.884 4.967v6.607zM5.337 7.433a1.804 1.804 0 110-3.607 1.804 1.804 0 010 3.607zM6.956 20.452H3.717V9h3.239v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.727v20.545C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.273V1.727C24 .774 23.2 0 22.222 0z" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/SUMITRAUTHAN09"
                aria-label="GitHub"
                className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.084-.73.084-.73 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.605-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.467-2.38 1.236-3.22-.124-.303-.536-1.524.116-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 016 0c2.292-1.552 3.3-1.23 3.3-1.23.652 1.653.24 2.874.116 3.176.77.84 1.236 1.91 1.236 3.22 0 4.61-2.807 5.625-5.48 5.92.43.372.823 1.102.823 2.222v3.293c0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              {/* Email */}
              <a
                href="mailto:rauthansumit413@gmail.com"
                aria-label="Email"
                className="text-gray-400 hover:text-red-400 transition-all duration-300 hover:scale-110"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l9 6 9-6M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z"
                  />
                </svg>
              </a>

              {/* Phone */}
              <a
                href="tel:+918864854298"
                aria-label="Phone"
                className="text-gray-400 hover:text-green-400 transition-all duration-300 hover:scale-110"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.516 2.064a2 2 0 01-.45 1.85l-1.272 1.272a16.001 16.001 0 006.586 6.586l1.272-1.272a2 2 0 011.85-.45l2.064.516A2 2 0 0121 16.72V19a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V5z"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="flex flex-col space-y-5">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-1">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div className="flex flex-col space-y-5">
            <h3 className="text-lg font-semibold">Contact</h3>

            {/* Email SVG */}
            <a
              href="mailto:rauthansumit413@gmail.com"
              aria-label="Email"
              className="flex items-center gap-3 text-gray-400 text-sm hover:text-white transition-colors text-gray-400 hover:text-red-400 transition-all duration-300 hover:scale-110"
            >
              <div className="flex items-center gap-3 text-gray-400 text-sm hover:text-white transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l9 6 9-6M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z"
                  />
                </svg>
                <span>rauthansumit413@gmail.com</span>
              </div>
            </a>
            <a
              href="tel:+918864854298"
              aria-label="Phone"
              className="text-gray-400 hover:text-green-400 transition-all duration-300 hover:scale-110"
            >
              <div className="flex items-center gap-3 text-gray-400 text-sm hover:text-white transition-colors">
                {/* Phone SVG */}
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.516 2.064a2 2 0 01-.45 1.85l-1.272 1.272a16.001 16.001 0 006.586 6.586l1.272-1.272a2 2 0 011.85-.45l2.064.516A2 2 0 0121 16.72V19a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V5z"
                  />
                </svg>
                <span>+91 8864854298</span>
              </div>
            </a>
            <div className="flex items-center gap-3 text-gray-400 text-sm hover:text-white transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243A8 8 0 1117.657 16.657z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-gray-500 text-sm">
                Deharadun, uttrakhand, India
              </span>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-900 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Sumit Rauthan. Crafted with passion.
            </p>

            <p className="text-gray-600 text-xs">Designed & Built by Sumit</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
