import {validateInput} from './utils/validationFunctions';
import calculateFinalDueDate from './utils/offsetFunctions';

const getWorkingHoursLeftToday = (submition:Date) => {
  const currentMinutes =
    submition.getUTCHours() * 60 + submition.getUTCMinutes();
  const endOfWorkDay = 17 * 60;
  return Math.max(0, endOfWorkDay - currentMinutes) / 60;
};

export const calculateDueDate = (submit:string, hoursUntilDue:number) => {
  try {

  const submition = validateInput(submit, hoursUntilDue);
  const workingHoursLeftToday = getWorkingHoursLeftToday(submition);

  // No need to calculate an offset if turnaround time can fit in the same working day
  if (hoursUntilDue <= workingHoursLeftToday) {
    submition.setUTCMinutes(submition.getUTCMinutes() + hoursUntilDue * 60);
    return submition;
  }

  hoursUntilDue -= workingHoursLeftToday;

  submition.setUTCHours(17, 0, 0, 0);

  const dueDate = calculateFinalDueDate(submition,hoursUntilDue);

  return dueDate;
} catch(err: unknown) {
  if (err instanceof Error) {
    console.error('Validation failed:', err.message);
  } else {
    console.error('Validation failed:', String(err));
  }
  process.exit(1);
};
}
const input = '2025-03-28T14:30:00Z';
const turnaround = 24

const value = calculateDueDate(input, turnaround);
console.log(value);