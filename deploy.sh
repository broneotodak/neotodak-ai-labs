#!/bin/bash

# Deploy neotodak.com to Netlify
# Make sure to save your profile photo first!

echo "🚀 Deploying neotodak.com..."

# Navigate to project directory
cd /Users/broneotodak/Projects/neotodak-ai-labs

# Check if profile photo exists
if [ ! -f "images/neo-profile.jpg" ]; then
    echo "❌ Profile photo not found!"
    echo "Please save your photo as: images/neo-profile.jpg"
    exit 1
fi

echo "✅ Profile photo found"

# Add all changes
git add .

# Commit with message
git commit -m "Add founder profile photo and About section to neotodak.com"

# Push to main branch
git push origin main

echo "✅ Successfully pushed to GitHub!"
echo "🎉 Netlify will automatically deploy your changes"
echo "Check your site in a few minutes at: https://neotodak.com"
