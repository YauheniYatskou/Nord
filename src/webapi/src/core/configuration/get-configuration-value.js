import process from 'process';

export const getConfigurationValue = (field) => process.env[field];
