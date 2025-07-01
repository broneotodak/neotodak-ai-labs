import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  contact: string;
  contactType: 'email' | 'whatsapp';
  projectType: string;
  description: string;
  budget: string;
  timeline: string;
}

export async function POST(request: NextRequest) {
  try {
    // Check for required environment variables
    if (!process.env.WEB3FORMS_ACCESS_KEY) {
      console.error('Missing WEB3FORMS_ACCESS_KEY environment variable');
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    if (!process.env.CONTACT_EMAIL) {
      console.error('Missing CONTACT_EMAIL environment variable');
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    const formData: ContactFormData = await request.json();
    
    // Send ntfy notification (without emojis to avoid encoding issues)
    const notificationMessage = `NEW PROJECT PROPOSAL!

Name: ${formData.name}
Contact: ${formData.contact} (${formData.contactType})
Project: ${formData.projectType}
Budget: ${formData.budget || 'Not specified'}
Timeline: ${formData.timeline || 'Not specified'}

Description: ${formData.description}

---
From: neotodak.com/contact`;

    const ntfyPromise = fetch('https://ntfy.sh/neo_notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'Title': 'New Project Proposal - Neo Todak',
        'Priority': 'high',
        'Tags': 'rocket,briefcase,money_with_wings',
        'Actions': 'view, Open Portfolio, https://neotodak.com'
      },
      body: notificationMessage
    }).then(response => {
      console.log('Ntfy response:', response.status, response.statusText);
      return response;
    }).catch(error => {
      console.error('Ntfy error:', error);
      throw error;
    });

    // Send email using EmailJS (free service)
    const emailData = {
      service_id: 'service_gmail', // You'll need to configure this
      template_id: 'template_contact', // You'll need to configure this
      user_id: 'YOUR_EMAILJS_USER_ID', // You'll need to configure this
      template_params: {
        to_email: process.env.CONTACT_EMAIL,
        from_name: formData.name,
        from_email: formData.contact,
        contact_type: formData.contactType,
        project_type: formData.projectType,
        budget: formData.budget || 'Not specified',
        timeline: formData.timeline || 'Not specified',
        message: formData.description,
        subject: `🚀 New Project Proposal from ${formData.name}`,
        reply_to: formData.contactType === 'email' ? formData.contact : 'noreply@todak.com'
      }
    };

    // Alternative: Send email using a simple SMTP service
    const emailHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; padding: 10px; background: white; border-radius: 4px; border-left: 4px solid #667eea; }
            .label { font-weight: bold; color: #667eea; }
            .value { margin-top: 5px; }
            .description { background: white; padding: 15px; border-radius: 4px; border: 1px solid #ddd; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🚀 New Project Proposal</h1>
                <p>Someone wants to collaborate on an A.I. project!</p>
            </div>
            <div class="content">
                <div class="field">
                    <div class="label">👤 Name:</div>
                    <div class="value">${formData.name}</div>
                </div>
                <div class="field">
                    <div class="label">📞 Contact (${formData.contactType}):</div>
                    <div class="value">${formData.contact}</div>
                </div>
                <div class="field">
                    <div class="label">🎯 Project Type:</div>
                    <div class="value">${formData.projectType}</div>
                </div>
                <div class="field">
                    <div class="label">💰 Budget:</div>
                    <div class="value">${formData.budget || 'Not specified'}</div>
                </div>
                <div class="field">
                    <div class="label">⏰ Timeline:</div>
                    <div class="value">${formData.timeline || 'Not specified'}</div>
                </div>
                <div class="field">
                    <div class="label">📝 Project Description:</div>
                    <div class="description">${formData.description}</div>
                </div>
                <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
                <p style="color: #666; font-size: 14px;">
                    This message was sent from your portfolio contact form at neotodak.com/contact
                </p>
            </div>
        </div>
    </body>
    </html>`;

    // Using Web3Forms (free email service) as a simple solution
    const emailPromise = fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY, // Web3Forms access key from environment variables
        subject: `🚀 New Project Proposal from ${formData.name}`,
        from_name: 'Neo Todak Portfolio',
        to: process.env.CONTACT_EMAIL,
        message: `🚀 NEW PROJECT PROPOSAL!

👤 Name: ${formData.name}
📞 Contact: ${formData.contact} (${formData.contactType})
🎯 Project: ${formData.projectType}
💰 Budget: ${formData.budget || 'Not specified'}
⏰ Timeline: ${formData.timeline || 'Not specified'}

📝 Description:
${formData.description}

---
Sent from: neotodak.com/contact`,
        // Remove HTML for now to avoid formatting issues
        replyto: formData.contactType === 'email' ? formData.contact : process.env.CONTACT_EMAIL
      })
    }).then(response => {
      console.log('Email response:', response.status, response.statusText);
      return response.json();
    }).then(data => {
      console.log('Email result:', data);
      return data;
    }).catch(error => {
      console.error('Email error:', error);
      throw error;
    });

    // Execute both notifications in parallel
    const results = await Promise.allSettled([ntfyPromise, emailPromise]);
    
    console.log('Notification results:', results);
    
    // Check individual results
    const ntfyResult = results[0];
    const emailResult = results[1];
    
    let message = 'Notifications processed: ';
    if (ntfyResult.status === 'fulfilled') {
      message += 'Ntfy ✅ ';
    } else {
      message += 'Ntfy ❌ ';
      console.error('Ntfy failed:', ntfyResult.reason);
    }
    
    if (emailResult.status === 'fulfilled') {
      message += 'Email ✅';
    } else {
      message += 'Email ❌';
      console.error('Email failed:', emailResult.reason);
    }

    return NextResponse.json({ 
      success: true, 
      message,
      debug: {
        ntfy: ntfyResult.status,
        email: emailResult.status
      }
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process submission' },
      { status: 500 }
    );
  }
} 