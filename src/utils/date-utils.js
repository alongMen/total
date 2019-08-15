import moment from 'moment';

export const formatBeijingDate = str => {
  const localTime = moment.utc(str).toDate();

  return moment(localTime).format('YYYY-MM-DD HH:mm:ss');
};
