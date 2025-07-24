
export const initialCheckedInMembers = [
  { id: 1, name: 'Alex Morgan', avatar: 'AM', checkInTime: '08:15 AM', status: 'Active', statusColor: 'green' },
  { id: 2, name: 'Ben Stokes', avatar: 'BS', checkInTime: '08:22 AM', status: 'InActive', statusColor: 'green' },
  { id: 3, name: 'Chloe Reed', avatar: 'CR', checkInTime: '08:30 AM', status: 'Guest Pass', statusColor: 'yellow' },
  { id: 4, name: 'Benjamin Carter', avatar: 'BC', checkInTime: '09:05 AM', status: 'Active', statusColor: 'green' },
  { id: 5, name: 'Alexandra Lee', avatar: 'AL', checkInTime: '09:12 AM', status: 'Active', statusColor: 'green' },
];

export const initialAllMembers = [
  { id: 1, name: 'Alex Morgan', memberId: 'M001', joinDate: '2023-01-15', status: 'Active' },
  { id: 2, name: 'Ben Stokes', memberId: 'M002', joinDate: '2023-02-20', status: 'Active' },
  { id: 3, name: 'Chloe Reed', memberId: 'M003', joinDate: '2023-03-10', status: 'Active' },
  { id: 4, name: 'David Lee', memberId: 'M004', joinDate: '2022-11-05', status: 'Expired' },
  { id: 5, name: 'Emily White', memberId: 'M005', joinDate: '2023-05-01', status: 'Active' },
  { id: 6, name: 'Frank Green', memberId: 'M006', joinDate: '2023-06-12', status: 'Frozen' },
  { id: 7, name: 'Grace Hall', memberId: 'M007', joinDate: '2023-07-01', status: 'Active' },
  { id: 8, name: 'Henry King', memberId: 'M008', joinDate: '2023-04-18', status: 'Active' },
  { id: 9, name: 'Isla Scott', memberId: 'M009', joinDate: '2022-12-30', status: 'Expired' },
  { id: 10, name: 'Jack Turner', memberId: 'M010', joinDate: '2023-08-01', status: 'New' },
];

export const allTrainers = [
  { id: 1, name: 'Sarah Jen', specialty: 'Yoga & Pilates', avatarUrl: 'https://placehold.co/100x100/93C5FD/1E40AF?text=SJ' },
  { id: 2, name: 'Mike Ross', specialty: 'Strength Training', avatarUrl: 'https://placehold.co/100x100/A78BFA/4C1D95?text=MR' },
  { id: 3, name: 'Maria Garcia', specialty: 'Zumba & Dance', avatarUrl: 'https://placehold.co/100x100/FBBF24/B45309?text=MG' },
  { id: 4, name: 'John Davis', specialty: 'CrossFit', avatarUrl: 'https://placehold.co/100x100/6EE7B7/065F46?text=JD' },
  { id: 5, name: 'Emily Carter', specialty: 'Cardio & HIIT', avatarUrl: 'https://placehold.co/100x100/F9A8D4/831843?text=EC' },
  { id: 6, name: 'Chris Lee', specialty: 'Boxing', avatarUrl: 'https://placehold.co/100x100/FCA5A5/7F1D1D?text=CL' },
];

export const classes = [
  { id: 1, name: 'Morning Yoga', time: '09:00 AM - 10:00 AM', trainer: 'Sarah Jen', spots: '12 / 20', isFull: false },
  { id: 2, name: 'HIIT Blast', time: '11:00 AM - 11:45 AM', trainer: 'Mike Ross', spots: '18 / 18 (Full)', isFull: true },
  { id: 3, name: 'Zumba Party', time: '06:00 PM - 07:00 PM', trainer: 'Maria Garcia', spots: '15 / 25', isFull: false },
];

export const alerts = [
  { id: 1, name: 'David Lee', message: 'Expired yesterday', type: 'error' },
  { id: 2, name: 'Olivia Chen', message: 'Expires in 3 days', type: 'warning' },
  { id: 3, name: 'James Taylor', message: 'Expires in 5 days', type: 'warning' },
];
