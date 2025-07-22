import React from 'react';
import { Card, CardContent, CardHeader, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Clock, Users, Trophy, Package } from 'lucide-react';

const ProgramCard = ({ program, bookingUrl, bookingText = "Book Now" }) => {
  if (!program) return null;

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 border-2 hover:border-picktopia-orange/30">
      <CardHeader className="text-center pb-4">
        <h3 className="text-xl font-bold font-heading text-picktopia-blue-dark mb-2">
          {program.title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {program.description}
        </p>
      </CardHeader>
      
      <CardContent className="flex-grow space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-picktopia-orange" />
            <span className="text-gray-700">{program.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-picktopia-orange" />
            <span className="text-gray-700">{program.skillLevel}</span>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-picktopia-blue-dark mb-2 flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            What You'll Learn
          </h4>
          <ul className="space-y-1">
            {Array.isArray(program.features) ? program.features.map((feature, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-picktopia-orange rounded-full mt-2 flex-shrink-0"></span>
                {feature}
              </li>
            )) : (
              <li className="text-sm text-gray-700">Lorem ipsum dolor sit amet</li>
            )}
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-picktopia-blue-dark mb-2 flex items-center gap-2">
            <Package className="w-4 h-4" />
            Equipment
          </h4>
          <p className="text-sm text-gray-600">
            {program.equipment}
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-picktopia-blue-dark mb-2">Pricing</h4>
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Members:</span>
              <span className="font-semibold text-picktopia-blue-dark">{program.memberPrice}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Non-members:</span>
              <span className="font-semibold text-picktopia-blue-dark">{program.nonMemberPrice}</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-4">
        {bookingUrl && (
          <Button 
            asChild
            className="w-full bg-picktopia-orange hover:bg-picktopia-orange/90 text-white font-semibold"
          >
            <a 
              href={bookingUrl} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {bookingText}
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProgramCard;