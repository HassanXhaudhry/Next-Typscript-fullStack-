import Link from 'next/link';

interface LinkItem {
  name: string;
  path: string;
}

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const quickLinks: LinkItem[] = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  const resourcesLinks: LinkItem[] = [
    { name: 'Documentation', path: '/docs' },
    { name: 'Blog', path: '/blog' },
    { name: 'Help Center', path: '/support' },
    { name: 'API Status', path: '/status' },
  ];

  return (
    <footer className="bg-gray-200 ">
      <div className="container mx-auto px-8 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">BUST</h3>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-sm transition-colors duration-300 text-gray-600 hover:text-gray-900"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2">
              {resourcesLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-sm transition-colors duration-300 text-gray-600 hover:text-gray-900"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className=" text-lg font-semibold">Contact Us</h3>
            <address className="text-sm not-italic text-gray-600">
              123 Business Street<br />
              New York, NY 10001<br />
              United States<br />
              <a href="mailto:info@company.com" className=" transition-colors duration-300">
                info@company.com
              </a>
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-500 mt-8 text-center">
          <p className="text-sm text-gray-600 py-4">
            &copy; {currentYear} Company Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;