export const clamp = (value: number, lower: number, upper: number) => {
    'worklet';
    return Math.min(Math.max(value, lower), upper);
  };
  