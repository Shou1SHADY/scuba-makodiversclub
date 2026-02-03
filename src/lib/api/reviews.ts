// Mako Divers Club - Facebook Reviews Integration Logic

export interface Review {
    id: string;
    name: string;
    content: string;
    rating: number;
    date: string;
    avatar?: string;
    verified?: boolean;
}

/**
 * FETCHING REAL FB REVIEWS:
 * To enable true live sync, replace the mock data below with a fetch to your backend or FB Graph API.
 * API Endpoint: https://graph.facebook.com/v19.0/{page-id}/ratings?access_token={access-token}
 */

export async function getFacebookReviews(): Promise<Review[]> {
    // For production live-sync, you would use something like:
    /*
    const response = await fetch('https://your-api-endpoint/reviews');
    const data = await response.json();
    return data;
    */

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
        },
        {
            id: "fb_4",
            name: "Marina Wagdy",
            content: "The best diving club in Egypt! I finished my advanced open water with them and it was such a smooth and professional journey. The underwater photos they took were also incredible!",
            rating: 5,
            date: "2024-12-15",
            verified: true
        },
        {
            id: "fb_5",
            name: "Mostafa Elnaggar",
            content: "Fantastic organization and very friendly atmosphere. They take you to the best diving spots and ensure your safety at all times. A truly elite diving experience in the Red Sea.",
            rating: 5,
            date: "2025-01-20",
            verified: true
        },
        {
            id: "fb_6",
            name: "Sarah El-Sayed",
            content: "Perfect from start to finish. The instructors are so patient and experienced. I felt very safe even during my first deep dive. The Mako family is just wonderful.",
            rating: 5,
            date: "2025-02-01",
            verified: true
        }
    ];
}
