// This file simulates a data fetch from a headless CMS.
export const CMS_DATA = {
    announcements: [
        "Sed ut perspiciatis",
        "At vero eos et accusamus",
        "Temporibus autem quibusdam",
    ],
    navLinks: [
        "Home", 
        "About Us", 
        {
            title: "Play",
            subLinks: [
                "Booking",
                "Program Schedule", 
                "Training Programs",
                "Free Pickleball Intro"
            ]
        },
        "Group Bookings", 
        "Partnerships",
        { type: "dynamic", source: "locations", title: "Locations" },
        "Events"
    ],
    hero: {
        title: "Welcome to the Heart of Pickleball",
        subtitle: "The premier destination for players of all levels in our community.",
        cta: "Book a Court",
    },
    whatIsPicktopia: {
        title: "What is Picktopia?",
        subtitle: "Picktopia is more than just a place to play; it's a community built around the love of pickleball. We offer top-tier facilities, expert coaching, and a welcoming atmosphere for everyone.",
        features: [
            { title: "Inclusive & Social Environment", content: "From beginner clinics to competitive leagues, we foster a community where everyone feels welcome." },
            { title: "8 Pro-Level Courts", content: "Our state-of-the-art courts are designed for optimal play and are meticulously maintained." },
            { title: "Top-Notch Gear & Amenities", content: "Visit our pro-shop for the latest paddles and gear. Relax in our lounge after a great game." },
        ]
    },
    faq: {
        title: "What are you waiting for?",
        questions: [
            { q: "How do I become a member?", a: "You can sign up online through our 'Membership' page or visit us in person. We have several flexible plans to choose from." },
            { q: "Can I book a court without a membership?", a: "Yes, non-members can book courts up to 3 days in advance. Members enjoy a 14-day booking window and discounted rates." },
            { q: "Do you offer lessons for beginners?", a: "Absolutely! We have introductory clinics and private lessons available with our certified instructors. Check the 'Play' section for schedules." },
            { q: "What is your guest policy?", a: "Members are welcome to bring guests. A guest fee applies. Please check in at the front desk upon arrival." },
            { q: "Are there leagues or tournaments?", a: "Yes, we run seasonal leagues and regular tournaments for various skill levels. Keep an eye on our announcements and events calendar." },
        ],
    },
    blog: {
        title: "Latest Blog Posts",
        posts: [
            { title: "Mastering the Third Shot Drop", image: `https://placehold.co/600x400/1C275F/e1672a?text=Pickleball+Tip` },
            { title: "Pickleball & Fitness: A Perfect Match", image: `https://placehold.co/600x400/1C275F/e1672a?text=Health+%26+Wellness` },
            { title: "Community Spotlight: Member of the Month", image: `https://placehold.co/600x400/1C275F/e1672a?text=Community` },
        ]
    },
    newsletter: {
        title: "SUBSCRIBE TO OUR EMAILS",
        subtitle: "Be the first to know about news, events, and special offers."
    },
    footer: {
        description: "The premier destination for players of all levels in our community.",
        quickLinks: ["About Us", "Locations", "Group Bookings", "Partnerships", "Policies"],
        contact: {
            address: "3595 St Clair Ave E Unit B2, Scarborough, ON M1K 1L8",
            email: "info@rallypicktopia.com",
            phone: "(647) 478-9866"
        }
    }
};