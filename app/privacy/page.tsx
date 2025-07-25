export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        
        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <p className="text-sm text-gray-400 mb-6">
              <strong>Effective Date:</strong> July 25, 2025<br/>
              <strong>Last Updated:</strong> July 25, 2025
            </p>
            
            <p className="mb-6">
              This Privacy Policy describes how Neo Todak AI Labs (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) collects, uses, and protects your information when you use our mobile applications and services, including FlowState AI.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-blue-400 mb-2">Activity Data</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Activity descriptions and timestamps</li>
                  <li>Project names and work contexts</li>
                  <li>Productivity patterns and flow state metrics</li>
                  <li>Usage duration and frequency</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-blue-400 mb-2">Device Information</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Device identifiers and machine names</li>
                  <li>Operating system and version</li>
                  <li>App version and configuration</li>
                  <li>Network information for API connectivity</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-blue-400 mb-2">User Preferences</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>App settings and configurations</li>
                  <li>Notification preferences</li>
                  <li>Auto-refresh settings</li>
                  <li>API keys and authentication tokens (stored locally)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-blue-400 mb-2">Analytics Data</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>App usage statistics</li>
                  <li>Feature utilization metrics</li>
                  <li>Performance and crash data</li>
                  <li>Error logs and diagnostic information</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Service Delivery:</strong> To provide and maintain FlowState AI functionality</li>
              <li><strong>Productivity Analytics:</strong> To track and analyze your flow state patterns</li>
              <li><strong>Synchronization:</strong> To sync data across your devices and platforms</li>
              <li><strong>Notifications:</strong> To send relevant alerts about project changes and activity updates</li>
              <li><strong>App Improvement:</strong> To enhance features and fix bugs</li>
              <li><strong>Support:</strong> To provide technical support and troubleshooting</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Data Storage and Security</h2>
            <div className="space-y-4">
              <div className="bg-gray-900 p-4 rounded-lg border-l-4 border-green-400">
                <h3 className="text-lg font-medium text-green-400 mb-2">Privacy-First Architecture</h3>
                <p>FlowState AI uses a privacy-first approach where YOUR data stays in YOUR own Supabase instance. We do not store your personal data on our servers.</p>
              </div>
              
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Local Storage:</strong> User preferences and settings are stored locally on your device</li>
                <li><strong>Your Database:</strong> Activity data is stored in your personal Supabase database instance</li>
                <li><strong>Encryption:</strong> All data transmission uses HTTPS encryption</li>
                <li><strong>Access Control:</strong> Only you have access to your data through your API keys</li>
                <li><strong>No Central Storage:</strong> We do not maintain a central database of user data</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Data Sharing and Disclosure</h2>
            <p className="mb-4">We do not sell, trade, or otherwise transfer your personal information to third parties. Your data may only be accessed in the following limited circumstances:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>With Your Consent:</strong> When you explicitly authorize data sharing</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Service Providers:</strong> Third-party services (like Apple&apos;s notification service) that help operate our app</li>
              <li><strong>Business Transfers:</strong> In the event of a merger or acquisition (with prior notice)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Third-Party Services</h2>
            <div className="space-y-3">
              <p>FlowState AI integrates with the following third-party services:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Supabase:</strong> Backend database and API services (your own instance)</li>
                <li><strong>Apple Push Notifications:</strong> For app notifications and alerts</li>
                <li><strong>iOS System Services:</strong> Device notifications, background refresh</li>
              </ul>
              <p className="text-sm text-gray-400">
                Each service has its own privacy policy. We recommend reviewing their policies for complete information.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Your Rights and Controls</h2>
            <div className="space-y-4">
              <p>You have the following rights regarding your data:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access:</strong> View all data stored in your Supabase instance</li>
                <li><strong>Modification:</strong> Update or correct your information</li>
                <li><strong>Deletion:</strong> Delete your data from your database</li>
                <li><strong>Portability:</strong> Export your data in standard formats</li>
                <li><strong>Opt-out:</strong> Disable notifications or data collection features</li>
              </ul>
              
              <div className="bg-gray-900 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-blue-400 mb-2">How to Exercise Your Rights</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Access your Supabase dashboard to view/modify data</li>
                  <li>Use app settings to control data collection</li>
                  <li>Contact us at privacy@neotodak.com for assistance</li>
                  <li>Uninstall the app to stop all data collection</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Children&apos;s Privacy</h2>
            <p>
              FlowState AI is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected information from a child under 13, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Changes to This Privacy Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. When we do, we will:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Update the &quot;Last Updated&quot; date at the top of this policy</li>
              <li>Notify users through the app or email if changes are significant</li>
              <li>Provide 30 days notice for material changes</li>
              <li>Maintain previous versions for your reference</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Information</h2>
            <div className="bg-gray-900 p-6 rounded-lg">
              <p className="mb-4">If you have questions about this Privacy Policy or our data practices, contact us:</p>
              <div className="space-y-2 text-sm">
                <p><strong>Email:</strong> privacy@neotodak.com</p>
                <p><strong>Website:</strong> https://neotodak.com</p>
                <p><strong>Company:</strong> Neo Todak AI Labs</p>
                <p><strong>Response Time:</strong> We aim to respond within 48 hours</p>
              </div>
            </div>
          </section>

          <section className="mt-12 pt-8 border-t border-gray-700">
            <div className="text-center text-sm text-gray-400">
              <p className="mb-2">This privacy policy complies with:</p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="bg-gray-800 px-3 py-1 rounded">GDPR</span>
                <span className="bg-gray-800 px-3 py-1 rounded">CCPA</span>
                <span className="bg-gray-800 px-3 py-1 rounded">Apple App Store Guidelines</span>
                <span className="bg-gray-800 px-3 py-1 rounded">COPPA</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}