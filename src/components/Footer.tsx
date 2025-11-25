import { Waves, Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { Separator } from './ui/separator';

const footerLinks = {
  platform: [
    { label: 'About', href: '#about' },
    { label: 'Data Policy', href: '#policy' },
    { label: 'Contact', href: '#contact' },
    { label: 'Accessibility', href: '#accessibility' },
  ],
  resources: [
    { label: 'SDG14 Goals', href: '#sdg14' },
    { label: 'ISA Collaboration', href: '#isa' },
    { label: 'UN Ocean Decade', href: '#un-ocean' },
    { label: 'Research Partners', href: '#partners' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Terms of Service', href: '#terms' },
    { label: 'Cookie Policy', href: '#cookies' },
    { label: 'API Documentation', href: '#api' },
  ],
};

const partners = [
  'International Seabed Authority',
  'UN Ocean Decade',
  'Global Ocean Research Institute',
  'Marine Conservation Alliance',
];

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                <Waves className="w-6 h-6 text-cyan-400" />
              </div>
              <span className="text-white">OceanIQ</span>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              A unified digital platform bridging science, policy, and public awareness for sustainable ocean conservation.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 bg-slate-800 hover:bg-cyan-500/20 rounded-lg flex items-center justify-center transition-colors border border-slate-700 hover:border-cyan-500/50"
              >
                <Twitter className="w-4 h-4 text-slate-400 hover:text-cyan-400" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-slate-800 hover:bg-cyan-500/20 rounded-lg flex items-center justify-center transition-colors border border-slate-700 hover:border-cyan-500/50"
              >
                <Linkedin className="w-4 h-4 text-slate-400 hover:text-cyan-400" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-slate-800 hover:bg-cyan-500/20 rounded-lg flex items-center justify-center transition-colors border border-slate-700 hover:border-cyan-500/50"
              >
                <Github className="w-4 h-4 text-slate-400 hover:text-cyan-400" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-slate-800 hover:bg-cyan-500/20 rounded-lg flex items-center justify-center transition-colors border border-slate-700 hover:border-cyan-500/50"
              >
                <Mail className="w-4 h-4 text-slate-400 hover:text-cyan-400" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-white mb-4">Platform</h4>
            <ul className="space-y-2">
              {footerLinks.platform.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-cyan-400 text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-cyan-400 text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-cyan-400 text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-slate-800 mb-8" />

        {/* Partners Section */}
        <div className="mb-8">
          <h4 className="text-white mb-4 text-center">Our Partners</h4>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-lg text-slate-400 text-sm hover:border-cyan-500/50 transition-colors"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-slate-800 mb-6" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-sm">
          <p>© 2025 OceanIQ Platform. All rights reserved.</p>
          <p>
            Built with commitment to{' '}
            <span className="text-cyan-400">SDG14: Life Below Water</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
