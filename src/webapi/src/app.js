import { getExpressInstance } from './core/api/express.js';
import { connect } from './core/database/database.js';
import { logger } from './core/logging/logger.js';

try {
    getExpressInstance();
    await connect();
} catch (error) {
    logger.error(error);
}