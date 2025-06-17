
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { DAYS_OF_WEEK, MUSCLE_GROUPS } from '@/types/gym';

interface GymPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (planData: { name: string; selectedDays: Record<string, string[]> }) => void;
}

const GymPlanModal: React.FC<GymPlanModalProps> = ({ isOpen, onClose, onSave }) => {
  const [planName, setPlanName] = useState('');
  const [selectedDays, setSelectedDays] = useState<Record<string, string[]>>({});

  const handleSave = () => {
    if (!planName.trim()) return;

    onSave({
      name: planName,
      selectedDays
    });

    setPlanName('');
    setSelectedDays({});
    onClose();
  };

  const toggleMuscleGroup = (day: string, muscleGroup: string) => {
    setSelectedDays(prev => ({
      ...prev,
      [day]: prev[day] 
        ? prev[day].includes(muscleGroup)
          ? prev[day].filter(mg => mg !== muscleGroup)
          : [...prev[day], muscleGroup]
        : [muscleGroup]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-md-sys-color-surface rounded-3xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-md-sys-color-surface border-b border-md-sys-color-outline-variant p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <h2 className="notey-headline-medium text-md-sys-color-on-surface">
              Create Gym Plan
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <Label htmlFor="planName" className="notey-title-medium text-md-sys-color-on-surface">
              Plan Name
            </Label>
            <Input
              id="planName"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              placeholder="e.g., Push Pull Legs, Upper Lower"
              className="mt-2"
            />
          </div>

          <div>
            <h3 className="notey-title-medium text-md-sys-color-on-surface mb-4">
              Assign Muscle Groups to Days
            </h3>
            
            <div className="grid gap-4">
              {DAYS_OF_WEEK.map(day => (
                <div key={day} className="border border-md-sys-color-outline-variant rounded-2xl p-4">
                  <h4 className="notey-title-small text-md-sys-color-on-surface mb-3">
                    {day}
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {MUSCLE_GROUPS.map(muscleGroup => (
                      <label 
                        key={muscleGroup.name}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Checkbox
                          checked={selectedDays[day]?.includes(muscleGroup.name) || false}
                          onCheckedChange={() => toggleMuscleGroup(day, muscleGroup.name)}
                        />
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: muscleGroup.color }}
                          />
                          <span className="notey-body-medium text-md-sys-color-on-surface">
                            {muscleGroup.name}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-md-sys-color-surface border-t border-md-sys-color-outline-variant p-6 rounded-b-3xl">
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!planName.trim()}
              className="md-fab notey-label-large"
            >
              Create Plan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymPlanModal;
