# Usage guide

## Running app locally with hot reload via Node and npm

1. Install **NodeJS v16+** with **npm v8+**
2. Run the following commands in shell from current folder

    ```bash
    rmdir node_modules /s /q
    npm ci
    npm run start
    ```

## Running app locally w/o hot reload via docker

1. Install **docker**
2. Run the following commands in shell from current folder

    ```bash
    docker build . --force-rm --no-cache -t entity-api
    docker run --name entity-api -d --restart=always -p 4000:4000 entity-api
    ```

## Running app locally /w database w/o hot reload via docker-compose 

1. Install **docker** and **docker-compose**
2. Create `.env` file in current folder with variable from `.example.env` and strong cryptosecure values (if you are using Hyper-V containers and not WSL2 container, then `focal` with `nanoserver`)
3. Either run `setup.cmd` (`setup.sh` for **Linux** and **MacOS** machines) or run the following commands in shell from current folder

    ```bash
    docker-compose -p entity-api down --remove-orphans
    docker-compose -p entity-api build --force-rm --no-cache --parallel
    docker-compose -p entity-api up -d
    ```
