function formatDate(date) {
  const dateObj = new Date(date ? date : new Date());

  // Get the day, month, and year components from the date object
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1; // Months are zero-based, so add 1
  const year = dateObj.getFullYear();

  // Format the components as "DD-MM-YYYY"
  const formattedDate = `${day < 10 ? "0" + day : day}-${
    month < 10 ? "0" + month : month
  }-${year}`;

  return formattedDate;
}

function changeIntoMonths(date) {
  const [day, month, year] = date.split("-");
  const dateObject = new Date(year, month - 1, day);
  if (isNaN(dateObject)) {
    return null; // Return null for invalid dates
  }
  const monthYear = dateObject.toLocaleString("default", { month: "long", year: "numeric" });
  return monthYear; // Returns format like "January 2023"
}

export { formatDate, changeIntoMonths };
