// Clear form messages
function clearMessages(messages) {
  messages.forEach((msg) => {
    msg.classList.add("d-none");
  });
}
// Generate date validation reference
function dateValidRef() {
  // Today w/o timestamp
  const y = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );
  // Today minus 1ms
  const ref = new Date(y.setMilliseconds(y.getMilliseconds() - 1));
  return ref;
}
// Convert to user friendly date format
function friendlyDate(date) {
  let dateInput = new Date(date);
  let frdlyDate = dateInput.toDateString();
  return frdlyDate;
}
// Truncate description length on task card
function truncateString(str, num) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}
// Export
export { clearMessages, dateValidRef, friendlyDate, truncateString };
