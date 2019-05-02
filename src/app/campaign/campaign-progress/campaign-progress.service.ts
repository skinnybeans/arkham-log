import { EventEmitter } from '@angular/core';

export class CampaignProgressService {
    private notes: string[] = ['some note about the campaign so far...', 'and another note'];
    notesChanged = new EventEmitter();  // trigger event when the notes are changed.

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
}
