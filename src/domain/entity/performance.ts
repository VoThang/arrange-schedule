import { BaseEntity } from "./base-entity";

export class PerformanceShow extends BaseEntity {
    public band: string;
    public start: string; // ISO Date
    public finish: string;
    public priority: number;
    public type: "Origin" | "Modified"

    constructor() {
        super();
    }
}