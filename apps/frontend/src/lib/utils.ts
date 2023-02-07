export const joinComponents = (
  accumulator: React.ReactNode[],
  current: React.ReactNode
) => [...accumulator, accumulator.length ? ", " : "", current];
