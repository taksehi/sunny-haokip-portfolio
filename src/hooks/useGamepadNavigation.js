import { useEffect, useState } from 'react';
import soundFX from '../utils/soundEffects';

export function useGamepadNavigation({ onToggleMode, activeMode, closeModal, isModalOpen }) {
  const [gamepadConnected, setGamepadConnected] = useState(false);
  const [gamepadId, setGamepadId] = useState('');

  useEffect(() => {
    let animId;
    let lastButtonState = {};
    let lastScrollTime = 0;

    const handleConnect = (e) => {
      setGamepadConnected(true);
      setGamepadId(e.gamepad.id || 'Controller');
    };

    const handleDisconnect = () => {
      const pads = navigator.getGamepads ? navigator.getGamepads() : [];
      const hasAny = Array.from(pads).some(p => p !== null);
      setGamepadConnected(hasAny);
    };

    window.addEventListener('gamepadconnected', handleConnect);
    window.addEventListener('gamepaddisconnected', handleDisconnect);

    const pollGamepad = () => {
      const pads = navigator.getGamepads ? navigator.getGamepads() : [];
      const pad = Array.from(pads).find(p => p !== null);

      if (pad) {
        if (!gamepadConnected) {
          setGamepadConnected(true);
          setGamepadId(pad.id || 'Controller');
        }

        const now = Date.now();

        // 1. D-Pad / Left Stick Vertical Scrolling
        // Axis 1: Left Stick Y (-1 is Up, 1 is Down)
        // Button 12: D-Pad Up, Button 13: D-Pad Down
        const stickY = pad.axes[1] || 0;
        const dpadUp = pad.buttons[12]?.pressed;
        const dpadDown = pad.buttons[13]?.pressed;

        if (now - lastScrollTime > 30) {
          if (stickY > 0.3 || dpadDown) {
            window.scrollBy({ top: 18, behavior: 'instant' });
            lastScrollTime = now;
          } else if (stickY < -0.3 || dpadUp) {
            window.scrollBy({ top: -18, behavior: 'instant' });
            lastScrollTime = now;
          }
        }

        // Helper for single button press (debounce edge trigger)
        const isButtonPressed = (btnIndex) => {
          const pressed = pad.buttons[btnIndex]?.pressed;
          const wasPressed = lastButtonState[btnIndex];
          lastButtonState[btnIndex] = pressed;
          return pressed && !wasPressed;
        };

        // 2. Button B (Circle on PS / B on Xbox / Button 1): Close Modal
        if (isButtonPressed(1)) {
          if (isModalOpen && closeModal) {
            closeModal();
            soundFX.playMechanicalClick();
          }
        }

        // 3. LB / RB (Buttons 4 and 5): Switch Environment Mode
        if (isButtonPressed(4) || isButtonPressed(5)) {
          if (onToggleMode) {
            const newMode = activeMode === 'dev' ? 'film' : 'dev';
            onToggleMode(newMode);
            soundFX.playMechanicalClick();
          }
        }
      }

      animId = requestAnimationFrame(pollGamepad);
    };

    animId = requestAnimationFrame(pollGamepad);

    return () => {
      window.removeEventListener('gamepadconnected', handleConnect);
      window.removeEventListener('gamepaddisconnected', handleDisconnect);
      cancelAnimationFrame(animId);
    };
  }, [onToggleMode, activeMode, closeModal, isModalOpen, gamepadConnected]);

  return { gamepadConnected, gamepadId };
}

export default useGamepadNavigation;
