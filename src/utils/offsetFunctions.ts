import { isWorkDay } from "./validationFunctions";

// By calculating an offset for each day we are changing the days to only be 8 hrs long
const calculateOffsetForEachDay = (hoursUntilDue:number) => {
  // The amount of hours between 5pm and 9am
  const offset = 16;
  const dayLength = 8;
  const skippedHours = offset * (Math.floor(hoursUntilDue / dayLength) + 1);
  return hoursUntilDue + skippedHours;
};

// This allows us to add in an offset of 24hrs for each weekend day
const calculateOffsetForEachWeekend = (submition:Date, futureDueDate:Date) => {
  let extraHours = 0;
  const tempDate = new Date(submition);
  while (tempDate < futureDueDate) {
    if (!isWorkDay(tempDate)) {
      extraHours += 24;
    }
    tempDate.setUTCDate(tempDate.getUTCDate() + 1);
  }
  return new Date(futureDueDate.getTime() + extraHours * 60 * 60 * 1000);
};

// Even after calculating the weekend offset and day offset still a chance we land on a weekend
const increaseDayIfWeekend = (futureDueDate:Date) => {
  while (!isWorkDay(futureDueDate)) {
    futureDueDate.setUTCDate(futureDueDate.getUTCDate() + 1);
  }
};

export default function calculateFinalDueDate(submition:Date,hoursUntilDue:number) {
    const offsetForEachDay = calculateOffsetForEachDay(hoursUntilDue);

    const milliseconds = offsetForEachDay * 60 * 60 * 1000;
    const futureWithDayOffsets = new Date(submition.getTime() + milliseconds);

    const futureWithAllOffsets = calculateOffsetForEachWeekend(submition, futureWithDayOffsets);
    increaseDayIfWeekend(futureWithAllOffsets);

    return futureWithAllOffsets;
};