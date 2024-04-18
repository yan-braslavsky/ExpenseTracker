export function getFormatedDate(date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getDateMinusDays(date, days) {
  // return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
  return new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
}

export function isWithinDays(date, days) {
  const today = new Date();
  const daysAgo = getDateMinusDays(today, days);
  return date > daysAgo;
}

