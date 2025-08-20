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
              {" "}or connect with{" "}
              <a 
                href="https://www.linkedin.com/in/broneotodak" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors duration-300"
              >
                Broneo Todak on LinkedIn
              </a>
            </p>
            
            <div className="mt-8 pt-8 border-t border-neutral-800">
              <div className="flex flex-col items-center gap-4">
                <p className="text-neutral-500 text-sm">Founder & Lead AI Engineer</p>
                <div className="flex gap-6">
                  <a 
                    href="mailto:broneotodak@todak.com" 
                    className="text-neutral-400 hover:text-white transition-colors duration-300"
                    title="Email"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </a>
                  <a 
                    href="https://github.com/broneotodak" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-white transition-colors duration-300"
                    title="GitHub"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/broneotodak" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-white transition-colors duration-300"
                    title="LinkedIn"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 