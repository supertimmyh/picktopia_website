import React from 'react';
import ContentTile from '../ContentTile';
import BookingButton from '../BookingButton';

const ProgramScheduleSection = ({ content }) => {
    const scheduleData = [
        {
            day: "Monday",
            slots: ["Open Play", "Beginner Drills", "Intermediate Clinic", "Competitive League"]
        },
        {
            day: "Tuesday", 
            slots: ["Open Play", "Senior Play", "Open Play", "Advanced Drills"]
        },
        {
            day: "Wednesday",
            slots: ["Morning Mixers", "Open Play", "Youth Program", "Social Play Night"]
        },
        {
            day: "Thursday",
            slots: ["Open Play", "Intermediate Drills", "Open Play", "King/Queen of the Court"]
        },
        {
            day: "Friday",
            slots: ["Cardio Pickleball", "Open Play", "Beginner Clinic", "Friday Night Lights"]
        },
        {
            day: "Saturday",
            slots: ["Open Play", "Weekend Warriors", "Family Play", "Open Play"]
        },
        {
            day: "Sunday",
            slots: ["Open Play", "Sunday Social", "Open Play", "Competitive Play"]
        }
    ];

    const timeSlots = ["8:00-10:00 AM", "10:00 AM-12:00 PM", "4:00-6:00 PM", "6:00-8:00 PM"];

    const handleBooking = () => {
        if (content?.bookingUrl) {
            window.open(content.bookingUrl, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <ContentTile
            title={content?.title || "Program Schedule"}
            subtitle={content?.subtitle || "Join our vibrant community with a variety of programs designed for all skill levels."}
        >
            <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-gray-300 text-sm">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 bg-picktopia-blue-dark text-white px-3 py-2 text-left font-semibold font-heading">
                                Day
                            </th>
                            {timeSlots.map((time, index) => (
                                <th 
                                    key={index}
                                    className="border border-gray-300 bg-picktopia-blue-dark text-white px-3 py-2 text-center font-semibold font-heading text-xs md:text-sm"
                                >
                                    {time}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {scheduleData.map((dayData, dayIndex) => (
                            <tr key={dayIndex} className={dayIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                <td className="border border-gray-300 px-3 py-2 font-bold text-picktopia-blue-dark font-heading">
                                    {dayData.day}
                                </td>
                                {dayData.slots.map((activity, slotIndex) => (
                                    <td 
                                        key={slotIndex}
                                        className="border border-gray-300 px-3 py-2 text-center font-body hover:bg-picktopia-orange/10 transition-colors duration-200"
                                    >
                                        {activity}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-6">
                <BookingButton 
                    text={content?.bookingText || "Join Programs"}
                    onClick={handleBooking}
                />
            </div>
        </ContentTile>
    );
};

export default ProgramScheduleSection;