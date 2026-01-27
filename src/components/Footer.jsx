import React from 'react';
import { Github, Mail, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-900 bg-black py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Course Info */}
          <div>
            <h3 className="mb-4 text-xl font-bold text-white">
              Introduction to Robotics
            </h3>
            <p className="text-gray-400">
              A comprehensive course exploring robotics fundamentals, automation, and intelligent systems.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#assignments"
                  className="text-gray-400 transition-colors hover:text-blue-400"
                >
                  Assignments
                </a>
              </li>
              <li>
                <a
                  href="#resources"
                  className="text-gray-400 transition-colors hover:text-blue-400"
                >
                  Resources
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 transition-colors hover:text-blue-400"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="rounded-lg bg-gray-900 p-3 text-gray-400 transition-colors hover:bg-blue-500 hover:text-white"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="rounded-lg bg-gray-900 p-3 text-gray-400 transition-colors hover:bg-blue-500 hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="rounded-lg bg-gray-900 p-3 text-gray-400 transition-colors hover:bg-blue-500 hover:text-white"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-900 pt-8 text-center">
          <p className="text-gray-500">
            © {currentYear} Introduction to Robotics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;