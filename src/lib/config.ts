// Mako Divers Club - Site Configuration
// Update this file to configure site-wide settings

export const siteConfig = {
  name: "Mako Divers Club",
  description: "Experience world-class scuba diving in Egypt's Red Sea",

  // Google Form URL for bookings
  // Replace this with your actual Google Form URL
  // The form should collect: name, phone, email, date, course/trip selection, notes
  bookingFormUrl: "https://docs.google.com/forms/d/1pteJi3bPp7gppozujR8LJOHdBNIQNnk_PBBGqdRv-CQ/preview",

  // Contact information
  contact: {
    phone: "+20 123 456 7890",
    email: "info@makodivers.club",
    whatsapp: "+201234567890",
  },

  // Social media links
  social: {
    instagram: "https://www.instagram.com/makodiversclub?igsh=em15Ym1lOHJ0YTBn",
    facebook: "https://web.facebook.com/MAKODIVERSCLUB/",
  },

  // Locations
  locations: ["Hurghada", "Dahab", "Sharm El-Sheikh"],
};

export const GOOGLE_FORM_URL = siteConfig.bookingFormUrl;
