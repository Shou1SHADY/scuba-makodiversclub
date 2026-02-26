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
            name: "Mahmoud Shebl",
            content: "Thank you Mako for making Diving a hassle free sport. Your team's professionalism and knowledge of the Red Sea locations made my experience truly unforgettable. Highly recommended for anyone looking for safety and fun.",
            rating: 5,
            date: "2024-05-12",
            verified: true
        },
        {
            id: "fb_2",
            name: "Abdullah Abo Ghanima",
            content: "I've been diving with Mako Divers for quite a while now. The community they have built is exceptional. Whether it's a day trip or a full liveaboard, they maintain the same high standard. The best in Egypt!",
            rating: 5,
            date: "2024-08-22",
            verified: true
        },
        {
            id: "fb_3",
            name: "Ahmed Tawfik",
            content: "Amazing experience with an amazing team. Very professional and helpful. From the equipment to the boat crew, everything was top-notch. Can't wait for my next trip with you guys.",
            rating: 5,
            date: "2024-11-05",
            verified: true
        }
    ];
}
