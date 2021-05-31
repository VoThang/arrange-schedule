import { IPerformanceService } from "./iperformance-service";
import { byStart } from "./performance-utils";
import { PerformanceShow } from "../domain/entity/performance";
import * as moment from "moment";
import { OverlapTypeName } from "../utilities/const-values";
import { groupBy } from "../utilities/collection";

export class PerformanceService implements IPerformanceService {
  public arrange(performances: PerformanceShow[]): PerformanceShow[] {
    // const sortedPerformance = this.sortPerformanceByStart(performances);
    // console.log(sortedPerformance);
    const arrangedPerformanceShow = performances.reduce(
      (
        _: PerformanceShow[],
        current: PerformanceShow,
        currentIndex: number
      ) => {
        if (currentIndex < performances.length - 1) {
          const next = performances[currentIndex + 1];
          if (next.priority > current.priority) {
            const splitRange = this.splitTimeRange(next, current);
            const existingShow = this.findExist(_, splitRange);
            if (existingShow && existingShow.type === "Origin") {
              _.splice(
                _.findIndex(x => x.id === existingShow.id),
                1
              );
            }
            if (splitRange) {
              splitRange.forEach(item => {
                if (_.find(x => x.id === item.id)) {
                }
                _.push(item);
              });
            }
          }
        }

        return _;
      },
      [] as PerformanceShow[]
    );

    const sortedShows = this.sortPerformanceByStart(arrangedPerformanceShow);
    return sortedShows;
  }

  private findExist(
    source: PerformanceShow[],
    dest: PerformanceShow[]
  ): PerformanceShow | null {
    for (const x of dest) {
      for (const y of source) {
        if (y.id === x.id) {
          return y;
        }
      }
    }

    return null;
  }

  private findDuplicateShow(performances: PerformanceShow[]): string[] {
    const performanceGroupById = groupBy<PerformanceShow>(
      performances,
      (item: PerformanceShow) => item.id
    );
    const duplicatedIds = [];
    performanceGroupById.forEach((items, key) => {
      if (items.length > 1) {
        duplicatedIds.push(key);
      }
    });

    return duplicatedIds;
  }

  private sortPerformanceByStart(performances: PerformanceShow[]) {
    return performances.sort(byStart);
  }

  private findOverlappingType(
    performanceShowSource: PerformanceShow,
    performanceShowDest: PerformanceShow
  ): OverlapTypeName {
    const performanceShowSourceStart = moment(performanceShowSource.start);
    const performanceShowSourceFinish = moment(performanceShowSource.finish);
    const performanceShowDestStart = moment(performanceShowDest.start);
    const performanceShowDestFinish = moment(performanceShowDest.finish);

    if (
      performanceShowSourceStart.isAfter(performanceShowDestStart) &&
      performanceShowSourceStart.isBefore(performanceShowDestFinish) &&
      performanceShowSourceFinish.isAfter(performanceShowDestFinish)
    ) {
      return "StartInRange";
    }

    if (
      performanceShowSourceStart.isBefore(performanceShowDestStart) &&
      performanceShowSourceFinish.isAfter(performanceShowDestStart) &&
      performanceShowSourceFinish.isBefore(performanceShowDestFinish)
    ) {
      return "EndInRange";
    }

    if (
      performanceShowSourceStart.isBefore(performanceShowDestStart) &&
      performanceShowSourceFinish.isAfter(performanceShowDestFinish)
    ) {
      return "ContainsRange";
    }

    if (
      performanceShowSourceStart.isAfter(performanceShowDestStart) &&
      performanceShowSourceFinish.isBefore(performanceShowDestFinish)
    ) {
      return "ContainedInRange";
    }

    if (
      performanceShowSourceStart.isSame(performanceShowDestStart) &&
      performanceShowSourceFinish.isSame(performanceShowDestFinish)
    ) {
      return "RangeEqual";
    }

    return "None";
  }

  private splitTimeRange(
    performanceShowSource: PerformanceShow,
    performanceShowDest: PerformanceShow
  ): PerformanceShow[] {
    const overlapTypeName = this.findOverlappingType(
      performanceShowSource,
      performanceShowDest
    );
    switch (overlapTypeName) {
      case "StartInRange":
        return [
          {
            ...performanceShowDest,
            finish: performanceShowSource.start,
            type: "Modified"
          },
          performanceShowSource
        ];

      case "EndInRange":
        return [
          performanceShowSource,
          {
            ...performanceShowDest,
            start: performanceShowSource.finish,
            type: "Modified"
          }
        ];

      case "ContainedInRange":
        return [
          {
            ...performanceShowDest,
            finish: performanceShowSource.start,
            type: "Modified"
          },
          performanceShowSource,
          {
            ...performanceShowDest,
            start: performanceShowSource.finish,
            type: "Modified"
          }
        ];

      case "ContainsRange":
        return [
          {
            ...performanceShowSource,
            type: "Modified"
          }
        ];

      case "RangeEqual":
        return [
          {
            ...performanceShowSource,
            type: "Modified"
          }
        ];
      default:
        return null;
    }
  }
}
