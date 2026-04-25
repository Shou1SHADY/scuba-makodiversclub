// 2026 Safari Schedule Seed Script
// Run: node scripts/seed-safaris-2026.mjs

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://logewufqgmgxufkovpuw.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvZ2V3dWZxZ21neHVma292cHV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3NTE4OTksImV4cCI6MjA4MjMyNzg5OX0.RxqyoU3IXefl-a9XPtPiNZoxx21SzcFHuSO_h5vha0I';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const safaris2026 = [
    // ─── MINI SAFARIS ──────────────────────────────────────────────
    {
        id: 'north-expedition-eid-fitr-2026',
        title: 'North Expedition',
        route: 'Thistlegorm & Ras Muhammad',
        yacht: 'HH II',
        dates: '18 – 21 March 2026 (Eid El-Fitr)',
        port: 'Hurghada',
        type: 'Mini Safari',
        status: 'Limited Spots',
        itinerary: [
            { day: 'Day 1 – 18 March', activities: ['Yacht check-in 6 pm', 'Dinner & gear setup'] },
            { day: 'Day 2 – 19 March', activities: ['Check dive', 'Giannis D wreck', 'Thistlegorm night dive'] },
            { day: 'Day 3 – 20 March', activities: ['Thistlegorm day dive', 'Ras Muhammad dives'] },
            { day: 'Day 4 – 21 March', activities: ['Morning dive', 'Check-out & transfer'] }
        ],
        included: ['Full-board accommodation', 'Three meals daily', 'Guided dives', 'Tanks & weights', 'Mako giveaways'],
        not_included: ['Equipment rental', '15 L tank or Nitrox', 'Crew gratuity'],
        price: '',
        early_bird: ''
    },
    {
        id: 'sharks-wrecks-eid-adha-2026',
        title: 'Sharks & Wrecks',
        route: "Brothers' Islands & Salem Express",
        yacht: 'HH I',
        dates: '26 – 30 May 2026 (Eid El-Adha)',
        port: 'Hurghada',
        type: 'Mini Safari',
        status: 'Early Bird Open',
        itinerary: [
            { day: 'Route', activities: ['Big Brother Island', 'Little Brother Island', 'Salem Express wreck', 'Elphinstone Reef'] }
        ],
        included: ['Full-board accommodation', 'Three meals daily', 'Guided dives', 'Tanks & weights'],
        not_included: ['Equipment rental', 'Nitrox', 'Crew gratuity'],
        price: '',
        early_bird: ''
    },
    {
        id: 'daedalus-mini-july-2026',
        title: 'Daedalus Mini',
        route: 'Daedalus & Elphinstone',
        yacht: 'HH II',
        dates: '18 – 22 July 2026 (Long Weekend)',
        port: 'Marsa Alam',
        type: 'Mini Safari',
        status: 'Limited Spots',
        itinerary: [{ day: 'Route', activities: ['Daedalus Reef (Sharks & Pelagics)', 'Elphinstone Reef', 'Min 8 Dives'] }],
        included: ['Full-board accommodation', 'Guided dives', 'Tanks & weights'],
        not_included: ['Equipment rental', 'Nitrox', 'Crew gratuity'],
        price: '',
        early_bird: ''
    },
    {
        id: 'brothers-mini-aug-2026',
        title: "Brothers' Mini",
        route: "Brothers' Islands & Elphinstone",
        yacht: 'HH II',
        dates: '26 – 29 Aug 2026 (Long Weekend)',
        port: 'Marsa Alam',
        type: 'Mini Safari',
        status: 'Limited Spots',
        itinerary: [{ day: 'Route', activities: ['Big Brother Island', 'Little Brother Island', 'Elphinstone Reef'] }],
        included: ['Full-board accommodation', 'Guided dives', 'Tanks & weights'],
        not_included: ['Equipment rental', 'Nitrox', 'Crew gratuity'],
        price: '',
        early_bird: ''
    },
    {
        id: 'daedalus-mini-nov-2026',
        title: 'Daedalus Mini',
        route: 'Daedalus & Elphinstone',
        yacht: 'HH II',
        dates: '04 – 07 November 2026',
        port: 'Marsa Alam',
        type: 'Mini Safari',
        status: 'Booking Now',
        itinerary: [{ day: 'Route', activities: ['Daedalus Reef (Sharks & Pelagics)', 'Elphinstone Reef', 'Min 8 Dives'] }],
        included: ['Full-board accommodation', 'Guided dives', 'Tanks & weights'],
        not_included: ['Equipment rental', 'Nitrox', 'Crew gratuity'],
        price: '',
        early_bird: ''
    },
    {
        id: 'mini-wrecks-dec-2026',
        title: 'Mini Wrecks',
        route: 'Thistlegorm, Ras Muhammad & Abu Nahas',
        yacht: 'HH II',
        dates: '16 – 19 December 2026',
        port: 'Hurghada',
        type: 'Mini Safari',
        status: 'Booking Now',
        itinerary: [{ day: 'Route', activities: ['SS Thistlegorm', 'Ras Muhammad National Park', 'Abu Nahas Wrecks'] }],
        included: ['Full-board accommodation', 'Guided dives', 'Tanks & weights'],
        not_included: ['Equipment rental', 'Nitrox', 'Crew gratuity'],
        price: '',
        early_bird: ''
    },

    // ─── FULL LIVEABOARDS ──────────────────────────────────────────
    {
        id: 'deep-south-2026',
        title: 'Deep South Expedition',
        route: "Deep South (St. John's & Zabargad)",
        yacht: 'HH II',
        dates: '30 May – 06 June 2026',
        port: 'Port Ghalib',
        type: 'Full Liveaboard',
        status: 'Early Bird Open',
        itinerary: [
            { day: 'Day 1', activities: ['Check-in & General Briefing'] },
            { day: 'Day 2', activities: ['Shaab Marsa Alam', 'Shaab Sharm'] },
            { day: 'Day 3', activities: ['Zabargad Island (x3)', 'Night dive'] },
            { day: 'Day 4', activities: ["Saint John's Reef (x3)"] },
            { day: 'Day 5', activities: ["Saint John's Reef (x3)", 'Night Dive'] },
            { day: 'Day 6', activities: ['Sataya (Dolphin Reef x3)', 'Night dive'] },
            { day: 'Day 7', activities: ['Wadi El Gemal', 'Marsa Alam'] },
            { day: 'Day 8', activities: ['Breakfast & Check out'] }
        ],
        included: ['Full-board accommodation', 'All meals & beverages', 'Guided dives', 'Tanks & weights'],
        not_included: ['Equipment rental', 'Nitrox', 'Crew gratuity'],
        price: '',
        early_bird: ''
    },
    {
        id: 'bde-july-2026',
        title: 'BDE Expedition',
        route: 'Brothers, Daedalus & Elphinstone',
        yacht: 'HH II',
        dates: '11 – 18 July 2026',
        port: 'Hurghada',
        type: 'Full Liveaboard',
        status: 'Booking Now',
        itinerary: [
            { day: 'Route', activities: ['Big Brother Island', 'Little Brother Island', 'Daedalus Reef', 'Elphinstone Reef'] }
        ],
        included: ['Full-board accommodation', 'All meals', 'Guided dives', 'Tanks & weights'],
        not_included: ['Equipment rental', 'Nitrox', 'Crew gratuity'],
        price: '',
        early_bird: ''
    },
    {
        id: 'bde-sep-2026',
        title: 'BDE Expedition',
        route: 'Brothers, Daedalus & Elphinstone',
        yacht: 'HH II',
        dates: '18 – 26 September 2026',
        port: 'Hurghada',
        type: 'Full Liveaboard',
        status: 'Booking Now',
        itinerary: [
            { day: 'Route', activities: ['Big Brother Island', 'Little Brother Island', 'Daedalus Reef', 'Elphinstone Reef'] }
        ],
        included: ['Full-board accommodation', 'All meals', 'Guided dives', 'Tanks & weights'],
        not_included: ['Equipment rental', 'Nitrox', 'Crew gratuity'],
        price: '',
        early_bird: ''
    },
    {
        id: 'deep-south-daedalus-2026',
        title: 'Deep South & Daedalus',
        route: 'Deep South & Daedalus',
        yacht: 'HH II',
        dates: '26 Sep – 03 Oct 2026',
        port: 'Port Ghalib',
        type: 'Full Liveaboard',
        status: 'Booking Now',
        itinerary: [{ day: 'Route', activities: ['Shaab Sharm', 'Daedalus Reef', 'Rocky Island', 'Sataya (Dolphin Reef)'] }],
        included: ['Full-board accommodation', 'All meals', 'Guided dives', 'Tanks & weights'],
        not_included: ['Equipment rental', 'Nitrox', 'Crew gratuity'],
        price: '',
        early_bird: ''
    },
    {
        id: 'bde-oct-2026',
        title: 'BDE Expedition',
        route: 'Brothers, Daedalus & Elphinstone',
        yacht: 'HH II',
        dates: '24 – 31 October 2026',
        port: 'Hurghada',
        type: 'Full Liveaboard',
        status: 'Booking Now',
        itinerary: [
            { day: 'Route', activities: ['Big Brother Island', 'Little Brother Island', 'Daedalus Reef', 'Elphinstone Reef'] }
        ],
        included: ['Full-board accommodation', 'All meals', 'Guided dives', 'Tanks & weights'],
        not_included: ['Equipment rental', 'Nitrox', 'Crew gratuity'],
        price: '',
        early_bird: ''
    },
    {
        id: 'bde-nov-2026',
        title: 'BDE Expedition',
        route: 'Brothers, Daedalus & Elphinstone',
        yacht: 'HH II',
        dates: '14 – 21 November 2026',
        port: 'Hurghada',
        type: 'Full Liveaboard',
        status: 'Booking Now',
        itinerary: [
            { day: 'Route', activities: ['Big Brother Island', 'Little Brother Island', 'Daedalus Reef', 'Elphinstone Reef'] }
        ],
        included: ['Full-board accommodation', 'All meals', 'Guided dives', 'Tanks & weights'],
        not_included: ['Equipment rental', 'Nitrox', 'Crew gratuity'],
        price: '',
        early_bird: ''
    },
    {
        id: 'new-years-eve-2026',
        title: "New Year's Eve Expedition",
        route: 'North Wrecks & Tiran',
        yacht: 'HH II',
        dates: '26 Dec 2026 – 02 Jan 2027',
        port: 'Hurghada',
        type: 'Full Liveaboard',
        status: 'Holiday Special',
        itinerary: [{ day: 'Route', activities: ["New Year's Eve celebration at sea", 'SS Thistlegorm', 'Ras Muhammad', 'Straits of Tiran'] }],
        included: ["New Year's Gala Dinner", 'Full-board accommodation', 'Guided dives', 'Tanks & weights'],
        not_included: ['Equipment rental', 'Nitrox', 'Crew gratuity'],
        price: '',
        early_bird: ''
    }
];

