import { getDatabaseInstance } from './utils/database.js';
import { log } from './utils/log.js';
import { addEntityRoutes } from './routes/entity-routes.js';
import { getExpressInstance } from './utils/express.js';
import { getConfigValue } from './utils/configuration.js';
import { configFieldNames } from './utils/constants.js';

const app = getExpressInstance();
const version = getConfigValue(configFieldNames.version);
const message = `webapi version '${version}' successfully running`;
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

const port = getConfigValue(configFieldNames.port);
app.listen(port, () => {
    log(message);
});
