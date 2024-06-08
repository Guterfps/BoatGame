
export class Events {
    private map = new Map<string, Set<CallableFunction>>; 
    
    AddEventNotify(event: string, notify: CallableFunction): void {
        if (!this.map.has(event)) {
            this.map.set(event, new Set<CallableFunction>);
        }

        this.map.get(event).add(notify);
    }

    RemoveEvent(event: string): void {
        this.map.delete(event);
    }

    RemoveNotify(event: string, notify: CallableFunction): void {
        this.map.get(event)?.delete(notify);
    }

    EventNotify(event: string, args: any | null): void {
        this.map.get(event)?.forEach((handle) => { handle(args) });
    }

    Clear(): void {
        this.map.clear();
    }
}