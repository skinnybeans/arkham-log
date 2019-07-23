export class Investigator {

    constructor(
        public name: string = '',
        public mentalTrauma: number = 0,
        public physicalTrauma: number = 0,
        public notes: string[] = [],
        public id?: string) {}
}
