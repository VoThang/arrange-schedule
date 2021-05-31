import { PerformanceShow } from "../domain/entity/performance";
import * as moment from "moment";

const byPriority = (a: PerformanceShow, b: PerformanceShow) => {
  return a.priority - b.priority;
};

const byStart = (a: PerformanceShow, b: PerformanceShow) => {
  const aStart = moment(a.start);
  const bStart = moment(b.start);

  if (aStart.isAfter(bStart)) {
    return 1;
  }

  if (aStart.isBefore(bStart)) {
    return -1;
  }

  return 0;
};

const byFinish = (a: PerformanceShow, b: PerformanceShow) => {
  const aFinish = moment(a.finish);
  const bFinish = moment(b.finish);

  if (aFinish.isAfter(bFinish)) {
    return 1;
  }

  if (aFinish.isBefore(bFinish)) {
    return -1;
  }

  return 0;
};

export { byPriority, byStart, byFinish };
