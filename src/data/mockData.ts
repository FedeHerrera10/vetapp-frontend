import { VetType } from '../types';
import { addDays, format } from 'date-fns';

// Generate next 30 days for availability
const generateAvailableDays = () => {
  const days = [];
  const today = new Date();
  
  // Generate random availability for next 30 days
  for (let i = 1; i <= 30; i++) {
    // Randomly decide if this day is available (70% chance)
    if (Math.random() < 0.7) {
      days.push(format(addDays(today, i), 'yyyy-MM-dd'));
    }
  }
  
  return days;
};

export const veterinarian: VetType = {
  id: 1,
  name: "Dr. Sarah Johnson",
  specialty: "Small Animal Medicine",
  imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  availability: generateAvailableDays()
};