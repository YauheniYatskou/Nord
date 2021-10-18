import {config} from 'dotenv';
import process from 'process';

config();

export const getConfigurationValue = (field) => process.env[field];