import moment from "moment";

export const hoge = (num) => {
  return num * 2;
}

// Date型をYYYYMMDDで返す
export const formatTime = (date) => {
  return moment(date).format("YYYYMMDD");
}

export default {
  hoge,
  formatTime,
};
