import moment from 'moment';

const formatHHmm = (
  time: string | number | undefined | null,
): string | undefined => {
  if (time === undefined || time === null) {
    return undefined;
  }

  return moment(time).format('HH:mm');
};

const dateUtils = { formatHHmm };

export default dateUtils;
