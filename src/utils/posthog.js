import posthog from 'posthog-js';

const POSTHOG_KEY = process.env.REACT_APP_POSTHOG_KEY;
const POSTHOG_HOST = process.env.REACT_APP_POSTHOG_HOST || 'https://us.i.posthog.com';

let isInitialized = false;

export const initPostHog = () => {
  if (isInitialized) return;
  if (!POSTHOG_KEY) {
    return;
  }

  try {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      person_profiles: 'identified_only',
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: true,
      disable_session_recording: false,
      loaded: () => {
        // Analytics active without UI blocking
      }
    });
    isInitialized = true;
  } catch (err) {
    // Graceful error handling
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
