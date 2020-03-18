const timezoneMatcher = (utc) => {
  if(!utc)
    return;

  const offset = new Date().getTimezoneOffset();

  let date = new Date(utc);
  date = date.toISOString().replace(/T/g, ' ').replace(/\..*/g, '');
  date += ` (UTC+${Math.floor(-offset / 60)})`;

  return date;
};

export default timezoneMatcher;
