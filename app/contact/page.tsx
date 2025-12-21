'use client';

import React from "react";
import Link from "next/link";
import { FloatingNav } from "@/components/aceternity/floating-navbar";
import { ContactForm } from "@/components/contact-form";
import { 
  IconHome, 
  IconMessage, 
  IconBriefcase, 
  IconCode, 
  IconArrowLeft,
  IconMail,
  IconBrandGithub,
  IconBrandLinkedin
} from "@tabler/icons-react";

const navItems = [
  { name: "Home", link: "/", icon: <IconHome className="h-4 w-4" /> },
  { name: "Projects", link: "/projects", icon: <IconBriefcase className="h-4 w-4" /> },
  { name: "Tech Stack", link: "/tech-stack", icon: <IconCode className="h-4 w-4" /> },
  { name: "Contact", link: "/contact", icon: <IconMessage className="h-4 w-4" /> },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <FloatingNav navItems={navItems} />
      
      {/* Header */}
      <header className="pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
          >
            <IconArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          
          {/* Title */}
          <div className="neo-section-header mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Get in Touch
            </h1>
          </div>
          
          <p className="text-xl text-gray-600 max-w-2xl">
            Have an idea for an AI system, automation project, or creative tech solution? 
            I'm always excited to collaborate on innovative projects.
          </p>
        </div>
      </header>
      
      {/* Main Content */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="neo-project-card">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Send a Message</h2>
                <ContactForm />
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-6">
              {/* Quick Info Cards */}
              <div className="neo-project-card">
                <div className="text-2xl mb-3">⚡</div>
                <h3 className="font-bold text-gray-900 mb-1">Fast Response</h3>
                <p className="text-sm text-gray-600">Usually respond within 24 hours</p>
              </div>
              
              <div className="neo-project-card">
                <div className="text-2xl mb-3">🤝</div>
                <h3 className="font-bold text-gray-900 mb-1">Collaboration Ready</h3>
                <p className="text-sm text-gray-600">From concept to deployment</p>
              </div>
              
              <div className="neo-project-card">
                <div className="text-2xl mb-3">🚀</div>
                <h3 className="font-bold text-gray-900 mb-1">Innovation Focus</h3>
                <p className="text-sm text-gray-600">Cutting-edge AI solutions</p>
              </div>
              
              {/* Social Links */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Connect Directly</h3>
                <div className="space-y-3">
                  <a 
                    href="mailto:broneotodak@todak.com"
                    className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <IconMail className="h-5 w-5" />
                    <span>broneotodak@todak.com</span>
                  </a>
                  <a 
                    href="https://github.com/broneotodak"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <IconBrandGithub className="h-5 w-5" />
                    <span>github.com/broneotodak</span>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/broneotodak"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <IconBrandLinkedin className="h-5 w-5" />
                    <span>LinkedIn Profile</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-gray-500 text-sm">© 2025 NEOTODAK AI Labs</span>
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Back to Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
