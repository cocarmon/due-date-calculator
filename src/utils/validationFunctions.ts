// Verify that the date is in format 2025-03-31T09:01:00Z
const isValidString = (input: string) => {
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(input);
};

// Verify that the day lands between Monday(1) & Friday(5)
export const isWorkDay = (date:Date) => {
  const startOfWorkWeek = 1;
  const endOfWorkWeek = 5;
  const day = date.getUTCDay();
  return day >= startOfWorkWeek && day <= endOfWorkWeek;
};

// Verify that the time is between 9AM & 5PM, it's noninclusive
const isWorkHours = (date:Date) => {
  const startOfWorkDay = 9 * 60;
  const endOfWorkDay = 17 * 60;
  const currentTime = date.getUTCHours() * 60 + date.getUTCMinutes();
  return currentTime > startOfWorkDay && currentTime < endOfWorkDay;
};

const isValidDay = (turnaround:number) => {
  return typeof turnaround === 'number' && turnaround >= 0;
};

export const validateInput = (submit:string, turnaround:number) => {
  const errors = [];
  if (!isValidString(submit)) {
    errors.push('Not a valid date string.');
  }

  const date = new Date(submit);

  if (!isWorkDay(date)) {
    errors.push('Not a valid work day.');
  }
  if (!isWorkHours(date)) {
    errors.push('Not a valid work time.');
  }
  if (!isValidDay(turnaround)) {
    errors.push('Turnaround expects a positive number');
  }

  if (errors.length > 0) {
    throw new Error(errors.join('\n'));
  }

  return date;
}
