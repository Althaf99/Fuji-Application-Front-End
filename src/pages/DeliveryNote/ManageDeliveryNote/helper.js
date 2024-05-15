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

function reverseFormatDate(originalDateStr) {
  if (originalDateStr) {
    const originalTimeStr = "11:53:00";

    const [day, month, year] = originalDateStr
      .split("-")
      .map((part) => parseInt(part, 10));

    const [hours, minutes, seconds] = originalTimeStr
      .split(":")
      .map((part) => parseInt(part, 10));

    const dateObj = new Date(year, month - 1, day, hours, minutes, seconds);
    const formattedDateStr = dateObj.toString();

    return formattedDateStr;
  }
  return new Date();
}

export { formatDate, reverseFormatDate };
