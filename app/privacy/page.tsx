'use client';

import Link from 'next/link';
import { FloatingNav } from '@/components/aceternity/floating-navbar';
import { 
  IconHome, 
  IconMessage, 
  IconBriefcase, 
  IconCode, 
  IconArrowLeft 
} from '@tabler/icons-react';

const navItems = [
  { name: "Home", link: "/", icon: <IconHome className="h-4 w-4" /> },
  { name: "Projects", link: "/projects", icon: <IconBriefcase className="h-4 w-4" /> },
  { name: "Tech Stack", link: "/tech-stack", icon: <IconCode className="h-4 w-4" /> },
  { name: "Contact", link: "/contact", icon: <IconMessage className="h-4 w-4" /> },
];

export default function PrivacyPolicy() {
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          
          <p className="text-gray-500">
            <strong>Effective Date:</strong> July 25, 2025 | 
            <strong> Last Updated:</strong> July 25, 2025
          </p>
        </div>
      </header>
      
      {/* Content */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto prose prose-gray prose-lg">
          <p className="text-gray-600 text-lg leading-relaxed">
            This Privacy Policy describes how Neo Todak AI Labs (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) collects, uses, and protects your information when you use our applications and services, including FlowState AI.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Information We Collect</h2>
          
          <div className="grid gap-6">
            <div className="neo-project-card">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Activity Data</h3>
              <ul className="neo-list">
                <li>Activity descriptions and timestamps</li>
                <li>Project names and work contexts</li>
                <li>Productivity patterns and flow state metrics</li>
                <li>Usage duration and frequency</li>
              </ul>
            </div>

            <div className="neo-project-card">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Device Information</h3>
              <ul className="neo-list">
                <li>Device identifiers and machine names</li>
                <li>Operating system and version</li>
                <li>App version and configuration</li>
                <li>Network information for API connectivity</li>
              </ul>
            </div>

            <div className="neo-project-card">
              <h3 className="text-lg font-bold text-gray-900 mb-3">User Preferences</h3>
              <ul className="neo-list">
                <li>App settings and configurations</li>
                <li>Notification preferences</li>
                <li>Auto-refresh settings</li>
                <li>API keys and authentication tokens (stored locally)</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">How We Use Your Information</h2>
          <ul className="neo-list">
            <li><strong>Service Delivery:</strong> To provide and maintain FlowState AI functionality</li>
            <li><strong>Productivity Analytics:</strong> To track and analyze your flow state patterns</li>
            <li><strong>Synchronization:</strong> To sync data across your devices and platforms</li>
            <li><strong>Notifications:</strong> To send relevant alerts about project changes</li>
            <li><strong>App Improvement:</strong> To enhance features and fix bugs</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Data Storage and Security</h2>
          
          <div className="neo-project-card bg-green-50 border-green-200">
            <h3 className="text-lg font-bold text-green-800 mb-2">Privacy-First Architecture</h3>
            <p className="text-green-700">
              FlowState AI uses a privacy-first approach where YOUR data stays in YOUR own Supabase instance. We do not store your personal data on our servers.
            </p>
          </div>
          
          <ul className="neo-list mt-6">
            <li><strong>Local Storage:</strong> User preferences are stored locally on your device</li>
            <li><strong>Your Database:</strong> Activity data is stored in your personal Supabase instance</li>
            <li><strong>Encryption:</strong> All data transmission uses HTTPS encryption</li>
            <li><strong>Access Control:</strong> Only you have access through your API keys</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Data Sharing and Disclosure</h2>
          <p className="text-gray-600 mb-4">
            We do not sell, trade, or otherwise transfer your personal information to third parties.
          </p>
          <ul className="neo-list">
            <li><strong>With Your Consent:</strong> When you explicitly authorize data sharing</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            <li><strong>Service Providers:</strong> Third-party services that help operate our app</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Your Rights and Controls</h2>
          <ul className="neo-list">
            <li><strong>Access:</strong> View all data stored in your Supabase instance</li>
            <li><strong>Modification:</strong> Update or correct your information</li>
            <li><strong>Deletion:</strong> Delete your data from your database</li>
            <li><strong>Portability:</strong> Export your data in standard formats</li>
            <li><strong>Opt-out:</strong> Disable notifications or data collection features</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Contact Information</h2>
          <div className="neo-project-card">
            <p className="text-gray-600 mb-4">If you have questions about this Privacy Policy:</p>
            <div className="space-y-2 text-sm">
              <p><strong>Email:</strong> privacy@neotodak.com</p>
              <p><strong>Website:</strong> https://neotodak.com</p>
              <p><strong>Company:</strong> Neo Todak AI Labs</p>
              <p><strong>Response Time:</strong> We aim to respond within 48 hours</p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500 mb-4">This privacy policy complies with:</p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">GDPR</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">CCPA</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">Apple App Store Guidelines</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">COPPA</span>
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
