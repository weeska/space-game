import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { StructureType } from "./structures.entity";

@Injectable()
export class BuildTimeService {
    constructor(
        private configService: ConfigService
    ) {}
    
    getStructureBuildTime(structure: StructureType, level: number): number {
        return Math.max(1, 1000 * level * this.configService.getOrThrow<number>('universe.buildSpeedFactor'));
    }
}