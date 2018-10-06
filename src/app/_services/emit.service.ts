import { Injectable,EventEmitter } from '@angular/core';
@Injectable()
export class EmitService {
    eventMitter: EventEmitter<any> = new EventEmitter();

    eventMitterMenuClick: EventEmitter<any> = new EventEmitter();

    constructor() { }
    emitChangeEvent(value) {
        this.eventMitter.emit(value);
    }
    getChangeEmitter() {
        return this.eventMitter;
    }

    emitMenuEvent(value) {
        this.eventMitterMenuClick.next(value);
    }
    getMenuClickEmitter() {
        return this.eventMitterMenuClick;
    }
}