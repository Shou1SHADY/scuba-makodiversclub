import { createClient } from '@/lib/supabase/client';

export interface Review {
    id: string;
    name: string;
    content: string;
    rating: number;
    date: string;
    avatar?: string;
    verified?: boolean;
}

export async function getFacebookReviews(): Promise<Review[]> {
    const supabase = createClient();
    try {
        const { data, error } = await supabase
            .from('reviews')
            .select('*')
            .order('date', { ascending: false });

        if (error) {
            console.warn("Supabase reviews error, using mock data:", error);
            return getMockReviews();
        }

        if (!data || data.length === 0) {
            return getMockReviews();
        }

        return data.map(r => ({
            ...r,
            id: r.id.toString(),
            verified: r.verified ?? true
        }));
    } catch (e) {
        console.error("Failed to fetch reviews:", e);
        return getMockReviews();
    }
}

function getMockReviews(): Review[] {
    return [
        {
            id: "fb_1",
            name: "Shimaa Shebl",
            content: "The most authentic, safe and fun diving experience out there! I don't think i'll ever be able to dive with anyone but mako divers club.",
            rating: 5,
            date: "2024-12-12",
            verified: true
        },
        {
            id: "fb_2",
            name: "Omar Raafat",
            content: "Highly recommended, professional and friendly team.",
            rating: 5,
            date: "2024-11-22",
            verified: true
        },
        {
            id: "fb_3",
            name: "Ahmed Elhamy",
            content: "Friendly and you gonna love the dive with them ❤️🤿.",
            rating: 5,
            date: "2024-10-05",
            verified: true
        },
        {
            id: "fb_4",
            name: "Hazem Mahmoud",
            content: "Highly recommend booking this amazing experience... the instructor was very helpful, professional & had a great level of knowledge...",
            rating: 5,
            date: "2024-09-15",
            verified: true
        },
        {
            id: "fb_5",
            name: "Mahmoud Shebl",
            content: "Thank you Mako for making Diving a hassle free sport.",
            rating: 5,
            date: "2024-08-12",
            verified: true
        },
        {
            id: "fb_6",
            name: "Omar Sameh",
            content: "It's been an experience of a lifetime going to the south...",
            rating: 5,
            date: "2024-07-22",
            verified: true
        },
        {
            id: "fb_7",
            name: "Abdullah Abo Ghanima",
            content: "I've been diving with Mako Divers for quite a while now...",
            rating: 5,
            date: "2024-06-05",
            verified: true
        },
        {
            id: "fb_8",
            name: "Youssef Ibrahim Samir",
            content: "The organisation was great and the people were super friendly, definitely will dive with them again!",
            rating: 5,
            date: "2024-05-15",
            verified: true
        }
    ];
}
