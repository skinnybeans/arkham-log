export class Investigator {
    public mentalTrauma: number;
    public physicalTrauma: number;
    public notes: string[];

    constructor(mentalTrauma: number, physicalTrauma: number, notes: string[]) {
        this.mentalTrauma = mentalTrauma;
        this.physicalTrauma = physicalTrauma;
        this.notes = notes;
    }
}
