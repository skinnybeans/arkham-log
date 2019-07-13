export enum LogLevel {
    info = 'info',
    warning = 'warning',
    error = 'error'
}

// For logging errors
export interface LogError {
    level: LogLevel;
    url: string;        // the router url
    action: string;     // what action was being performed eg deleteCampaign, getInvestigators
    code: string;       // Error code returned
    type: string;       // Type of error
    message: string;    // Detailed error message
    stack: string;      // Stack trace at time of the error
}
// For logging info and warnings
export interface LogEvent {
    level: LogLevel;
    url: string;
    action: string;
    message: string;
}
