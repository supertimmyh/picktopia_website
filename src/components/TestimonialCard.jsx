import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Star, Quote } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => {
  if (!testimonial) return null;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-picktopia-orange w-80 flex-shrink-0 snap-start">
      <CardContent className="p-6">
        <div className="flex items-start gap-3">
          <Quote className="w-8 h-8 text-picktopia-orange/30 flex-shrink-0 mt-1" />
          <div className="flex-grow">
            <blockquote className="text-gray-700 leading-relaxed mb-4 italic">
              "{testimonial.quote}"
            </blockquote>
            
            <div className="space-y-2">
              <div className="flex items-center gap-1 mb-2">
                {renderStars(testimonial.rating)}
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-picktopia-blue-dark">
                    {testimonial.name}
                  </p>
                  {testimonial.program && (
                    <Badge 
                      variant="outline" 
                      className="mt-1 text-xs border-picktopia-orange/30 text-picktopia-orange"
                    >
                      {testimonial.program}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;