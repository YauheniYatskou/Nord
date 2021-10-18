import { getDatabaseInstance } from './utils/database.js';
import { addEntityRoutes } from './routes/entity-routes.js';
import { getExpressInstance } from './utils/express.js';
import { getConfigurationValue } from './configuration/get-configuration-value.js';
import { configurationFieldNames } from './configuration/configuration-field-names.js';
import morgan from 'morgan';
import { logger } from './logging/logger.js';


const app = getExpressInstance();
const version = getConfigurationValue(configurationFieldNames.version);
const environment = getConfigurationValue(configurationFieldNames.environment);
const message = `Nord webapi of version '${version}' running in '${environment}' environment.`;
app.use(morgan('combined', { stream: logger.stream }));
const database = await getDatabaseInstance();

app.get('/', (request, response) => {
    response.send(message);
});

addEntityRoutes(app);

app.get('/goal', (request, response, next) => {
    try {
        response.send(database.data.goals);
    } catch (error) {
        next(error);
    }
});

app.get('/file', (request, response, next) => {
    try {
        response.send(database.data.files);
    } catch (error) {
        next(error);
    }
});

app.get('/list', (request, response, next) => {
    try {
        response.send(database.data.lists);
    } catch (error) {
        next(error);
    }
});

const port = getConfigurationValue(configurationFieldNames.port);
app.listen(port, () => {
    logger.info(message);
});
