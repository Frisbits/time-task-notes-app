
import React, { useState, useEffect } from 'react';
import { Plus, Calendar, Dumbbell, CheckSquare, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { WeeklyPlan, DayPlan, MuscleGroup, Exercise, DAYS_OF_WEEK, MUSCLE_GROUPS } from '@/types/gym';
import GymPlanModal from './GymPlanModal';
import ExerciseModal from './ExerciseModal';
import { useToast } from '@/hooks/use-toast';

const GymPlanView: React.FC = () => {
  const [weeklyPlans, setWeeklyPlans] = useState<WeeklyPlan[]>([]);
  const [activeWeek, setActiveWeek] = useState<WeeklyPlan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exerciseModalOpen, setExerciseModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    const savedPlans = localStorage.getItem('gym-plans');
    if (savedPlans) {
      const plans = JSON.parse(savedPlans);
      setWeeklyPlans(plans);
      const active = plans.find((plan: WeeklyPlan) => plan.isActive);
      if (active) setActiveWeek(active);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('gym-plans', JSON.stringify(weeklyPlans));
  }, [weeklyPlans]);

  const createNewPlan = (planData: { name: string; selectedDays: Record<string, string[]> }) => {
    const newPlan: WeeklyPlan = {
      id: Date.now().toString(),
      name: planData.name,
      days: DAYS_OF_WEEK.map(day => ({
        day,
        muscleGroups: planData.selectedDays[day]?.map(mgName => {
          const mgColor = MUSCLE_GROUPS.find(mg => mg.name === mgName)?.color || '#6750A4';
          return {
            id: `${day}-${mgName}`,
            name: mgName,
            color: mgColor,
            exercises: []
          };
        }) || []
      })),
      createdAt: new Date().toISOString(),
      isActive: true
    };

    setWeeklyPlans(prev => prev.map(plan => ({ ...plan, isActive: false })).concat(newPlan));
    setActiveWeek(newPlan);
    toast({
      title: "Gym plan created! 💪",
      description: "Your new workout plan is ready to go!",
    });
  };

  const addExercise = (exercise: Omit<Exercise, 'id' | 'completed'>) => {
    if (!activeWeek || !selectedDay || !selectedMuscleGroup) return;

    const newExercise: Exercise = {
      ...exercise,
      id: Date.now().toString(),
      completed: false
    };

    const updatedWeek = {
      ...activeWeek,
      days: activeWeek.days.map(day => 
        day.day === selectedDay 
          ? {
              ...day,
              muscleGroups: day.muscleGroups.map(mg =>
                mg.name === selectedMuscleGroup
                  ? { ...mg, exercises: [...mg.exercises, newExercise] }
                  : mg
              )
            }
          : day
      )
    };

    setActiveWeek(updatedWeek);
    setWeeklyPlans(prev => prev.map(plan => plan.id === updatedWeek.id ? updatedWeek : plan));
    toast({
      title: "Exercise added! 🏋️",
      description: `${exercise.name} added to your ${selectedDay} workout.`,
    });
  };

  const toggleExercise = (dayName: string, muscleGroupName: string, exerciseId: string) => {
    if (!activeWeek) return;

    const updatedWeek = {
      ...activeWeek,
      days: activeWeek.days.map(day => 
        day.day === dayName 
          ? {
              ...day,
              muscleGroups: day.muscleGroups.map(mg =>
                mg.name === muscleGroupName
                  ? {
                      ...mg,
                      exercises: mg.exercises.map(ex =>
                        ex.id === exerciseId ? { ...ex, completed: !ex.completed } : ex
                      )
                    }
                  : mg
              )
            }
          : day
      )
    };

    setActiveWeek(updatedWeek);
    setWeeklyPlans(prev => prev.map(plan => plan.id === updatedWeek.id ? updatedWeek : plan));
  };

  const getCurrentDay = () => {
    const today = new Date().getDay();
    return DAYS_OF_WEEK[today === 0 ? 6 : today - 1]; // Convert Sunday (0) to Saturday (6)
  };

  const openExerciseModal = (day: string, muscleGroup: string) => {
    setSelectedDay(day);
    setSelectedMuscleGroup(muscleGroup);
    setExerciseModalOpen(true);
  };

  if (!activeWeek) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <Dumbbell className="h-16 w-16 mx-auto mb-6 text-md-sys-color-primary" />
          <h2 className="notey-headline-medium text-md-sys-color-on-surface mb-4">
            Create Your First Gym Plan
          </h2>
          <p className="notey-body-large text-md-sys-color-on-surface-variant mb-8">
            Set up your weekly workout schedule and start tracking your progress
          </p>
          <Button onClick={() => setIsModalOpen(true)} className="md-fab notey-label-large">
            <Plus className="h-5 w-5" />
            Create Gym Plan
          </Button>
        </div>

        <GymPlanModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={createNewPlan}
        />
      </div>
    );
  }

  const currentDay = getCurrentDay();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="notey-headline-large text-md-sys-color-on-surface">
            {activeWeek.name}
          </h2>
          <p className="notey-body-large text-md-sys-color-on-surface-variant mt-2">
            Today is {currentDay} - Stay consistent! 💪
          </p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          variant="outline"
          className="notey-label-large"
        >
          <Plus className="h-4 w-4" />
          New Plan
        </Button>
      </div>

      <div className="grid gap-6">
        {activeWeek.days.map((day) => (
          <Card key={day.day} className={`p-6 ${day.day === currentDay ? 'ring-2 ring-md-sys-color-primary' : ''}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`notey-title-large ${day.day === currentDay ? 'text-md-sys-color-primary' : 'text-md-sys-color-on-surface'}`}>
                {day.day}
                {day.day === currentDay && (
                  <span className="ml-2 px-2 py-1 text-xs bg-md-sys-color-primary text-md-sys-color-on-primary rounded-full">
                    Today
                  </span>
                )}
              </h3>
              <Calendar className="h-5 w-5 text-md-sys-color-on-surface-variant" />
            </div>

            {day.muscleGroups.length === 0 ? (
              <p className="notey-body-medium text-md-sys-color-on-surface-variant text-center py-8">
                Rest day - Recovery is important too! 😴
              </p>
            ) : (
              <div className="space-y-4">
                {day.muscleGroups.map((muscleGroup) => (
                  <div key={muscleGroup.id} className="border border-md-sys-color-outline-variant rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: muscleGroup.color }}
                        />
                        <h4 className="notey-title-medium text-md-sys-color-on-surface">
                          {muscleGroup.name}
                        </h4>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => openExerciseModal(day.day, muscleGroup.name)}
                        className="notey-label-medium"
                      >
                        <Plus className="h-4 w-4" />
                        Add Exercise
                      </Button>
                    </div>

                    {muscleGroup.exercises.length === 0 ? (
                      <p className="notey-body-small text-md-sys-color-on-surface-variant text-center py-4">
                        No exercises yet. Click "Add Exercise" to get started.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {muscleGroup.exercises.map((exercise) => (
                          <div 
                            key={exercise.id}
                            className={`flex items-center justify-between p-3 rounded-lg border ${
                              exercise.completed 
                                ? 'bg-md-sys-color-secondary-container border-md-sys-color-secondary' 
                                : 'bg-md-sys-color-surface border-md-sys-color-outline-variant'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Checkbox
                                checked={exercise.completed}
                                onCheckedChange={() => toggleExercise(day.day, muscleGroup.name, exercise.id)}
                              />
                              <div>
                                <p className={`notey-body-medium ${
                                  exercise.completed 
                                    ? 'text-md-sys-color-on-secondary-container line-through' 
                                    : 'text-md-sys-color-on-surface'
                                }`}>
                                  {exercise.name}
                                </p>
                                <p className={`notey-body-small ${
                                  exercise.completed 
                                    ? 'text-md-sys-color-on-secondary-container/70' 
                                    : 'text-md-sys-color-on-surface-variant'
                                }`}>
                                  {exercise.sets} sets × {exercise.reps} reps
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>

      <GymPlanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={createNewPlan}
      />

      <ExerciseModal
        isOpen={exerciseModalOpen}
        onClose={() => setExerciseModalOpen(false)}
        onSave={addExercise}
        day={selectedDay}
        muscleGroup={selectedMuscleGroup}
      />
    </div>
  );
};

export default GymPlanView;
