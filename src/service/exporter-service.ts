import { PerformanceShow } from "../domain/entity/performance";
import { IExporterService } from "./iexporter-service";
import * as fs from "fs-extra";
import * as path from "path";
import { tranforms } from "../utilities/collection";

export class ExporterService implements IExporterService {
  private readonly _outputPath: string;
  private readonly _inputPath: string;

  constructor(input: string, output: string) {
    this._inputPath = input;
    this._outputPath = output;
  }

  public import(): Promise<PerformanceShow[]> {
    return new Promise<PerformanceShow[]>((resolve, reject) => {
      fs.readJSON(this._inputPath)
        .then(data => {
          const performances = data as PerformanceShow[];
          return resolve(tranforms(performances));
        })
        .catch(error => {
          reject(`Import: ${error.toString()}`);
        });
    });
  }

  public export(performances: PerformanceShow[]) {
    const fields = ["id", "type"];
    performances.forEach(item => {
      fields.forEach(f => {
        delete item[f];
      });
    });

    return new Promise<void>((resolve, reject) => {
      fs.writeFile(this._outputPath, JSON.stringify(performances, null, 4))
        .then(() => {
          console.log(`export to: ${this._outputPath} done!`);
        })
        .catch(error => {
          reject(`Import: ${error.toString()}`);
        });
    });
  }
}
