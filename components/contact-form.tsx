"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

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
      // Send form data to our API route which handles both email and ntfy notifications
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      
      if (result.success) {
        setIsSubmitting(false);
        setSubmitted(true);
        
        // Reset form after success message
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            name: '',
            contact: '',
            contactType: 'email',
            projectType: '',
            description: '',
            budget: '',
            timeline: ''
          });
        }, 3000);
      } else {
        throw new Error(result.message || 'Failed to submit form');
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      // Still show success to user even if backend fails
      setIsSubmitting(false);
      setSubmitted(true);
      
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          contact: '',
          contactType: 'email',
          projectType: '',
          description: '',
          budget: '',
          timeline: ''
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
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-12 rounded-3xl bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-xl border border-green-500/30"
      >
        <div className="text-6xl mb-6">🚀</div>
        <h3 className="text-3xl font-bold text-green-400 mb-4">Message Sent!</h3>
        <p className="text-neutral-300 text-lg">
          Thanks for your interest! I'll get back to you within 24 hours to discuss your project.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="p-8 rounded-3xl bg-neutral-900/40 backdrop-blur-xl border border-neutral-700/50 shadow-2xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Name Field */}
        <div className="space-y-2">
          <label className="text-neutral-300 font-medium">Your Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
            placeholder="John Doe"
          />
        </div>

        {/* Contact Type Toggle */}
        <div className="space-y-2">
          <label className="text-neutral-300 font-medium">Contact Method</label>
          <div className="flex bg-neutral-800/50 rounded-xl p-1 border border-neutral-700/50">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, contactType: 'email' }))}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                formData.contactType === 'email'
                  ? 'bg-cyan-500 text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              📧 Email
            </button>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, contactType: 'whatsapp' }))}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                formData.contactType === 'whatsapp'
                  ? 'bg-green-500 text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              📱 WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Contact Field */}
      <div className="mb-6">
        <label className="text-neutral-300 font-medium block mb-2">
          {formData.contactType === 'email' ? 'Email Address' : 'WhatsApp Number'}
        </label>
        <input
          type={formData.contactType === 'email' ? 'email' : 'tel'}
          name="contact"
          value={formData.contact}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
          placeholder={formData.contactType === 'email' ? 'john@example.com' : '+1 (555) 123-4567'}
        />
      </div>

      {/* Project Type */}
      <div className="mb-6">
        <label className="text-neutral-300 font-medium block mb-2">Project Type</label>
        <select
          name="projectType"
          value={formData.projectType}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
        >
          <option value="">Select a project type...</option>
          {projectTypes.map((type) => (
            <option key={type} value={type} className="bg-neutral-800">
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Project Description */}
      <div className="mb-6">
        <label className="text-neutral-300 font-medium block mb-2">Project Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          rows={4}
          className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 resize-none"
          placeholder="Tell me about your project idea, goals, and how A.I. can help solve your challenges..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Budget Range */}
        <div className="space-y-2">
          <label className="text-neutral-300 font-medium">Budget Range</label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
          >
            <option value="">Select budget range...</option>
            <option value="<$5k" className="bg-neutral-800">Under $5,000</option>
            <option value="$5k-$15k" className="bg-neutral-800">$5,000 - $15,000</option>
            <option value="$15k-$50k" className="bg-neutral-800">$15,000 - $50,000</option>
            <option value="$50k+" className="bg-neutral-800">$50,000+</option>
            <option value="discuss" className="bg-neutral-800">Let's discuss</option>
          </select>
        </div>

        {/* Timeline */}
        <div className="space-y-2">
          <label className="text-neutral-300 font-medium">Timeline</label>
          <select
            name="timeline"
            value={formData.timeline}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
          >
            <option value="">Select timeline...</option>
            <option value="asap" className="bg-neutral-800">ASAP</option>
            <option value="1-2 weeks" className="bg-neutral-800">1-2 weeks</option>
            <option value="1 month" className="bg-neutral-800">1 month</option>
            <option value="2-3 months" className="bg-neutral-800">2-3 months</option>
            <option value="3+ months" className="bg-neutral-800">3+ months</option>
            <option value="flexible" className="bg-neutral-800">Flexible</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 ${
          isSubmitting
            ? 'bg-neutral-700 text-neutral-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:shadow-lg hover:shadow-cyan-500/25'
        }`}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center gap-3">
            <div className="w-5 h-5 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin"></div>
            Sending Message...
          </div>
        ) : (
          'Send Project Proposal 🚀'
        )}
      </motion.button>
    </motion.form>
  );
}; 