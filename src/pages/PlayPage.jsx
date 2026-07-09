import React from 'react';
import { ArrowRight, Building2, CalendarDays, ClipboardList, Download, Users } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import EventPackagesSection from '../components/sections/EventPackagesSection';
import InclusionsSection from '../components/sections/InclusionsSection';
import GroupBookingForm from '../components/GroupBookingForm';
import { bookingData } from '../data/play/bookingData';
import { groupBookingData } from '../data/groupBookingData';
import { withAssetPaths } from '../utils/dataWithAssets';

const PlayPage = ({ navigateTo }) => {
    const courtBooking = withAssetPaths(bookingData);
    const groupBooking = withAssetPaths(groupBookingData);

    const bookingSteps = [
        {
            title: 'Choose a club',
            description: 'Start from Locations so booking, hours, amenities, and availability match the club where you want to play.',
            icon: Building2
        },
        {
            title: 'Set up CourtReserve',
            description: 'Create or open your CourtReserve account for the selected club and complete any required waiver.',
            icon: ClipboardList
        },
        {
            title: 'Reserve your time',
            description: 'Use the selected club booking page to reserve courts, join programs, or view active sessions.',
            icon: CalendarDays
        }
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <HeroSection
                title="Play at Picktopia"
                subtitle="Learn how court bookings and group bookings work, then choose the right club for location-specific actions."
                backgroundImage={courtBooking.heroImage}
                size="large"
                overlayColor="blue"
            />

            <div className="container mx-auto px-6 py-12 space-y-14">
                <section className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-lg p-6 md:p-8">
                    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                        <div>
                            <p className="text-picktopia-orange font-bold uppercase tracking-wide mb-2">
                                Court Booking
                            </p>
                            <h2 className="font-heading text-3xl font-bold text-picktopia-blue-dark mb-4">
                                Book through your selected club.
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                Court availability, program schedules, pricing, and membership rules can vary by location. Choose a club first so every action is tied to the right facility.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={() => navigateTo('clubs')}
                                    className="bg-picktopia-orange text-white px-5 py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors inline-flex items-center justify-center gap-2"
                                >
                                    Choose a Location
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                                <a
                                    href="https://courtreserve.com/mobile-app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="border border-picktopia-blue-dark text-picktopia-blue-dark px-5 py-3 rounded-lg font-bold hover:bg-picktopia-blue-dark hover:text-white transition-colors inline-flex items-center justify-center gap-2"
                                >
                                    <Download className="w-4 h-4" />
                                    CourtReserve App
                                </a>
                            </div>
                        </div>

                        <div className="grid gap-4">
                            {bookingSteps.map((step, index) => {
                                const Icon = step.icon;

                                return (
                                    <div key={step.title} className="border border-gray-200 rounded-lg p-4 flex gap-4">
                                        <div className="w-11 h-11 rounded-full bg-picktopia-blue-dark text-white flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-picktopia-orange uppercase tracking-wide">
                                                Step {index + 1}
                                            </p>
                                            <h3 className="font-heading text-lg font-bold text-picktopia-blue-dark">
                                                {step.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className="max-w-6xl mx-auto">
                    <div className="bg-picktopia-blue-dark text-white rounded-lg p-6 md:p-8 mb-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <p className="text-picktopia-orange font-bold uppercase tracking-wide mb-2">
                                    Group Bookings
                                </p>
                                <h2 className="font-heading text-3xl font-bold">
                                    Host a private event, team outing, or celebration.
                                </h2>
                                <p className="text-blue-100 mt-3 max-w-3xl">
                                    Group bookings are handled through an inquiry flow so the team can match your date, guest count, coaching needs, and facility requirements.
                                </p>
                            </div>
                            <Users className="w-14 h-14 text-picktopia-orange flex-shrink-0" />
                        </div>
                    </div>

                    <div className="space-y-12">
                        {groupBooking.eventPackages && (
                            <EventPackagesSection content={groupBooking.eventPackages} />
                        )}

                        {groupBooking.inclusions && (
                            <InclusionsSection content={groupBooking.inclusions} />
                        )}

                        <GroupBookingForm />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PlayPage;
