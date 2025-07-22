import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Check, DollarSign } from 'lucide-react';

const PricingTable = ({ programs, bookingUrl, bookingText = "Book Training" }) => {
  if (!programs || programs.length === 0) return null;

  return (
    <div className="w-full">
      <Card>
        <CardHeader className="text-center">
          <h3 className="text-2xl font-bold font-heading text-picktopia-blue-dark flex items-center justify-center gap-2">
            <DollarSign className="w-6 h-6" />
            Training Program Pricing
          </h3>
          <p className="text-gray-600">Choose the perfect program for your skill level and goals</p>
        </CardHeader>
        
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-picktopia-blue-dark">Program</th>
                  <th className="text-center py-4 px-4 font-semibold text-picktopia-blue-dark">Duration</th>
                  <th className="text-center py-4 px-4 font-semibold text-picktopia-blue-dark">Member Price</th>
                  <th className="text-center py-4 px-4 font-semibold text-picktopia-blue-dark">Non-Member Price</th>
                  <th className="text-center py-4 px-4 font-semibold text-picktopia-blue-dark">Skill Level</th>
                </tr>
              </thead>
              <tbody>
                {programs.map((program, index) => (
                  <tr 
                    key={index} 
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                    }`}
                  >
                    <td className="py-4 px-4">
                      <div>
                        <h4 className="font-semibold text-picktopia-blue-dark">{program.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{program.description}</p>
                      </div>
                    </td>
                    <td className="text-center py-4 px-4">
                      <Badge variant="outline" className="border-picktopia-orange/30 text-picktopia-orange">
                        {program.duration}
                      </Badge>
                    </td>
                    <td className="text-center py-4 px-4">
                      <span className="text-lg font-bold text-green-600">{program.memberPrice}</span>
                    </td>
                    <td className="text-center py-4 px-4">
                      <span className="text-lg font-bold text-picktopia-blue-dark">{program.nonMemberPrice}</span>
                    </td>
                    <td className="text-center py-4 px-4">
                      <Badge variant="secondary" className="bg-picktopia-blue-dark/10 text-picktopia-blue-dark">
                        {program.skillLevel}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 p-4 bg-picktopia-orange/5 rounded-lg border border-picktopia-orange/20">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-semibold text-picktopia-blue-dark">What's Included:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Professional instruction from certified coaches</li>
                  <li>• Equipment provided (unless noted otherwise)</li>
                  <li>• Progress tracking and personalized feedback</li>
                  <li>• Access to exclusive training resources</li>
                </ul>
              </div>
            </div>
          </div>
          
          {bookingUrl && (
            <div className="mt-6 text-center">
              <Button 
                asChild
                size="lg"
                className="bg-picktopia-orange hover:bg-picktopia-orange/90 text-white font-semibold px-8"
              >
                <a 
                  href={bookingUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {bookingText}
                </a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingTable;