import NepaliDate from 'nepali-date-converter';

export function convertBSToAD(year: string, month: string, date: string) {
  try {
    // Month index in the library is 0-based (0-11)
    const monthIndex = nepaliMonths.indexOf(month);
    if (monthIndex === -1) throw new Error('Invalid month');

    const nepaliDate = new NepaliDate(parseInt(year), monthIndex, parseInt(date));
    const jsDate = nepaliDate.toJsDate();

    return {
      success: true,
      result: {
        year: jsDate.getFullYear(),
        month: jsDate.getMonth() + 1, // Convert 0-based month to 1-based
        date: jsDate.getDate(),
        formatted: jsDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      },
    };
  } catch {
    return {
      success: false,
      error: 'Invalid date or conversion error',
    };
  }
}

export function convertADToBS(date: Date) {
  try {
    const nepaliDate = new NepaliDate(date);
    const { year, month, date: day } = nepaliDate.getBS();

    return {
      success: true,
      result: {
        year,
        month: nepaliMonths[month], // Convert month index to month name
        date: day,
        formatted: nepaliDate.format('DD MMMM YYYY'),
      },
    };
  } catch {
    return {
      success: false,
      error: 'Invalid date or conversion error',
    };
  }
}

// Nepali months in English
export const nepaliMonths = [
  'Baisakh',
  'Jestha',
  'Ashadh',
  'Shrawan',
  'Bhadra',
  'Ashwin',
  'Kartik',
  'Mangsir',
  'Poush',
  'Magh',
  'Falgun',
  'Chaitra',
];

// Get current Nepali date
export function getCurrentNepaliDate() {
  const nepaliDate = new NepaliDate();
  const { year, month, date } = nepaliDate.getBS();

  return {
    year: year.toString(),
    month: nepaliMonths[month],
    date: date.toString(),
    formatted: nepaliDate.format('DD MMMM YYYY'),
  };
}
