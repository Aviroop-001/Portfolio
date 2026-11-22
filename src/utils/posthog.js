import posthog from 'posthog-js';

const POSTHOG_KEY = process.env.REACT_APP_POSTHOG_KEY || 'phc_rqyaFZE7xmpDDKAxpJYzcvNo7cSDfgxpP38A9dNCHDMD';
const POSTHOG_HOST = process.env.REACT_APP_POSTHOG_HOST || 'https://us.i.posthog.com';

let isInitialized = false;

export const initPostHog = () => {
  if (isInitialized || !POSTHOG_KEY) return;

  const start = () => {
    try {
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        person_profiles: 'identified_only',
        capture_pageview: true,
        capture_pageleave: true,
        autocapture: true,
        disable_session_recording: false,
        session_recording: {
          recordCrossOriginIframes: false,
        },
      });
      isInitialized = true;
    } catch (err) {
      // Graceful error handling
    }
  };

  // Run asynchronously during browser idle time so initial FCP is never delayed
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    window.requestIdleCallback(start, { timeout: 2000 });
  } else {
    setTimeout(start, 500);
  }
};

export const trackSectionView = (sectionName) => {
  if (POSTHOG_KEY && isInitialized) {
    posthog.capture('section_viewed', { section: sectionName });
  }
};

export const trackCustomEvent = (eventName, properties = {}) => {
  if (POSTHOG_KEY && isInitialized) {
    posthog.capture(eventName, properties);
  }
};

export default posthog;
