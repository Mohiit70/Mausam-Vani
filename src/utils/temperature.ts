export const convertTemperature = (temp: number, unit: 'C' | 'F'): number => {
    return unit === 'C' ? temp : (temp * 9/5) + 32;
  };s