async function seed() {
    console.log('🌊 Mako Divers Club — 2026 Safari Seed Script\n');

    // 1. Delete all existing safari records
    console.log('🗑️  Clearing existing safari records...');
    const { error: deleteError } = await supabase.from('safaris').delete().gt('created_at', '2000-01-01');
    if (deleteError) {
        console.error('❌ Failed to clear safaris:', deleteError.message);
        process.exit(1);
    }
    console.log('   ✓ Cleared successfully\n');

    // 2. Insert new 2026 schedule
    console.log(`📅 Inserting ${safaris2026.length} 2026 safari entries...`);
    const safarisToInsert = safaris2026.map(({ id, ...rest }) => rest);
    const { data, error: insertError } = await supabase.from('safaris').insert(safarisToInsert).select();
    if (insertError) {
        console.error('❌ Insert failed:', insertError.message);
        process.exit(1);
    }

    console.log(`   ✓ Inserted ${data.length} records\n`);
    console.log('🦈 Breakdown:');
    console.log(`   Mini Safaris    : ${safaris2026.filter(s => s.type === 'Mini Safari').length}`);
    console.log(`   Full Liveaboards: ${safaris2026.filter(s => s.type === 'Full Liveaboard').length}`);
    console.log('\n✅ Database seeded with 2026 schedule. The Mako Way is ready! 🚀\n');
}

seed();
