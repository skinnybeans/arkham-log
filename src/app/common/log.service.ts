import { Injectable } from '@angular/core';

import { LogError, LogEvent } from './log.model';


const SumoLogger = require('sumo-logger');

const opts = {
    endpoint: 'https://collectors.au.sumologic.com/receiver\
/v1/http/ZaVnC4dhaV1d433iVnVuph10fzy6acOKJYlmhV5cg_IejVVOwQa\
56kMcfxPDnnz3Y54epgiZkrL6w6WV_5xaz0vhpqY4Gx-k-paFSGZLm7f8QvKSna6qAA==',
};

// Instantiate the SumoLogger
const sumoLogger = new SumoLogger(opts);

@Injectable({
    providedIn: 'root'
})
export class LogService {
    LogError(error: LogError) {
        const {url, ...log} = error;
        sumoLogger.log(
            log,
            { url }).catch( (err: any) => {
            console.log('error logging to sumo');
            console.log(err);
        });
        sumoLogger.flushLogs();
    }

    LogEvent(event: LogEvent) {
        const { url, ...log } = event;
        sumoLogger.log(
            log,
            { url}
        ).catch((err: any) => {
            console.log('error logging to sumo');
            console.log(err);
        });
    }
}
