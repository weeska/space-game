import { Injectable } from "@nestjs/common";
import { StructureType } from "./structures.entity";
import { IResources } from "./resources.entity";

@Injectable()
export class CostService {
    getStructureCost(structure: StructureType, level: number): IResources {
        return { metal: 3, crystal: 2, tritium: 1 };
    }
}