
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Delete } from 'lucide-react';

interface PinLockProps {
  onUnlock: () => void;
  isSetup?: boolean;
  onPinSet?: (pin: string) => void;
}

const PinLock: React.FC<PinLockProps> = ({ onUnlock, isSetup = false, onPinSet }) => {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [isConfirmMode, setIsConfirmMode] = useState(false);
  const [error, setError] = useState('');
  const [savedPin, setSavedPin] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('app-pin');
    if (stored) {
      setSavedPin(stored);
    }
  }, []);

  const handleNumberPress = (num: string) => {
    if (isSetup) {
      if (!isConfirmMode && pin.length < 4) {
        setPin(prev => prev + num);
      } else if (isConfirmMode && confirmPin.length < 4) {
        setConfirmPin(prev => prev + num);
      }
    } else {
      if (pin.length < 4) {
        setPin(prev => prev + num);
      }
    }
    setError('');
  };

  const handleDelete = () => {
    if (isSetup) {
      if (!isConfirmMode) {
        setPin(prev => prev.slice(0, -1));
      } else {
        setConfirmPin(prev => prev.slice(0, -1));
      }
    } else {
      setPin(prev => prev.slice(0, -1));
    }
    setError('');
  };

  const handleSubmit = () => {
    if (isSetup) {
      if (!isConfirmMode && pin.length === 4) {
        setIsConfirmMode(true);
        return;
      }
      
      if (isConfirmMode && confirmPin.length === 4) {
        if (pin === confirmPin) {
          localStorage.setItem('app-pin', pin);
          onPinSet?.(pin);
        } else {
          setError('PINs do not match. Try again.');
          setPin('');
          setConfirmPin('');
          setIsConfirmMode(false);
        }
      }
    } else {
      if (pin.length === 4) {
        if (pin === savedPin) {
          onUnlock();
        } else {
          setError('Incorrect PIN. Try again.');
          setPin('');
        }
      }
    }
  };

  useEffect(() => {
    if (pin.length === 4 || confirmPin.length === 4) {
      setTimeout(handleSubmit, 100);
    }
  }, [pin, confirmPin]);

  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const currentPin = isSetup && isConfirmMode ? confirmPin : pin;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-4">
          <Shield className="h-16 w-16 mx-auto text-primary" />
          <h1 className="app-title text-3xl font-bold text-foreground">
            {isSetup ? 'Set PIN' : 'TaskNotes'}
          </h1>
          <p className="text-lg text-muted-foreground">
            {isSetup 
              ? isConfirmMode 
                ? 'Confirm your PIN'
                : 'Create a 4-digit PIN to secure your app'
              : 'Enter your PIN to unlock'
            }
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex justify-center space-x-4">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-full border-2 transition-all ${
                  index < currentPin.length
                    ? 'bg-primary border-primary'
                    : 'border-muted-foreground'
                }`}
              />
            ))}
          </div>

          {error && (
            <p className="text-destructive text-center text-base font-medium">
              {error}
            </p>
          )}

          <div className="grid grid-cols-3 gap-4">
            {numbers.slice(0, 9).map((num) => (
              <Button
                key={num}
                variant="outline"
                size="lg"
                className="h-16 text-2xl font-semibold"
                onClick={() => handleNumberPress(num)}
              >
                {num}
              </Button>
            ))}
            <div></div>
            <Button
              variant="outline"
              size="lg"
              className="h-16 text-2xl font-semibold"
              onClick={() => handleNumberPress('0')}
            >
              0
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-16"
              onClick={handleDelete}
            >
              <Delete className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinLock;
