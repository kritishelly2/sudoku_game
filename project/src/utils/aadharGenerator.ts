import { format, subYears } from 'date-fns';

interface AadharData {
  name: string;
  aadharNumber: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  photo: string;
  age: number;
}

const firstNames = {
  male: ['Arjun', 'Rahul', 'Amit', 'Vikram', 'Suresh', 'Rajesh', 'Anil', 'Deepak', 'Manoj', 'Sanjay'],
  female: ['Priya', 'Sunita', 'Kavita', 'Meera', 'Anjali', 'Pooja', 'Neha', 'Ritu', 'Sita', 'Geeta']
};

const lastNames = ['Sharma', 'Patel', 'Singh', 'Kumar', 'Gupta', 'Agarwal', 'Jain', 'Verma', 'Yadav', 'Mishra'];

const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'];

const states = ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'West Bengal', 'Telangana', 'Gujarat', 'Rajasthan', 'Uttar Pradesh'];

const generateAadharNumber = (): string => {
  // Generate a 12-digit Aadhar number (simulated)
  let aadhar = '';
  for (let i = 0; i < 12; i++) {
    aadhar += Math.floor(Math.random() * 10);
  }
  return aadhar.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3');
};

const generateRandomAge = (): number => {
  // Generate age between 16 and 65
  return Math.floor(Math.random() * 50) + 16;
};

const generatePhoto = (gender: string): string => {
  // Using placeholder images for demo
  const malePhotos = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=180&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=180&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=180&fit=crop&crop=face'
  ];
  
  const femalePhotos = [
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=180&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=180&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=180&fit=crop&crop=face'
  ];
  
  const photos = gender === 'Male' ? malePhotos : femalePhotos;
  return photos[Math.floor(Math.random() * photos.length)];
};

export const generateSimulatedAadhar = (): AadharData => {
  const gender = Math.random() > 0.5 ? 'Male' : 'Female';
  const firstName = firstNames[gender.toLowerCase() as keyof typeof firstNames][
    Math.floor(Math.random() * firstNames[gender.toLowerCase() as keyof typeof firstNames].length)
  ];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const name = `${firstName} ${lastName}`;
  
  const age = generateRandomAge();
  const birthDate = subYears(new Date(), age);
  const dateOfBirth = format(birthDate, 'dd/MM/yyyy');
  
  const city = cities[Math.floor(Math.random() * cities.length)];
  const state = states[Math.floor(Math.random() * states.length)];
  const houseNumber = Math.floor(Math.random() * 999) + 1;
  const pincode = Math.floor(Math.random() * 900000) + 100000;
  
  const address = `${houseNumber}, ${city}, ${state} - ${pincode}`;
  
  return {
    name,
    aadharNumber: generateAadharNumber(),
    dateOfBirth,
    gender,
    address,
    photo: generatePhoto(gender),
    age
  };
};