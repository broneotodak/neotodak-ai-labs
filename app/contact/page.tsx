import React from "react";
import { Spotlight } from "@/components/aceternity/spotlight";
import { TextGenerateEffect } from "@/components/aceternity/text-generate-effect";
import { BackgroundBeams } from "@/components/aceternity/background-beams";
import { ContactForm } from "@/components/contact-form";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Back Button */}
      <div className="absolute top-8 left-8 z-50">
        <Link 
          href="/"
          className="flex items-center gap-2 px-6 py-3 bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/50 rounded-full text-neutral-300 hover:text-white hover:border-cyan-500/50 transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Portfolio
        </Link>
      </div>

      {/* Spotlight Effects */}
      <Spotlight className="absolute top-0 left-0 w-1/2 h-full" fill="cyan" />
      <Spotlight className="absolute top-0 right-0 w-1/2 h-full" fill="purple" />
      
      {/* Background Beams */}
      <BackgroundBeams />
      
      <div className="relative z-20 min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl mx-auto w-full">
          {/* Header Section */}
          <div className="text-center mb-16">
            <TextGenerateEffect 
              words="Let's Build Something Amazing Together"
              className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-8"
            />
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
              Have an idea for an A.I. system, automation project, or creative tech solution? 
              I'm always excited to collaborate on innovative projects where A.I. isn't just a tool — it's a teammate.
            </p>
          </div>

          {/* Contact Form */}
          <ContactForm />
          
          {/* Footer Info */}
          <div className="text-center mt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="p-6 rounded-2xl bg-neutral-800/30 backdrop-blur-sm border border-neutral-700/50 hover:border-cyan-500/50 transition-all duration-300 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">⚡</div>
                <div className="text-white font-semibold text-lg mb-2">Fast Response</div>
                <div className="text-neutral-400 text-sm">Usually respond within 24 hours</div>
              </div>
              <div className="p-6 rounded-2xl bg-neutral-800/30 backdrop-blur-sm border border-neutral-700/50 hover:border-purple-500/50 transition-all duration-300 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🤝</div>
                <div className="text-white font-semibold text-lg mb-2">Collaboration Ready</div>
                <div className="text-neutral-400 text-sm">From concept to deployment</div>
              </div>
              <div className="p-6 rounded-2xl bg-neutral-800/30 backdrop-blur-sm border border-neutral-700/50 hover:border-green-500/50 transition-all duration-300 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🚀</div>
                <div className="text-white font-semibold text-lg mb-2">Innovation Focus</div>
                <div className="text-neutral-400 text-sm">Cutting-edge A.I. solutions</div>
              </div>
            </div>
            
            <p className="text-neutral-400">
              Prefer direct contact? Reach out via{" "}
              <a 
                href="https://flowstate.neotodak.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
              >
                FlowState Platform
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 