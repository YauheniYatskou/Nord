import {config} from 'dotenv';
import process from 'process';

config();

export const getConfigValue = (field) => process.env[field];