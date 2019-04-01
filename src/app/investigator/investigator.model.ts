export class Investigator {
    public name: string;
    public mentalTrauma: number;
    public physicalTrauma: number;
    public notes: string[];

    constructor(name: string = '', mentalTrauma: number = 0, physicalTrauma: number = 0, notes: string[] = []) {
        this.name = name;
        this.mentalTrauma = mentalTrauma;
        this.physicalTrauma = physicalTrauma;
        this.notes = notes;
    }
}
