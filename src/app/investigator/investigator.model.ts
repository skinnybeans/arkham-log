export class Investigator {
    public name: string;
    public mentalTrauma: number;
    public physicalTrauma: number;
    public notes: string[];

    constructor(name: string, mentalTrauma: number, physicalTrauma: number, notes: string[] = []) {
        this.name = name;
        this.mentalTrauma = mentalTrauma;
        this.physicalTrauma = physicalTrauma;
        this.notes = notes;
    }
}
