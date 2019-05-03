import { EventEmitter } from '@angular/core';

import { Mission } from './mission.model';

export class CampaignProgressService {
    private notes: string[] = ['some note about the campaign so far...', 'and another note'];
    notesChanged = new EventEmitter();  // trigger event when the notes are changed.

    private missions: Mission[] = [
        {name: 'mission 2', completed: false, experience: 0, sequence: 2},
        {name: 'mission 1', completed: true, experience: 0, sequence: 1},
        {name: 'mission 3', completed: false, experience: 0, sequence: 3},
      ];

    constructor() {
        // Sort the mission array here for now, will need to move later
        this.missions.sort((a: Mission, b: Mission) => {
            return a.sequence - b.sequence;
        });
    }

    getNotes() {
        return this.notes.slice();
    }

    addNote(note: string) {
        this.notes.push(note);
        this.notesChanged.emit();
    }

    removeNote(id: number) {
        this.notes.splice(id, 1);
        this.notesChanged.emit();
    }

    getMissions() {
        return this.missions.slice();
    }

    updateMissionProgress(id: number, isCompleted: boolean) {
        this.missions[id].completed = isCompleted;
    }

    updateMissionExperience(id: number, experience: number) {
        this.missions[id].experience = experience;
    }
}
