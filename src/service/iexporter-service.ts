import { PerformanceShow } from "../domain/entity/performance";

export interface IExporterService {
  import: () => Promise<PerformanceShow[]>;
  export: (performances: PerformanceShow[]) => Promise<void>;
}
