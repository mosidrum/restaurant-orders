export const generateRandomDate = (): Date => {
  return new Date(
    2000 + Math.floor(Math.random() * 51),
    Math.floor(Math.random() * 12),
    Math.floor(Math.random() * 28) + 1,
    Math.floor(Math.random() * 24),
    Math.floor(Math.random() * 60)
  );
};
