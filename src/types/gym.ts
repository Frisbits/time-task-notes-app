
export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  completed: boolean;
  notes?: string;
}

export interface MuscleGroup {
  id: string;
  name: string;
  color: string;
  exercises: Exercise[];
}

export interface DayPlan {
  day: string;
  muscleGroups: MuscleGroup[];
}

export interface WeeklyPlan {
  id: string;
  name: string;
  days: DayPlan[];
  createdAt: string;
  isActive: boolean;
}

export const MUSCLE_GROUPS = [
  { name: 'Chest', color: '#FF6B6B' },
  { name: 'Back', color: '#4ECDC4' },
  { name: 'Shoulders', color: '#45B7D1' },
  { name: 'Arms', color: '#96CEB4' },
  { name: 'Legs', color: '#FFEAA7' },
  { name: 'Core', color: '#DDA0DD' },
  { name: 'Cardio', color: '#FF9FF3' },
] as const;

export const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday', 
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
] as const;
