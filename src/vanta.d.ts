// Type declarations for Vanta.js
export {};

declare global {
  interface Window {
    VANTA: {
      WAVES: (config: {
        el: string | HTMLElement;
        THREE: typeof THREE;
        mouseControls?: boolean;
        touchControls?: boolean;
        gyroControls?: boolean;
        minHeight?: number;
        minWidth?: number;
        scale?: number;
        scaleMobile?: number;
        color?: number;
        shininess?: number;
        waveHeight?: number;
        waveSpeed?: number;
        zoom?: number;
      }) => {
        destroy: () => void;
      };
      current?: unknown;
      register: (name: string, effect: unknown) => void;
    };
  }
}
