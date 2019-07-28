import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ZealotProgress } from './zealot-progress.model';

@Injectable({
    providedIn: 'root'
})
export class ZealotProgressService {
    private cultists = new ZealotProgress(['William Blake']);

    interrogatedChanged = new Subject();
    escapedChanged = new Subject();

    getInterrogatedCultists() {
        return this.cultists.interrogated.slice();
    }

    getEscapedCultists() {
        return this.cultists.escaped.slice();
    }

    addInterrogatedCultist(name: string) {
        this.cultists.interrogated.push(name);
        this.interrogatedChanged.next(this.cultists.interrogated.slice());
    }

    removeInterrogatedCultist(id: number) {
        this.cultists.interrogated.splice(id, 1);
        this.interrogatedChanged.next(this.cultists.interrogated.slice());
    }

    addEscapedCultist(name: string) {
        this.cultists.escaped.push(name);
        this.escapedChanged.next(this.cultists.escaped.slice());
    }

    removeEscapedCultist(id: number) {
        this.cultists.escaped.splice(id, 1);
        this.escapedChanged.next(this.cultists.escaped.slice());
    }
}
