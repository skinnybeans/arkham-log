import { Subject } from 'rxjs';


export class ZealotProgressService {
    private interrogated: string[] = ['William Blake', 'Mr Smith'];
    private escaped: string[] = [];

    interrogatedChanged = new Subject();
    escapedChanged = new Subject();

    getInterrogatedCultists() {
        return this.interrogated.slice();
    }

    getEscapedCultists() {
        return this.escaped.slice();
    }

    addInterrogatedCultist(name: string) {
        this.interrogated.push(name);
        this.interrogatedChanged.next();
    }

    removeInterrogatedCultist(id: number) {
        this.interrogated.splice(id, 1);
        this.interrogatedChanged.next();
    }

    addEscapedCultist(name: string) {
        this.escaped.push(name);
        this.escapedChanged.next();
    }

    removeEscapedCultist(id: number) {
        this.escaped.splice(id, 1);
        this.escapedChanged.next();
    }
}
