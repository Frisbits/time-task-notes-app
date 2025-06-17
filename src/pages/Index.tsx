
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import TaskCard, { Task } from '@/components/TaskCard';
import TaskModal from '@/components/TaskModal';
import MotivationalQuote from '@/components/MotivationalQuote';
import TableView from '@/components/TableView';
import GymPlanView from '@/components/GymPlanView';
import PinLock from '@/components/PinLock';
import { ThemeProvider } from '@/components/ThemeProvider';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [activeView, setActiveView] = useState('today');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();

  // Check if PIN is set and if app should be locked
  useEffect(() => {
    const savedPin = localStorage.getItem('app-pin');
    const appWasLocked = localStorage.getItem('app-locked') === 'true';
    
    if (!savedPin) {
      setIsFirstTime(true);
      setIsLocked(true);
    } else if (appWasLocked) {
      setIsLocked(true);
    }
  }, []);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleUnlock = () => {
    setIsLocked(false);
    setIsFirstTime(false);
    localStorage.setItem('app-locked', 'false');
  };

  const handlePinSet = (pin: string) => {
    setIsFirstTime(false);
    setIsLocked(false);
    localStorage.setItem('app-locked', 'false');
    toast({
      title: "PIN set successfully! 🔒",
      description: "Your app is now secured with a PIN.",
    });
  };

  const handleLockApp = () => {
    setIsLocked(true);
    localStorage.setItem('app-locked', 'true');
    setSidebarOpen(false);
  };

  const handleCreateNote = () => {
    setEditingTask(null);
    setIsModalOpen(true);
    setSidebarOpen(false);
  };

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (editingTask) {
      setTasks(prev => prev.map(task => 
        task.id === editingTask.id 
          ? { ...taskData, id: editingTask.id, createdAt: editingTask.createdAt }
          : task
      ));
      toast({
        title: "Task updated! ✏️",
        description: "Your task has been successfully updated.",
      });
    } else {
      const newTask: Task = {
        ...taskData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      setTasks(prev => [...prev, newTask]);
      toast({
        title: "Task created! 🎉",
        description: "Your new task is ready to tackle!",
      });
    }
  };

  const handleToggleTask = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const getFilteredTasks = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const monthFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);

    switch (activeView) {
      case 'today':
        return tasks.filter(task => task.category === 'today');
      case 'week':
        return tasks.filter(task => task.category === 'week');
      case 'month':
        return tasks.filter(task => task.category === 'month');
      case 'tasks':
        return tasks;
      default:
        return tasks;
    }
  };

  const getViewTitle = () => {
    switch (activeView) {
      case 'today': return 'Today\'s Tasks';
      case 'week': return 'This Week\'s Tasks';
      case 'month': return 'This Month\'s Tasks';
      case 'tasks': return 'All Tasks';
      case 'gym': return 'Gym Tracker';
      case 'tables': return 'Tables';
      default: return 'Tasks';
    }
  };

  if (isLocked) {
    return (
      <ThemeProvider>
        <PinLock 
          onUnlock={handleUnlock} 
          isSetup={isFirstTime}
          onPinSet={handlePinSet}
        />
      </ThemeProvider>
    );
  }

  const filteredTasks = getFilteredTasks();
  const completedTasks = filteredTasks.filter(task => task.completed).length;
  const totalTasks = filteredTasks.length;

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background flex flex-col md:flex-row w-full">
        {/* Mobile Header */}
        <div className="md:hidden bg-card border-b border-border p-4 flex items-center justify-between">
          <h1 className="app-title text-xl font-bold text-foreground">Notey</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <div className="w-full h-0.5 bg-foreground rounded"></div>
              <div className="w-full h-0.5 bg-foreground rounded"></div>
              <div className="w-full h-0.5 bg-foreground rounded"></div>
            </div>
          </button>
        </div>

        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block fixed md:relative inset-0 z-50 md:z-0`}>
          {sidebarOpen && (
            <div 
              className="md:hidden absolute inset-0 bg-black/50"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          <div className="relative">
            <Sidebar 
              activeView={activeView} 
              onViewChange={(view) => {
                setActiveView(view);
                setSidebarOpen(false);
              }}
              onCreateNote={handleCreateNote}
              onLockApp={handleLockApp}
            />
          </div>
        </div>
        
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          {activeView === 'tables' ? (
            <TableView />
          ) : activeView === 'gym' ? (
            <GymPlanView />
          ) : (
            <>
              <div className="max-w-4xl mx-auto">
                <MotivationalQuote />
                
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">{getViewTitle()}</h2>
                    {totalTasks > 0 && (
                      <p className="text-base md:text-lg text-muted-foreground mt-1">
                        {completedTasks} of {totalTasks} tasks completed
                        {totalTasks > 0 && (
                          <span className="ml-2 text-primary font-semibold">
                            ({Math.round((completedTasks / totalTasks) * 100)}%)
                          </span>
                        )}
                      </p>
                    )}
                  </div>
                </div>

                {filteredTasks.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-4xl md:text-6xl mb-4">
                      {activeView === 'today' && '📅'}
                      {activeView === 'week' && '📋'}
                      {activeView === 'month' && '🗓️'}
                      {activeView === 'tasks' && '✅'}
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                      No tasks yet
                    </h3>
                    <p className="text-base md:text-lg text-muted-foreground mb-6">
                      Create your first task to get started on your productivity journey
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredTasks
                      .sort((a, b) => {
                        if (a.completed !== b.completed) {
                          return a.completed ? 1 : -1;
                        }
                        const priorityOrder = { high: 0, medium: 1, low: 2 };
                        return priorityOrder[a.priority] - priorityOrder[b.priority];
                      })
                      .map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          onToggle={handleToggleTask}
                          onDelete={handleDeleteTask}
                          onEdit={handleEditTask}
                        />
                      ))}
                  </div>
                )}
              </div>
            </>
          )}
        </main>

        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveTask}
          task={editingTask}
        />
      </div>
    </ThemeProvider>
  );
};

export default Index;
