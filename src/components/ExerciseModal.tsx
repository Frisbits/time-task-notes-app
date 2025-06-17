
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (exercise: { name: string; sets: number; reps: number; notes?: string }) => void;
  day: string;
  muscleGroup: string;
}

const ExerciseModal: React.FC<ExerciseModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  day, 
  muscleGroup 
}) => {
  const [exerciseName, setExerciseName] = useState('');
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    if (!exerciseName.trim()) return;

    onSave({
      name: exerciseName,
      sets,
      reps,
      notes: notes.trim() || undefined
    });

    setExerciseName('');
    setSets(3);
    setReps(10);
    setNotes('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-md-sys-color-surface rounded-3xl shadow-xl max-w-md w-full">
        <div className="border-b border-md-sys-color-outline-variant p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="notey-headline-small text-md-sys-color-on-surface">
                Add Exercise
              </h2>
              <p className="notey-body-medium text-md-sys-color-on-surface-variant mt-1">
                {day} - {muscleGroup}
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <Label htmlFor="exerciseName" className="notey-title-small text-md-sys-color-on-surface">
              Exercise Name
            </Label>
            <Input
              id="exerciseName"
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              placeholder="e.g., Bench Press, Squats"
              className="mt-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sets" className="notey-title-small text-md-sys-color-on-surface">
                Sets
              </Label>
              <Input
                id="sets"
                type="number"
                min="1"
                max="20"
                value={sets}
                onChange={(e) => setSets(parseInt(e.target.value) || 1)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="reps" className="notey-title-small text-md-sys-color-on-surface">
                Reps
              </Label>
              <Input
                id="reps"
                type="number"
                min="1"
                max="100"
                value={reps}
                onChange={(e) => setReps(parseInt(e.target.value) || 1)}
                className="mt-2"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="notes" className="notey-title-small text-md-sys-color-on-surface">
              Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Weight, form cues, progression notes..."
              className="mt-2"
              rows={3}
            />
          </div>
        </div>

        <div className="border-t border-md-sys-color-outline-variant p-6">
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!exerciseName.trim()}
              className="md-fab notey-label-large"
            >
              Add Exercise
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseModal;
