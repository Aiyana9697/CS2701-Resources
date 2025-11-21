/* 
React componenet that renders a footer that includes: 
- Brand section with logo, name, description, and social media icons
- Three columns of navigational links; Platform, Resources, Legal
- Partners section displaying partner names 
- Copyright info 
*/
import { Waves, Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { Separator } from './ui/separator';

/* 
footerlinks - bject containing 3 keys where each key's value is an array of link objects 
Each link object has a label (text displayed to the user) and href property (URL the link points to, currently placeholder # values)

partners - array of strings cotaining partner names shown in the partners section
*/
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


/* 
creates a footer element with a dark background and cyan accents
centers the footer content and limits its maximum width so it doesn't stretch too wide

creates a grid layout for the main footer: 
- 1 column on small screens
- 2 columns on medium screens
- 4 columns on large screen

brand container occupies the 1st column 
flex layout used to arrange logo and name horizontally with a gap 
logo box has a cyan background and contains a waves lucide-react icon 
brand description is in light slate colour with smaller text size
each social media icon is contained within a square button with hover effects
*/
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

          {/*
          footerLinks array is mapped over to create 3 columns of navigational links
          each column has a heading in white text with margin below
          each link is displayed in light slate colour with hover effects and smaller text size
          2 units of vertical space between each link

          separator component creates a horizontal line between the 3 columns of links
           */}
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

        {/*
        partners array is mapped over to display partner names in a flex container 
        each partner name is within a box with padding, semi-transparent dark slate background, light slate text and hover effects
        separator component creates a horizontal line between the 3 columns of links
        */}
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

        {/* Displays copyright info and SDG14 commitment*/}
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
