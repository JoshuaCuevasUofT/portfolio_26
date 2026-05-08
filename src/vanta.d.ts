// Type declarations for Vanta.js
export {};

declare global {
  interface Window {
    VANTA: {
      WAVES: (config: {
        el: string | HTMLElement;
        THREE: any;
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
      current?: any;
      register: (name: string, effect: any) => void;
    };
  }
}