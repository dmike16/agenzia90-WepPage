import { Subject } from "rxjs";

/**
 * Simple logging utility
 * base on rxjs Subject<LogEntity>
 */
export enum LogLevel {
    FATAL = 0,
    ERROR = 1,
    INFO = 2,
    DEBUG = 3
}
/**
 * Log entiry structure
 */
export interface LogEntity {
    level: LogLevel;
    message: string;
    timestamp: number;
}
/**
 * Simple logger class
 */
export class Logger {
    get logging$(){
        return this.queue.asObservable();
    }

    private queue: Subject<LogEntity>;

    constructor(private name: string) { 
        this.queue = new Subject();
    }

    protected log(level: LogLevel, message: string , jsonData?: string){
        this.queue.next({
            level,
            message,
            timestamp: Date.now()
        });
    }

    debug(message: string, data?: string): void {
        this.log(LogLevel.DEBUG, message, data);
    }

    info(message: string, data?: string): void {
        this.log(LogLevel.INFO, message, data);
    }

    error(message: string, data?: string): void {
        this.log(LogLevel.ERROR, message, data);
    }

    fatal(message: string, data?: string): void {
        this.log(LogLevel.FATAL, message, data);
    }

    dispose(): void {
        this.queue.complete();
        this.queue.unsubscribe();
    }

    toString(): string {
        return `Logger<${this.name}>`;
    }
}