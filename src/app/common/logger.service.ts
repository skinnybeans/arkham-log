import { Injectable } from '@angular/core';


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
export class LoggerService {
    LogFirebaseError(error, url: string) {
        sumoLogger.log(
            { severity: 'error', name: error.name, code: error.code, message: error.message, stack: error.stack },
            { url }
        ).catch( err => {
            console.log('error logging to sumo');
            console.log(err);
        });
    }
}
