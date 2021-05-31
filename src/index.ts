import { PerformanceService } from './service/performance-service';
import * as minimist from "minimist";
import * as path from "path";
import { ExporterService } from './service/exporter-service';

const handler = (func: (...paths: string[]) => Promise<void>) => {
    return async (inputPath: string, outputPath?: string) => {
        if (!outputPath) {
            outputPath = `./output/result.json`;
        }
        await func(inputPath, outputPath);
    }
}

const args = minimist(process.argv.slice(2));

handler(async (input: string, output: string) => {
    const exporterService = new ExporterService(input, output);
    const performanceService = new PerformanceService();
    const performances = await exporterService.import();
    const sortedShows = performanceService.arrange(performances);
    await exporterService.export(sortedShows);
})(args.inputPath, args.outputPath);