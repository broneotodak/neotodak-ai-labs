# Google Analytics Data API Integration

## 🎯 Overview

Your analytics dashboard at `/analytics` is currently showing **mock data**. This guide will help you set up real Google Analytics Data API integration to show actual data from your GA4 property.

## 🔧 Current Status

- ✅ **Google Analytics Tracking**: Working (sending data to GA)
- ❌ **Google Analytics Reporting**: Not configured (fetching data from GA)
- ⚠️  **Dashboard**: Currently shows mock/random data

## 📋 Setup Requirements

### 1. Install Required Dependencies

The following packages need to be installed:

```bash
npm install @google-analytics/data google-auth-library
```

### 2. Google Cloud Console Setup

1. **Create a Google Cloud Project** (if you don't have one):
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one

2. **Enable Google Analytics Data API**:
   - Go to APIs & Services > Library
   - Search for "Google Analytics Data API"
   - Click "Enable"

3. **Create a Service Account**:
   - Go to APIs & Services > Credentials
   - Click "Create Credentials" > "Service Account"
   - Name it something like "analytics-reader"
   - Grant it the "Viewer" role

4. **Generate Service Account Key**:
   - Click on your service account
   - Go to "Keys" tab
   - Click "Add Key" > "Create New Key"
   - Choose JSON format
   - Download the key file

### 3. Google Analytics Setup

1. **Get Your Property ID**:
   - Go to [Google Analytics](https://analytics.google.com/)
   - Go to Admin > Property Settings
   - Copy your "Property ID" (looks like: 123456789)

2. **Grant Access to Service Account**:
   - In Google Analytics, go to Admin > Property Access Management
   - Click "+" to add user
   - Add your service account email (from the JSON key file)
   - Grant "Viewer" permissions

### 4. Environment Variables

Add these environment variables to your deployment (Netlify):

```env
# Google Analytics Data API Configuration
GA4_PROPERTY_ID=your_property_id_here
GA4_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"your-project",...}

# Existing Analytics Configuration (keep these)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ANALYTICS_ENABLED=true
```

**Important**: The `GA4_SERVICE_ACCOUNT_KEY` should be the entire JSON content of your downloaded service account key file, minified into a single line.

## 🚀 Expected Results

Once configured, your analytics dashboard will show:

- **Real page views** from Google Analytics
- **Actual unique visitors** count
- **True project click data** from custom events
- **Real contact attempts** tracking
- **Accurate daily views** charts
- **Live device breakdown** (mobile/desktop/tablet)

## 🔍 Troubleshooting

### Mock Data Warning

If you see a yellow warning box saying "Mock Data Warning", it means:

1. The Google Analytics API credentials are missing or invalid
2. The API is not properly configured
3. There's a network issue connecting to Google Analytics

### Common Issues

1. **"Analytics credentials not configured"**:
   - Check that `GA4_PROPERTY_ID` and `GA4_SERVICE_ACCOUNT_KEY` are set

2. **"Failed to fetch analytics data"**:
   - Verify the service account has access to your GA4 property
   - Check that the Google Analytics Data API is enabled
   - Ensure the property ID is correct

3. **Empty data**:
   - Your site might not have enough traffic yet
   - Check the date range (try 30 days instead of 7 days)
   - Verify that tracking is working in your GA4 dashboard

## 📊 Data Mapping

The API fetches these metrics from Google Analytics:

| Dashboard Metric | GA4 Metric | Description |
|------------------|------------|-------------|
| Page Views | `screenPageViews` | Total page views |
| Unique Visitors | `totalUsers` | Unique users in time period |
| Avg Time on Site | `averageSessionDuration` | Session duration in seconds |
| Project Clicks | Custom event `click_project` | Tracked project interactions |
| Contact Attempts | Custom event `contact_attempt` | Contact form submissions |
| Daily Views | `screenPageViews` by date | Page views per day |
| Device Types | `deviceCategory` | Mobile/Desktop/Tablet breakdown |

## 🎉 Testing

1. **Deploy the changes** to Netlify
2. **Add environment variables** in Netlify dashboard
3. **Visit** `/analytics` page
4. **Look for**:
   - No yellow warning box
   - "Live Data" indicator in Quick Actions
   - Realistic numbers that match your GA4 dashboard

## 📝 Next Steps

1. Install the npm packages
2. Set up Google Cloud Console and Service Account
3. Configure environment variables in Netlify
4. Test the integration
5. Monitor for any API quota limits (free tier: 100,000 requests/day)

---

**🧠 Once configured, your analytics dashboard will show real data that matches your Google Analytics dashboard!** 