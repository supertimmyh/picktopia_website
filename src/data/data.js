// This file contains Lorem Ipsum dummy data for fallback when actual data fails to load.
export const CMS_DATA = {
    announcements: [
        "Lorem ipsum dolor sit amet",
        "Consectetur adipiscing elit",
        "Sed do eiusmod tempor incididunt",
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
        "Locations",
        "Events"
    ],
    hero: {
        title: "Lorem Ipsum Dolor Sit Amet",
        subtitle: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        cta: "Lorem Button",
    },
    whatIsPicktopia: {
        title: "Quid Est Lorem Ipsum?",
        subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
        features: [
            { title: "Lorem Ipsum Feature", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore." },
            { title: "Consectetur Adipiscing", content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud." },
            { title: "Tempor Incididunt", content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." },
        ]
    },
    faq: {
        title: "Lorem Ipsum Questions?",
        questions: [
            { q: "Lorem ipsum dolor sit amet?", a: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
            { q: "Ut enim ad minim veniam?", a: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
            { q: "Duis aute irure dolor?", a: "In reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." },
            { q: "Excepteur sint occaecat?", a: "Cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
            { q: "Sed ut perspiciatis unde?", a: "Omnis iste natus error sit voluptatem accusantium doloremque laudantium." },
        ],
    },
    blog: {
        title: "Lorem Ipsum Blog Posts",
        posts: [
            { title: "Lorem Ipsum Dolor Sit", image: `https://placehold.co/600x400/1C275F/e1672a?text=Lorem+Ipsum` },
            { title: "Consectetur Adipiscing Elit", image: `https://placehold.co/600x400/1C275F/e1672a?text=Dolor+Sit` },
            { title: "Sed Do Eiusmod Tempor", image: `https://placehold.co/600x400/1C275F/e1672a?text=Incididunt` },
        ]
    },
    newsletter: {
        title: "LOREM IPSUM NEWSLETTER",
        subtitle: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt."
    },
    footer: {
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.",
        quickLinks: ["Lorem Ipsum", "Dolor Sit", "Consectetur", "Adipiscing", "Eiusmod"],
        contact: {
            address: "123 Lorem Street, Ipsum City, LI 12345",
            email: "lorem@ipsum.com",
            phone: "(555) 123-4567"
        }
    }
};