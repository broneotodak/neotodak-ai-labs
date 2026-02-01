"use client";
import React, { useState } from "react";

interface FormData {
  name: string;
  contact: string;
  contactType: 'email' | 'whatsapp';
  projectType: string;
  description: string;
  budget: string;
  timeline: string;
}

export const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    contact: '',
    contactType: 'email',
    projectType: '',
    description: '',
    budget: '',
    timeline: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const projectTypes = [
    "A.I. System Development",
    "Automation & Workflow",
    "LLM Fine-tuning",
    "Voice AI Solutions",
    "Data Pipeline & Analytics",
    "Full-Stack A.I. Application",
    "Creative Tech Project",
    "Custom Integration",
    "Other"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const web3FormsData = {
        access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "5da1f869-afb6-423a-ae75-027d89c9a675",
        subject: `New Project Proposal from ${formData.name}`,
        from_name: 'Neo Todak Portfolio',
        message: `NEW PROJECT PROPOSAL!

Name: ${formData.name}
Contact: ${formData.contact} (${formData.contactType})
Project: ${formData.projectType}
Budget: ${formData.budget || 'Not specified'}
Timeline: ${formData.timeline || 'Not specified'}

Description:
${formData.description}

---
Sent from: neotodak.com/contact`,
        replyto: formData.contactType === 'email' ? formData.contact : (process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'neo@todak.com')
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(web3FormsData)
      });

      const result = await response.json();

      if (result.success) {
        fetch('https://ntfy.sh/neo_notifications', {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain',
            'Title': 'New Project Proposal - Neo Todak',
            'Priority': 'high',
            'Tags': 'rocket,briefcase,money_with_wings',
            'Actions': 'view, Open Portfolio, https://neotodak.com'
          },
          body: `NEW PROJECT PROPOSAL!\n\nName: ${formData.name}\nContact: ${formData.contact} (${formData.contactType})\nProject: ${formData.projectType}\nBudget: ${formData.budget || 'Not specified'}\nTimeline: ${formData.timeline || 'Not specified'}\n\nDescription: ${formData.description}`
        }).catch(error => console.log('Ntfy notification failed:', error));

        setIsSubmitting(false);
        setSubmitted(true);

        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            name: '', contact: '', contactType: 'email',
            projectType: '', description: '', budget: '', timeline: ''
          });
        }, 3000);
      } else {
        throw new Error(result.message || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '', contact: '', contactType: 'email',
          projectType: '', description: '', budget: '', timeline: ''
        });
      }, 3000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (submitted) {
    return (
      <div className="text-center p-12 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
        <div className="text-5xl mb-4">🚀</div>
        <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-3">Message Sent!</h3>
        <p className="text-green-600 dark:text-green-300">
          Thanks for your interest! I'll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";
  const labelClass = "block text-gray-700 dark:text-gray-300 font-medium mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className={labelClass}>Your Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className={inputClass}
            placeholder="John Doe"
          />
        </div>

        {/* Contact Method Toggle */}
        <div>
          <label className={labelClass}>Contact Method</label>
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, contactType: 'email' }))}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                formData.contactType === 'email'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, contactType: 'whatsapp' }))}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                formData.contactType === 'whatsapp'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Contact Input */}
      <div>
        <label className={labelClass}>
          {formData.contactType === 'email' ? 'Email Address' : 'WhatsApp Number'}
        </label>
        <input
          type={formData.contactType === 'email' ? 'email' : 'tel'}
          name="contact"
          value={formData.contact}
          onChange={handleInputChange}
          required
          className={inputClass}
          placeholder={formData.contactType === 'email' ? 'john@example.com' : '+1 (555) 123-4567'}
        />
      </div>

      {/* Project Type */}
      <div>
        <label className={labelClass}>Project Type</label>
        <select
          name="projectType"
          value={formData.projectType}
          onChange={handleInputChange}
          required
          className={inputClass}
        >
          <option value="">Select a project type...</option>
          {projectTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div>
        <label className={labelClass}>Project Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          rows={4}
          className={`${inputClass} resize-none`}
          placeholder="Tell me about your project idea, goals, and challenges..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Budget */}
        <div>
          <label className={labelClass}>Budget Range</label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            className={inputClass}
          >
            <option value="">Select budget range...</option>
            <option value="<$5k">Under $5,000</option>
            <option value="$5k-$15k">$5,000 - $15,000</option>
            <option value="$15k-$50k">$15,000 - $50,000</option>
            <option value="$50k+">$50,000+</option>
            <option value="discuss">Let's discuss</option>
          </select>
        </div>

        {/* Timeline */}
        <div>
          <label className={labelClass}>Timeline</label>
          <select
            name="timeline"
            value={formData.timeline}
            onChange={handleInputChange}
            className={inputClass}
          >
            <option value="">Select timeline...</option>
            <option value="asap">ASAP</option>
            <option value="1-2 weeks">1-2 weeks</option>
            <option value="1 month">1 month</option>
            <option value="2-3 months">2-3 months</option>
            <option value="3+ months">3+ months</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-4 px-8 rounded-lg font-semibold text-lg transition-all ${
          isSubmitting
            ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200'
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-3">
            <span className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
            Sending...
          </span>
        ) : (
          'Send Project Proposal →'
        )}
      </button>
    </form>
  );
};
