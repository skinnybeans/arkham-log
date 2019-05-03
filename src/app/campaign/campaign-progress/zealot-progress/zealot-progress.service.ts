import { EventEmitter } from '@angular/core';


export class ZealotProgressService {
    private interrogated: string[] = ['William Blake', 'Mr Smith'];
    private escaped: string[] = [];

    interrogatedChanged = new EventEmitter();
    escapedChanged = new EventEmitter();

    getInterrogatedCultists() {
        return this.interrogated.slice();
    }

    getEscapedCultists() {
        return this.escaped.slice();
    }

    addInterrogatedCultist(name: string) {
        this.interrogated.push(name);
        this.interrogatedChanged.emit();
    }

    removeInterrogatedCultist(id: number) {
        this.interrogated.splice(id, 1);
        this.interrogatedChanged.emit();
    }

    addEscapedCultist(name: string) {
        this.escaped.push(name);
        this.escapedChanged.emit();
    }

    removeEscapedCultist(id: number) {
        this.escaped.splice(id, 1);
        this.escapedChanged.emit();
    }
}
