// Training Programs page specific data - extracted from play/training-programs.md
export const trainingProgramsData = {
    title: "Training Programs",
    subtitle: "Ready to take your game to the next level? Our certified instructors are here to help you achieve your pickleball goals with personalized training and group sessions.",
    heroImage: "/images/training/training-hero.jpg",
    bookingUrl: "https://app.courtreserve.com/picktopia/training",
    bookingText: "Book Training",
    coaches: [
        {
            name: "Jose Nieto",
            title: "Head Coach",
            image: "/images/training/jose-headshot.jpeg",
            certifications: "CEO and co-founder of True North Pickleball/Padel",
            experience: "10+ years",
            specialties: ["Technical Expertise", "Player Development", "Competitive Coaching"],
            bio: "• CEO and co-founder of True North Pickleball/Padel\n• Finalist in Nationals 2022 in Calgary (A category)\n• Passionate about creating fun, engaging training environments\n• Specializes in rapid skill improvement for all levels\n• Expert in organizing clinics and tournaments",
            availability: "Available for private lessons and clinics"
        },
        {
            name: "Philip Chin",
            title: "Pickleball Pro",
            image: "/images/training/phil-headshot.jpg",
            certifications: "4.0+ Player, Tournament Official",
            experience: "10+ years",
            specialties: ["Beginner Development", "Foundation Building", "Game Strategy"],
            bio: "• 4.0+ player with 10+ years of experience\n• Winner and medalist in numerous tournaments\n• Official referee at top GTA tournaments\n• Discovered pickleball on an ocean cruise and never looked back\n• Committed to building solid foundations for new players",
            availability: "Available for all skill levels"
        }
    ],
    programs: [
        {
            title: "Private Lessons",
            duration: "60 minutes",
            description: "One-on-one instruction tailored to your specific needs and skill level.",
            features: [
                "Personalized technique analysis",
                "Custom practice drills",
                "Strategy and shot selection coaching",
                "Video analysis available"
            ],
            memberPrice: "$70",
            nonMemberPrice: "$85",
            skillLevel: "All levels",
            equipment: "Paddles and balls provided"
        },
        {
            title: "Group Clinics",
            duration: "90 minutes",
            description: "Learn and improve in a fun, social environment with players of similar skill levels.",
            features: [
                "Skill-level appropriate groups",
                "Interactive drills and games",
                "Group strategy sessions",
                "Social learning environment"
            ],
            memberPrice: "$30",
            nonMemberPrice: "$30",
            skillLevel: "Beginner, Intermediate, Advanced",
            equipment: "Paddles and balls provided"
        },
        {
            title: "Drill Sessions",
            duration: "60 minutes",
            description: "High-intensity sessions focused on repetitive drills to sharpen your skills.",
            features: [
                "Targeted skill development",
                "Muscle memory building",
                "Consistency improvement",
                "Performance tracking"
            ],
            memberPrice: "$25",
            nonMemberPrice: "$25",
            skillLevel: "Intermediate to Advanced",
            equipment: "Bring your own paddle"
        },
        {
            title: "Youth Programs",
            duration: "45 minutes",
            description: "Fun and engaging pickleball instruction designed specifically for young players.",
            features: [
                "Age-appropriate teaching methods",
                "Focus on fundamentals and fun",
                "Character building through sport",
                "Progressive skill development"
            ],
            memberPrice: "$20",
            nonMemberPrice: "$25",
            skillLevel: "Ages 8-17, all skill levels",
            equipment: "Youth paddles and low-compression balls provided"
        }
    ],
    testimonials: [
        {
            name: "Jennifer Adams",
            quote: "Sarah's private lessons transformed my game! I went from barely hitting the ball to playing in tournaments in just 6 months.",
            program: "Private Lessons",
            rating: 5
        },
        {
            name: "Robert Kim",
            quote: "The group clinics are amazing. Great way to meet other players and improve together. Mike's coaching is top-notch!",
            program: "Group Clinics",
            rating: 5
        },
        {
            name: "Maria Gonzalez",
            quote: "Lisa's patience with my daughter has been incredible. She now loves pickleball and plays with confidence.",
            program: "Youth Programs",
            rating: 5
        }
    ],
    content: `## Elevate Your Pickleball Game

Whether you're just starting out or looking to compete at the highest level, our comprehensive training programs are designed to meet you where you are and take you where you want to go. Our certified instructors bring years of experience and proven teaching methods to help you achieve your pickleball goals.`
};