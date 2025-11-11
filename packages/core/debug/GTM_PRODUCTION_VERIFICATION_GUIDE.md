# GTM Production Verification Guide

## 🔍 Quick Diagnosis

**Having trouble seeing GTM working in production?** Follow this step-by-step guide to diagnose and fix common issues.

## 📋 Pre-Flight Checklist

### 1. Component Configuration ✅

Ensure your component is properly configured:

```html
<spectrum-cookie-compliance
  gtm-container-id="GTM-XXXXXXX"
  auto-load-g-t-m="true"
  debug="true"
  show-details="true"
  show-on-first-visit="true">
</spectrum-cookie-compliance>
```

**Key Attributes:**
- `gtm-container-id`: Your actual GTM container ID (format: GTM-XXXXXXX)
- `auto-load-g-t-m="true"`: Automatically loads GTM scripts when consent is given
- `debug="true"`: Enables detailed console logging for troubleshooting

### 2. GTM Container ID Verification ✅

- Go to [Google Tag Manager](https://tagmanager.google.com/)
- Select your container
- Copy the Container ID from the workspace (format: GTM-XXXXXXX)
- **Common mistake**: Using Google Analytics ID (GA-XXXXXXX) instead of GTM ID

## 🕵️ Diagnostic Steps

### Step 1: Use the Verification Script

1. Open your website in Chrome/Firefox
2. Open Developer Tools (F12) → Console tab
3. Copy and paste the entire verification script from `debug/gtm-production-verification.js`
4. Press Enter and review the results

The script will check:
- Component presence and configuration
- Consent status
- GTM script loading
- DataLayer initialization  
- Network requests
- Security policies
- Ad blocker interference

### Step 2: Check Consent Status

**🚨 MOST COMMON ISSUE**: GTM won't load until user gives consent

1. Clear your browser cookies and cache
2. Visit your site in incognito/private mode
3. You should see the cookie consent banner
4. Click "Accept All" or give analytics consent
5. Check if GTM loads after consent

### Step 3: Network Tab Investigation

1. Open Developer Tools → Network tab
2. Filter by "googletagmanager"
3. Give consent through cookie banner
4. Look for these requests:
   - `gtm.js?id=GTM-XXXXXXX` (main GTM script)
   - `gtag/js?id=G-XXXXXXX` (Google Analytics if configured)

### Step 4: Console Logging

With `debug="true"`, you should see logs like:
```
🍪 [Cookie-Compliance] Accept All clicked
🍪 [Cookie-Compliance] Initializing GTM basics...
🍪 [Cookie-Compliance] GTM script loaded successfully: GTM-XXXXXXX
🍪 [Cookie-Compliance] Pushed consent update to dataLayer
```

## 🐛 Common Issues & Solutions

### Issue 1: "No GTM script found"

**Causes:**
- No consent given yet (GDPR compliance working correctly)
- `auto-load-g-t-m` not set to `true`
- Wrong GTM container ID
- CSP blocking scripts

**Solutions:**
1. Give consent through cookie banner first
2. Set `auto-load-g-t-m="true"` on component
3. Verify GTM container ID format (GTM-XXXXXXX)
4. Check Content Security Policy headers

### Issue 2: "dataLayer not found"

**Causes:**
- Component not initialized
- Consent not given
- JavaScript errors preventing initialization

**Solutions:**
1. Check browser console for JavaScript errors
2. Ensure component is properly loaded
3. Give consent to initialize GTM

### Issue 3: "Component not found"

**Causes:**
- Component not imported
- Build system not including Spectrum components
- Timing issues with component loading

**Solutions:**
1. Verify Spectrum components are imported in your project
2. Check component registration in framework (React/Angular/Vue)
3. Ensure component scripts are loaded before use

### Issue 4: Ad Blockers

**Symptoms:**
- GTM scripts blocked by ad blockers
- Network requests to googletagmanager.com fail

**Solutions:**
1. Test in incognito mode
2. Temporarily disable ad blockers
3. Check with users about ad blocker usage
4. Consider server-side tagging (advanced)

### Issue 5: Content Security Policy (CSP)

**Symptoms:**
- "Refused to load script" errors in console
- GTM scripts blocked by CSP headers

**Solutions:**
Add to CSP header:
```
script-src 'self' 'unsafe-inline' *.googletagmanager.com *.google-analytics.com;
```

## 🧪 Testing Scenarios

### Scenario 1: First-Time Visitor
1. Clear cookies and site data
2. Visit site in incognito mode
3. Cookie banner should appear
4. Accept consent → GTM should load

### Scenario 2: Returning Visitor with Consent
1. Normal browser with existing consent
2. GTM should load immediately
3. No cookie banner should appear

### Scenario 3: Returning Visitor without Consent
1. Reset consent using verification script
2. Refresh page
3. Cookie banner should reappear

## 📊 GTM Dashboard Verification

After GTM loads successfully:

1. Go to GTM → Preview mode
2. Visit your website
3. GTM Preview should detect your site
4. Check "Data Layer" tab for events:
   - `consent_update`
   - `gtm.js`
   - `gtm.dom`
   - `gtm.load`

## 🔧 Debug Commands

After running the verification script, use these console commands:

```javascript
// Check current GTM status
showGTMStatus()

// Send a test event to GTM
testGTMEvent()

// Reset consent (forces banner to show again)
resetCookieConsent()

// Manual consent check
document.querySelector('spectrum-cookie-compliance').getStoredConsent()

// Force GTM initialization (if consent exists)
document.querySelector('spectrum-cookie-compliance').updateConsent({
  analytics: true,
  marketing: true, 
  preferences: true
})
```

## 🌍 Environment-Specific Considerations

### Development
- Use test GTM container
- Enable debug mode
- Test with different browsers

### Staging
- Use staging GTM container
- Test with production-like data
- Verify with stakeholders

### Production
- Use production GTM container
- Monitor real user behavior
- Check analytics data flow

## 📞 Still Having Issues?

### Quick Debugging Checklist:
- [ ] Component properly configured with correct GTM ID
- [ ] `auto-load-g-t-m="true"` set
- [ ] User has given consent through cookie banner
- [ ] No JavaScript errors in console
- [ ] No CSP blocking GTM scripts
- [ ] No ad blockers interfering
- [ ] GTM container is active and published

### Advanced Debugging:
1. Enable `debug="true"` on component
2. Use the verification script
3. Check GTM Preview mode
4. Monitor network requests
5. Test in multiple browsers/incognito

### Need Help?
Run the verification script and share:
- The console output
- Your GTM container ID
- Your component configuration
- Any error messages from console/network tabs

The verification script provides comprehensive diagnostics to identify exactly what's preventing GTM from working in your environment.






