// This function takes a date in ISO format and returns an array with 2 elements: the date and the time. e.g. (2023-02-24T17:33:13Z) => [24/2/2023, 5:33PM] (note that it is converted to local timezone)

export default function formatDate(isoDate) {
  const dateObj = new Date(isoDate);
  const formattedDate = dateObj.toLocaleDateString();
  const time = dateObj.toLocaleTimeString(); // format the time according to the user's locale
  const [hours, minutes] = time.split(":"); // extract the hours and minutes from the time string
  const suffix = hours >= 12 ? "PM" : "AM"; // determine whether the time is AM or PM
  const formattedHours = hours % 12 || 12; // convert the hours to 12-hour format
  const formattedTime = `${formattedHours}:${minutes} ${suffix} (UTC)`; // combine the formatted time with the AM/PM suffix
  return [formattedDate, formattedTime];
}
