
import React from 'react';
import { Calendar, CheckSquare, Table, Settings, Moon, Sun, Plus, Lock } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  onCreateNote: () => void;
  onLockApp: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange, onCreateNote, onLockApp }) => {
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { id: 'today', label: 'Today', icon: Calendar, color: 'text-blue-600 dark:text-blue-400' },
    { id: 'week', label: 'This Week', icon: Calendar, color: 'text-green-600 dark:text-green-400' },
    { id: 'month', label: 'This Month', icon: Calendar, color: 'text-purple-600 dark:text-purple-400' },
    { id: 'tasks', label: 'All Tasks', icon: CheckSquare, color: 'text-orange-600 dark:text-orange-400' },
    { id: 'tables', label: 'Tables', icon: Table, color: 'text-pink-600 dark:text-pink-400' },
  ];

  return (
    <div className="w-full md:w-64 bg-card border-r border-border h-screen flex flex-col">
      <div className="p-4 md:p-6 border-b border-border">
        <h1 className="app-title text-2xl md:text-3xl font-bold text-foreground mb-4">TaskNotes</h1>
        <Button 
          onClick={onCreateNote}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base md:text-lg py-3"
        >
          <Plus className="mr-2 h-5 w-5" />
          New Note
        </Button>
      </div>

      <nav className="flex-1 p-3 md:p-4">
        <div className="space-y-1 md:space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 md:px-4 py-3 rounded-lg text-left text-base md:text-lg transition-all duration-200 ${
                activeView === item.id
                  ? 'bg-accent text-accent-foreground shadow-sm'
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              <item.icon className={`h-5 w-5 ${item.color}`} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="p-3 md:p-4 border-t border-border space-y-2">
        <button
          onClick={onLockApp}
          className="w-full flex items-center space-x-3 px-3 md:px-4 py-3 rounded-lg text-left text-base md:text-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <Lock className="h-5 w-5" />
          <span>Lock App</span>
        </button>
        <button
          onClick={toggleTheme}
          className="w-full flex items-center space-x-3 px-3 md:px-4 py-3 rounded-lg text-left text-base md:text-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
          <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
