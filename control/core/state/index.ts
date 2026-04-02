// State module structure for Sayana-genesis

// Interfaces
interface IState {
    set(key: string, value: any): void;
    get(key: string): any;
    reset(): void;
}

// Types
type StateKey = string;
type StateValue = any;

type StateChangeListener = (key: StateKey, value: StateValue) => void;

// Classes
class State implements IState {
    private state: Record<StateKey, StateValue>;
    private listeners: StateChangeListener[];

    constructor() {
        this.state = {};
        this.listeners = [];
    }

    set(key: StateKey, value: StateValue): void {
        this.state[key] = value;
        this.notifyListeners(key, value);
    }

    get(key: StateKey): StateValue {
        return this.state[key];
    }

    reset(): void {
        this.state = {};
        this.listeners = [];
    }

    addListener(listener: StateChangeListener): void {
        this.listeners.push(listener);
    }

    private notifyListeners(key: StateKey, value: StateValue): void {
        this.listeners.forEach(listener => listener(key, value));
    }
}

// Exporting the State class and the interface for external usage
export { State, IState };