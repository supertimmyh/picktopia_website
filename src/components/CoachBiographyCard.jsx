import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Clock, Star, Award } from 'lucide-react';

const CoachBiographyCard = ({ coach }) => {
  if (!coach) return null;

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-4 w-32 h-32 rounded-full overflow-hidden bg-gray-200">
          <img
            src={coach.image}
            alt={coach.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = '/assets/place-holder.jpg';
            }}
          />
        </div>
        <h3 className="text-xl font-bold font-heading text-picktopia-blue-dark">
          {coach.name}
        </h3>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <Award className="w-4 h-4" />
          <span>{coach.certifications}</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <Star className="w-4 h-4" />
          <span>{coach.experience} experience</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-picktopia-blue-dark mb-2">Specialties</h4>
          <div className="flex flex-wrap gap-1">
            {Array.isArray(coach.specialties) ? coach.specialties.map((specialty, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs bg-picktopia-orange/10 text-picktopia-orange border-picktopia-orange/20"
              >
                {specialty}
              </Badge>
            )) : (
              <Badge variant="secondary" className="text-xs">
                Lorem Ipsum
              </Badge>
            )}
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-picktopia-blue-dark mb-2">About</h4>
          <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {coach.bio}
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-picktopia-blue-dark mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Availability
          </h4>
          <p className="text-sm text-gray-600">
            {coach.availability}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoachBiographyCard;