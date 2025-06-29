import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { cn } from '../lib/utils';

const ContentTile = ({ 
    title, 
    subtitle, 
    children, 
    backgroundColor = 'bg-white', 
    textColor = 'text-gray-800',
    titleColor = 'text-picktopia-blue-dark',
    size = 'medium', // 'small', 'medium', 'large'
    className,
    ...props
}) => {
    // Size variants for padding
    const sizeClasses = {
        small: 'p-4',
        medium: 'p-6',
        large: 'p-8'
    };

    return (
        <Card 
            className={cn(
                backgroundColor,
                textColor,
                "rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300",
                className
            )}
            {...props}
        >
            {(title || subtitle) && (
                <CardHeader className={sizeClasses[size]}>
                    {title && (
                        <CardTitle className={cn(
                            "font-heading text-2xl md:text-3xl font-black tracking-wider uppercase",
                            titleColor
                        )}>
                            {title}
                        </CardTitle>
                    )}
                    {subtitle && (
                        <CardDescription className={cn(
                            "font-body text-lg leading-relaxed font-medium opacity-80",
                            textColor
                        )}>
                            {subtitle}
                        </CardDescription>
                    )}
                </CardHeader>
            )}
            <CardContent className={cn(
                sizeClasses[size],
                "pt-0",
                "font-body text-base leading-relaxed space-y-4"
            )}>
                {children}
            </CardContent>
        </Card>
    );
};

export default ContentTile;