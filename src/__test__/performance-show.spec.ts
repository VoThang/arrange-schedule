import "jest";
import { PerformanceShow } from "../domain/entity/performance";
import { PerformanceService } from "../service/performance-service";

describe("Test arrange schedule", () => {
  it("Should arrange schedule in case start time in range correctly", async () => {
    // arrange
    const performanceService = new PerformanceService();
    const performanceData: PerformanceShow[] = [
      {
        id: "1",
        band: "Soundgarden",
        start: "1993-05-25T02:00:00Z",
        finish: "1993-05-25T02:50:00Z",
        priority: 5,
        type: "Origin"
      },
      {
        id: "2",
        band: "Pearl Jam",
        start: "1993-05-25T02:15:00Z",
        finish: "1993-05-25T02:35:00Z",
        priority: 9,
        type: "Origin"
      }
    ];

    // action
    const sortedPerformanceShow = performanceService.arrange(performanceData);

    // assert
    expect(sortedPerformanceShow[0].band).toEqual("Soundgarden");
    expect(sortedPerformanceShow[0].start).toEqual("1993-05-25T02:00:00Z");

    expect(sortedPerformanceShow[1].band).toEqual("Pearl Jam");
    expect(sortedPerformanceShow[1].start).toEqual("1993-05-25T02:15:00Z");

    expect(sortedPerformanceShow[2].band).toEqual("Soundgarden");
    expect(sortedPerformanceShow[2].start).toEqual("1993-05-25T02:35:00Z");
  });

  it("Should arrange schedule in case end time in range correctly", async () => {
    // arrange
    const performanceService = new PerformanceService();
    const performanceData: PerformanceShow[] = [
      {
        id: "1",
        band: "Soundgarden",
        start: "1993-05-25T02:00:00Z",
        finish: "1993-05-25T02:50:00Z",
        priority: 5,
        type: "Origin"
      },
      {
        id: "2",
        band: "Pearl Jam",
        start: "1993-05-25T01:30:00Z",
        finish: "1993-05-25T02:35:00Z",
        priority: 9,
        type: "Origin"
      }
    ];

    // action
    const sortedPerformanceShow = performanceService.arrange(performanceData);

    // assert
    expect(sortedPerformanceShow[0].band).toEqual("Pearl Jam");
    expect(sortedPerformanceShow[0].start).toEqual("1993-05-25T01:30:00Z");

    expect(sortedPerformanceShow[1].band).toEqual("Soundgarden");
    expect(sortedPerformanceShow[1].start).toEqual("1993-05-25T02:35:00Z");
  });

  it("Should arrange schedule in case contains time range correctly", async () => {
    // arrange
    const performanceService = new PerformanceService();
    const performanceData: PerformanceShow[] = [
      {
        id: "1",
        band: "Soundgarden",
        start: "1993-05-25T02:00:00Z",
        finish: "1993-05-25T02:50:00Z",
        priority: 5,
        type: "Origin"
      },
      {
        id: "2",
        band: "Pearl Jam",
        start: "1993-05-25T01:30:00Z",
        finish: "1993-05-25T03:00:00Z",
        priority: 9,
        type: "Origin"
      }
    ];

    // action
    const sortedPerformanceShow = performanceService.arrange(performanceData);

    // assert
    expect(sortedPerformanceShow.length).toEqual(1);
    expect(sortedPerformanceShow[0].band).toEqual("Pearl Jam");
    expect(sortedPerformanceShow[0].start).toEqual("1993-05-25T01:30:00Z");
    expect(sortedPerformanceShow[0].finish).toEqual("1993-05-25T03:00:00Z");
  });

  it("Should arrange schedule in case contained in range correctly", async () => {
    // arrange
    const performanceService = new PerformanceService();
    const performanceData: PerformanceShow[] = [
      {
        id: "1",
        band: "Soundgarden",
        start: "1993-05-25T02:00:00Z",
        finish: "1993-05-25T02:50:00Z",
        priority: 5,
        type: "Origin"
      },
      {
        id: "2",
        band: "Pearl Jam",
        start: "1993-05-25T02:10:00Z",
        finish: "1993-05-25T02:30:00Z",
        priority: 9,
        type: "Origin"
      }
    ];

    // action
    const sortedPerformanceShow = performanceService.arrange(performanceData);

    // assert
    expect(sortedPerformanceShow.length).toEqual(3);
    expect(sortedPerformanceShow[0].band).toEqual("Soundgarden");
    expect(sortedPerformanceShow[0].start).toEqual("1993-05-25T02:00:00Z");
    expect(sortedPerformanceShow[0].finish).toEqual("1993-05-25T02:10:00Z");

    expect(sortedPerformanceShow[1].band).toEqual("Pearl Jam");
    expect(sortedPerformanceShow[1].start).toEqual("1993-05-25T02:10:00Z");
    expect(sortedPerformanceShow[1].finish).toEqual("1993-05-25T02:30:00Z");

    expect(sortedPerformanceShow[2].band).toEqual("Soundgarden");
    expect(sortedPerformanceShow[2].start).toEqual("1993-05-25T02:30:00Z");
    expect(sortedPerformanceShow[2].finish).toEqual("1993-05-25T02:50:00Z");
  });

  it("Should arrange schedule in case more than 2 shows correctly", async () => {
    // arrange
    const performanceService = new PerformanceService();
    const performanceData: PerformanceShow[] = [
      {
        id: "1",
        band: "Soundgarden",
        start: "1993-05-25T02:00:00Z",
        finish: "1993-05-25T02:50:00Z",
        priority: 5,
        type: "Origin"
      },
      {
        id: "2",
        band: "Pearl Jam",
        start: "1993-05-25T02:10:00Z",
        finish: "1993-05-25T02:30:00Z",
        priority: 9,
        type: "Origin"
      },
      {
        id: "3",
        band: "Linkin Park",
        start: "1993-05-25T02:15:00Z",
        finish: "1993-05-25T02:25:00Z",
        priority: 10,
        type: "Origin"
      }
    ];

    // action
    const sortedPerformanceShow = performanceService.arrange(performanceData);

    // assert
    expect(sortedPerformanceShow.length).toEqual(5);
    expect(sortedPerformanceShow[0].band).toEqual("Soundgarden");
    expect(sortedPerformanceShow[0].start).toEqual("1993-05-25T02:00:00Z");
    expect(sortedPerformanceShow[0].finish).toEqual("1993-05-25T02:10:00Z");

    expect(sortedPerformanceShow[1].band).toEqual("Pearl Jam");
    expect(sortedPerformanceShow[1].start).toEqual("1993-05-25T02:10:00Z");
    expect(sortedPerformanceShow[1].finish).toEqual("1993-05-25T02:15:00Z");

    expect(sortedPerformanceShow[2].band).toEqual("Linkin Park");
    expect(sortedPerformanceShow[2].start).toEqual("1993-05-25T02:15:00Z");
    expect(sortedPerformanceShow[2].finish).toEqual("1993-05-25T02:25:00Z");

    expect(sortedPerformanceShow[3].band).toEqual("Pearl Jam");
    expect(sortedPerformanceShow[3].start).toEqual("1993-05-25T02:25:00Z");
    expect(sortedPerformanceShow[3].finish).toEqual("1993-05-25T02:30:00Z");

    expect(sortedPerformanceShow[4].band).toEqual("Soundgarden");
    expect(sortedPerformanceShow[4].start).toEqual("1993-05-25T02:30:00Z");
    expect(sortedPerformanceShow[4].finish).toEqual("1993-05-25T02:50:00Z");
  });
});
