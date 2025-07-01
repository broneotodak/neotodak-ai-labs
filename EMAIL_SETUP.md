# Email Notification Setup Guide

## Quick Setup Options

### Option 1: Web3Forms (Recommended - Free & Simple) ✅ CONFIGURED

1. **Sign up** at [web3forms.com](https://web3forms.com) ✅ DONE
2. **Get your access key** from the dashboard ✅ DONE
3. **Set up environment variables**:
   - **Netlify**: Already configured in environment variables ✅
   - **Local development**: Create `.env.local` file:
     ```
     WEB3FORMS_ACCESS_KEY=your_web3forms_access_key_here
     CONTACT_EMAIL=neo@todak.com
     ```

### Option 2: EmailJS (Free Tier Available)

1. **Sign up** at [emailjs.com](https://emailjs.com)
2. **Create a service** (Gmail, Outlook, etc.)
3. **Create an email template**
4. **Get your credentials** and update the API route

### Option 3: Resend (Developer-Friendly)

1. **Sign up** at [resend.com](https://resend.com)
2. **Get API key** from dashboard
3. **Install Resend**: `npm install resend`
4. **Update API route** to use Resend

## Current Implementation

The API route (`app/api/contact/route.ts`) currently uses **Web3Forms** as the default email service.

## What You'll Receive

### 📱 Ntfy Notification
- **Channel**: `neo_notifications`
- **Priority**: High
- **Instant delivery** to your phone/desktop

### 📧 Email Notification
- **To**: `neo@todak.com`
- **Subject**: `🚀 New Project Proposal from [Name]`
- **Format**: Beautiful HTML email with all form details
- **Reply-to**: Client's email (if provided)

## Testing

1. Fill out the contact form at `/contact`
2. Submit the form
3. Check your ntfy notifications
4. Check your email inbox

## Troubleshooting

- **No email received**: Check spam folder, verify email service configuration
- **No ntfy notification**: Ensure you're subscribed to `neo_notifications` channel
- **Form errors**: Check browser console for API errors 