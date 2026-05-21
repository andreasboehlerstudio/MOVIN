export const getYearsOfExperience = () => {
  const startYear = 1998;
  const currentYear = new Date().getFullYear();
  return currentYear - startYear;
};
