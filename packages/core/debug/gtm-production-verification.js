/**
 * GTM Production Verification Script
 * 
 * Paste this into your browser's developer console on any page using 
 * spectrum-cookie-compliance to diagnose GTM integration issues.
 * 
 * Usage:
 * 1. Open Developer Tools (F12)
 * 2. Go to Console tab
 * 3. Paste this entire script and press Enter
 * 4. Follow the diagnostic output
 */

(function() {
    console.log('🍪 GTM Production Verification Script v1.0');
    console.log('==============================================');
    
    const results = {
        component: null,
        gtmScript: null,
        dataLayer: null,
        gtag: null,
        consent: null,
        networkRequests: []
    };
    
    // Helper function to log results
    function logResult(test, status, details = '') {
        const emoji = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⚠️';
        console.log(`${emoji} ${test}: ${status} ${details}`);
        return status === 'PASS';
    }
    
    // Test 1: Check if component exists
    console.log('\n1. COMPONENT DETECTION');
    console.log('----------------------');
    
    const component = document.querySelector('spectrum-cookie-compliance');
    results.component = component;
    
    if (component) {
        logResult('Component Found', 'PASS', '- spectrum-cookie-compliance element exists');
        
        // Check component properties
        const gtmId = component.getAttribute('gtm-container-id') || component.gtmContainerId;
        const autoLoad = component.getAttribute('auto-load-g-t-m') || component.autoLoadGTM;
        const debug = component.getAttribute('debug') || component.debug;
        
        console.log(`   GTM Container ID: ${gtmId || 'NOT SET'}`);
        console.log(`   Auto Load GTM: ${autoLoad || 'false'}`);
        console.log(`   Debug Mode: ${debug || 'false'}`);
        
        if (!gtmId) {
            logResult('GTM Container ID', 'FAIL', '- Missing gtm-container-id attribute');
        } else if (!gtmId.startsWith('GTM-')) {
            logResult('GTM Container ID Format', 'WARN', `- "${gtmId}" doesn't look like a GTM ID (should start with GTM-)`);
        } else {
            logResult('GTM Container ID', 'PASS', `- Valid GTM ID: ${gtmId}`);
        }
        
        if (autoLoad !== 'true' && autoLoad !== true) {
            logResult('Auto Load GTM', 'WARN', '- Set auto-load-g-t-m="true" to automatically load GTM scripts');
        }
    } else {
        logResult('Component Found', 'FAIL', '- No spectrum-cookie-compliance element found on page');
        console.log('   Make sure the component is properly imported and added to the page');
        return;
    }
    
    // Test 2: Check consent status
    console.log('\n2. CONSENT STATUS');
    console.log('-----------------');
    
    component.getStoredConsent().then(consent => {
        results.consent = consent;
        
        if (!consent) {
            logResult('Stored Consent', 'WARN', '- No consent found. User needs to interact with cookie banner first.');
            console.log('   👆 Click "Accept All" or give consent through the cookie banner');
        } else {
            logResult('Stored Consent', 'PASS', `- Consent found (version: ${consent.version})`);
            console.log(`   Analytics: ${consent.analytics ? '✅' : '❌'}`);
            console.log(`   Marketing: ${consent.marketing ? '✅' : '❌'}`);
            console.log(`   Preferences: ${consent.preferences ? '✅' : '❌'}`);
            console.log(`   Timestamp: ${new Date(consent.timestamp).toLocaleString()}`);
        }
    }).catch(e => {
        logResult('Consent Check', 'FAIL', `- Error checking consent: ${e.message}`);
    });
    
    // Test 3: Check GTM script loading
    console.log('\n3. GTM SCRIPT STATUS');
    console.log('--------------------');
    
    const gtmScripts = document.querySelectorAll('script[src*="googletagmanager.com/gtm.js"]');
    results.gtmScript = gtmScripts;
    
    if (gtmScripts.length === 0) {
        logResult('GTM Script', 'FAIL', '- No GTM script found in page');
        console.log('   This is normal if consent hasn\'t been given yet');
        console.log('   Give consent first, then run this script again');
    } else {
        logResult('GTM Script', 'PASS', `- Found ${gtmScripts.length} GTM script(s)`);
        gtmScripts.forEach((script, i) => {
            console.log(`   Script ${i + 1}: ${script.src}`);
        });
    }
    
    // Test 4: Check dataLayer and gtag
    console.log('\n4. GTM INTEGRATION STATUS');
    console.log('-------------------------');
    
    if (typeof window.dataLayer !== 'undefined') {
        results.dataLayer = window.dataLayer;
        logResult('DataLayer', 'PASS', `- Found with ${window.dataLayer.length} entries`);
        
        // Show recent dataLayer entries
        const recentEntries = window.dataLayer.slice(-5);
        console.log('   Recent DataLayer entries:');
        recentEntries.forEach((entry, i) => {
            console.log(`   ${i + 1}.`, entry);
        });
    } else {
        logResult('DataLayer', 'FAIL', '- window.dataLayer not found');
    }
    
    if (typeof window.gtag === 'function') {
        results.gtag = window.gtag;
        logResult('gtag Function', 'PASS', '- gtag function available');
    } else {
        logResult('gtag Function', 'FAIL', '- gtag function not available');
    }
    
    // Test 5: Network activity
    console.log('\n5. NETWORK ACTIVITY CHECK');
    console.log('-------------------------');
    
    // Check performance entries for GTM requests
    const gtmRequests = performance.getEntriesByType('resource').filter(entry => 
        entry.name.includes('googletagmanager.com') || entry.name.includes('google-analytics.com')
    );
    
    if (gtmRequests.length > 0) {
        logResult('GTM Network Requests', 'PASS', `- Found ${gtmRequests.length} GTM-related network requests`);
        gtmRequests.forEach(request => {
            console.log(`   ${request.name} (${request.duration.toFixed(2)}ms)`);
        });
    } else {
        logResult('GTM Network Requests', 'WARN', '- No GTM network requests found');
        console.log('   This could mean GTM hasn\'t loaded yet or consent wasn\'t given');
    }
    
    // Test 6: Content Security Policy check
    console.log('\n6. SECURITY POLICY CHECK');
    console.log('------------------------');
    
    // Check for CSP headers that might block GTM
    const metaCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (metaCSP) {
        const cspContent = metaCSP.getAttribute('content');
        if (cspContent.includes('googletagmanager.com') || cspContent.includes("'unsafe-inline'") || cspContent.includes('*')) {
            logResult('CSP Policy', 'PASS', '- GTM allowed by Content Security Policy');
        } else {
            logResult('CSP Policy', 'WARN', '- CSP found but may block GTM scripts');
            console.log(`   CSP: ${cspContent}`);
        }
    } else {
        logResult('CSP Policy', 'PASS', '- No restrictive CSP found');
    }
    
    // Test 7: Ad Blocker detection
    console.log('\n7. AD BLOCKER DETECTION');
    console.log('-----------------------');
    
    // Simple ad blocker test
    const testDiv = document.createElement('div');
    testDiv.innerHTML = '&nbsp;';
    testDiv.className = 'adsbox';
    document.body.appendChild(testDiv);
    
    setTimeout(() => {
        if (testDiv.offsetHeight === 0) {
            logResult('Ad Blocker', 'WARN', '- Ad blocker detected - may block GTM');
            console.log('   Ad blockers can prevent GTM from loading');
        } else {
            logResult('Ad Blocker', 'PASS', '- No ad blocker interference detected');
        }
        document.body.removeChild(testDiv);
    }, 100);
    
    // Summary and recommendations
    console.log('\n8. SUMMARY & NEXT STEPS');
    console.log('=======================');
    
    setTimeout(() => {
        console.log('\nBased on the results above:');
        
        // Component issues
        if (!results.component) {
            console.log('❌ CRITICAL: Add spectrum-cookie-compliance component to your page');
        }
        
        // Configuration issues
        const gtmId = results.component?.getAttribute('gtm-container-id') || results.component?.gtmContainerId;
        if (!gtmId) {
            console.log('❌ CRITICAL: Set gtm-container-id attribute on the component');
            console.log('   Example: <spectrum-cookie-compliance gtm-container-id="GTM-XXXXXXX">');
        }
        
        // Consent issues
        if (!results.consent) {
            console.log('⚠️  ACTION NEEDED: Give consent through the cookie banner');
            console.log('   - The cookie banner should appear on first visit');
            console.log('   - Click "Accept All" or customize your preferences');
            console.log('   - GTM will only load after consent is given (GDPR compliance)');
        }
        
        // Success case
        if (results.gtmScript && results.gtmScript.length > 0 && results.dataLayer && results.gtag) {
            console.log('✅ SUCCESS: GTM integration appears to be working correctly!');
            console.log('   - Test events are being tracked');
            console.log('   - Check your GTM dashboard for incoming data');
        }
        
        console.log('\n📞 Need more help?');
        console.log('   1. Enable debug mode: add debug="true" to your component');
        console.log('   2. Check browser network tab for failed requests');
        console.log('   3. Verify your GTM container ID in GTM dashboard');
        console.log('   4. Test in incognito mode to avoid browser cache issues');
        
        // Store results globally for further inspection
        window.gtmVerificationResults = results;
        console.log('\n💾 Results stored in: window.gtmVerificationResults');
        
    }, 500);
})();

// Additional helper functions
console.log('\n🔧 HELPER FUNCTIONS AVAILABLE:');
console.log('==============================');

window.showGTMStatus = function() {
    console.log('Current GTM Status:');
    console.log('- dataLayer entries:', window.dataLayer ? window.dataLayer.length : 'not found');
    console.log('- gtag available:', typeof window.gtag);
    console.log('- GTM scripts:', document.querySelectorAll('script[src*="googletagmanager.com"]').length);
};

window.testGTMEvent = function() {
    if (typeof window.gtag === 'function') {
        window.gtag('event', 'test_debug_event', {
            custom_parameter: 'verification_script',
            timestamp: Date.now()
        });
        console.log('✅ Test event sent to GTM');
    } else {
        console.log('❌ gtag function not available');
    }
};

window.resetCookieConsent = function() {
    const component = document.querySelector('spectrum-cookie-compliance');
    if (component && component.resetConsent) {
        component.resetConsent();
        console.log('✅ Cookie consent reset - refresh page to see banner again');
    } else {
        console.log('❌ Component or resetConsent method not found');
    }
};

console.log('Use: showGTMStatus(), testGTMEvent(), resetCookieConsent()');






