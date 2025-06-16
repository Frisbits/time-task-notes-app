
import React from 'react';
import { Clock, CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  category: 'today' | 'week' | 'month';
  createdAt: string;
}

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle, onDelete, onEdit }) => {
  const { toast } = useToast();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50 dark:bg-red-950/20';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20';
      case 'low': return 'border-l-green-500 bg-green-50 dark:bg-green-950/20';
      default: return 'border-l-gray-500 bg-gray-50 dark:bg-gray-950/20';
    }
  };

  const handleToggle = () => {
    onToggle(task.id);
    if (!task.completed) {
      toast({
        title: "Great job! 🎉",
        description: "Task completed successfully!",
      });
    }
  };

  const handleDelete = () => {
    onDelete(task.id);
    toast({
      title: "Task deleted",
      description: "Task has been removed from your list.",
    });
  };

  return (
    <div className={`task-card border-l-4 ${getPriorityColor(task.priority)} ${task.completed ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <button onClick={handleToggle} className="mt-1">
            {task.completed ? (
              <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
            ) : (
              <Circle className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
            )}
          </button>
          
          <div className="flex-1 min-w-0" onClick={() => onEdit(task)}>
            <h3 className={`text-lg font-medium cursor-pointer hover:text-primary transition-colors ${
              task.completed ? 'line-through text-muted-foreground' : 'text-foreground'
            }`}>
              {task.title}
            </h3>
            {task.description && (
              <p className={`text-base mt-1 cursor-pointer ${
                task.completed ? 'text-muted-foreground' : 'text-muted-foreground'
              }`}>
                {task.description}
              </p>
            )}
            {task.dueDate && (
              <div className="flex items-center space-x-1 mt-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TaskCard;
