import mongoose from 'mongoose';
import { getConfigurationValue, configurationFieldNames } from '../configuration/index.js';
import { logger } from '../logging/logger.js';

export async function connect() {
    const mongoUser = getConfigurationValue(configurationFieldNames.mongoUser);
    const mongoPassword = getConfigurationValue(configurationFieldNames.mongoPassword);
    const mongoServer = getConfigurationValue(configurationFieldNames.mongoServer);
    const mongoPort = getConfigurationValue(configurationFieldNames.mongoPort);
    const mongoDatabase = getConfigurationValue(configurationFieldNames.mongoDatabase);
    try {
        await mongoose.connect(`mongodb://${mongoUser}:${mongoPassword}@${mongoServer}:${mongoPort}/${mongoDatabase}`);
    } catch (error) {
        logger.error(error);
    }
}