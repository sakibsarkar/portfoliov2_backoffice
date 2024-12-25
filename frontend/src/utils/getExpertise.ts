export const getExpertise = (expertice: number) => {
  // 0-50 > Beginner
  // 50-75 > Intermediate
  // 75-100 > Expert
  if (expertice <= 50) {
    return "Beginner";
  } else if (expertice > 50 && expertice <= 75) {
    return "Intermediate";
  } else {
    return "Expert";
  }
};
