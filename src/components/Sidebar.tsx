
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
    { id: 'today', label: 'Today', icon: Calendar, color: 'text-md-sys-color-primary' },
    { id: 'week', label: 'This Week', icon: Calendar, color: 'text-md-sys-color-secondary' },
    { id: 'month', label: 'This Month', icon: Calendar, color: 'text-md-sys-color-tertiary' },
    { id: 'tasks', label: 'All Tasks', icon: CheckSquare, color: 'text-md-sys-color-primary' },
    { id: 'tables', label: 'Tables', icon: Table, color: 'text-md-sys-color-secondary' },
  ];

  return (
    <div className="w-full md:w-80 bg-md-sys-color-surface border-r border-md-sys-color-outline-variant h-screen flex flex-col">
      <div className="p-6 border-b border-md-sys-color-outline-variant">
        <h1 className="app-title text-heading-xl text-md-sys-color-on-surface mb-6">Notey</h1>
        <Button 
          onClick={onCreateNote}
          className="w-full md-fab notey-label-large py-4 px-6 gap-3"
        >
          <Plus className="h-6 w-6" />
          New Note
        </Button>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-4 md-navigation-item notey-label-large ${
                activeView === item.id
                  ? 'active bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container'
                  : 'text-md-sys-color-on-surface hover:bg-md-sys-color-surface-variant'
              }`}
            >
              <item.icon className={`h-6 w-6 ${item.color}`} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-md-sys-color-outline-variant space-y-2">
        <button
          onClick={onLockApp}
          className="w-full flex items-center space-x-4 md-navigation-item notey-label-large text-md-sys-color-on-surface hover:bg-md-sys-color-surface-variant"
        >
          <Lock className="h-6 w-6" />
          <span>Lock App</span>
        </button>
        <button
          onClick={toggleTheme}
          className="w-full flex items-center space-x-4 md-navigation-item notey-label-large text-md-sys-color-on-surface hover:bg-md-sys-color-surface-variant"
        >
          {theme === 'light' ? (
            <Moon className="h-6 w-6" />
          ) : (
            <Sun className="h-6 w-6" />
          )}
          <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
