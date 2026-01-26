// components/shared/Footer.tsx
"use client";

import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import Link from "next/link";

const footerLinks = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Help Center", href: "/help" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Docs", href: "/docs" },
      { label: "API", href: "/api" },
      { label: "Community", href: "/community" },
    ],
  },
];

const socialLinks = [
  { icon: <FaFacebookF />, href: "https://facebook.com" },
  { icon: <FaTwitter />, href: "https://twitter.com" },
  { icon: <FaLinkedinIn />, href: "https://linkedin.com" },
  { icon: <FaInstagram />, href: "https://instagram.com" },
];

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black text-gray-200">
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-4 gap-8">
        {/* Logo + Description */}
        <Box className="space-y-4">
          <Typography variant="h6" className="text-white font-bold text-xl">
            ECom Express
          </Typography>
          <Typography variant="body2" className="text-gray-400">
            The best e-commerce website in the world serving across different
            ranges like lifestyle, fashion, grocery and much more.
          </Typography>
          <Box className="flex space-x-3 mt-2">
            {socialLinks.map((social, idx) => (
              <IconButton
                key={idx}
                component="a"
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
        </Box>

        {/* Footer Links */}
        {footerLinks.map((section) => (
          <Box key={section.title}>
            <Typography className="font-semibold text-white mb-4">
              {section.title}
            </Typography>
            <Box className="flex flex-col space-y-2">
              {section.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Box>
        ))}
      </Box>

      {/* Copyright */}
      <Box className="border-t border-gray-700 py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </Box>
    </footer>
  );
};

export default Footer;
