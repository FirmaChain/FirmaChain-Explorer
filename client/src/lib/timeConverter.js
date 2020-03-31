

const timeConverter = (time, showFull) => {
  if(showFull) {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const date = d.getDate();
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();

    let str = `${year}/${month.toString().padStart(2, '0')}/${date.toString().padStart(2, '0')}`;
    if(showFull)
      str += ` ${hours}:${minutes}:${seconds}`;

    return {id: '_text', values: {text: str}};
  }

  // Incase that time unit is "ms"
  let timeString = new Date(time);
  timeString = timeString.getTime();

  if (timeString.toString().length === 13) timeString = Math.floor(timeString / 1000);
  const timeGap = Math.floor(Date.now() / 1000) - timeString;

  switch (true) {
    case (timeGap < 0):
      return {id: 'secondsAgo', values: {num: 0}};
    case (timeGap < 60):
      return {id: 'secondsAgo', values: {num: timeGap}};
    case (timeGap < 60 * 60):
      return {id: 'minutesAgo', values: {num: Math.floor(timeGap / 60)}};
    case (timeGap < 60 * 60 * 24):
      return {id: 'minutesAgo', values: {num: Math.floor(timeGap / 60 / 60)}};
    // case (timeGap < 60 * 60 * 24 * 30):
    //   return `${Math.floor(timeGap / 60 / 60 / 24)} day ago`;
    // case (timeGap < 60 * 60 * 24 * 30 * 12):
    //   return `${Math.floor(timeGap / 60 / 60 / 24 / 30)} mo ago`;
    // case (timeGap >= 60 * 60 * 24 * 30 * 12):
    //   return `${Math.floor(timeGap / 60 / 60 / 24 / 30 / 12)} yr ago`;
    default:
      const d = new Date();
      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      const date = d.getDate();

      let str = `${year}/${month.toString().padStart(2, '0')}/${date.toString().padStart(2, '0')}`;

      return {id: '_text', values: {text: str}};
  }
};

export default timeConverter;
