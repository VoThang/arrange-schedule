import { PerformanceShow } from "../domain/entity/performance";

export interface IPerformanceService {
  arrange: (performances: PerformanceShow[]) => PerformanceShow[];
}
