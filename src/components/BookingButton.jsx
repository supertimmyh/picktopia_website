import React from 'react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

const BookingButton = ({ 
    text = "Book Now", 
    variant = "primary", // 'primary', 'secondary'
    onClick = () => console.log("Booking button clicked"),
    className,
    ...props
}) => {
    const getVariant = () => {
        switch (variant) {
            case 'primary':
                return 'picktopia';
            case 'secondary':
                return 'picktopia-outline';
            default:
                return 'picktopia';
        }
    };

    return (
        <Button 
            variant={getVariant()}
            size="xl"
            onClick={onClick}
            className={cn(
                "font-heading tracking-wide uppercase transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mt-6 w-full sm:w-auto",
                className
            )}
            {...props}
        >
            {text}
        </Button>
    );
};

export default BookingButton;