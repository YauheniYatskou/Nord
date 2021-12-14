# Usage guide

## Running app locally w/ NodeJS and hot reload w/o docker

    1. Install NodeJS v16+
    2. Run the following commands in root repo folder

    ```bash
    rmdir node_modules /s /q
    npm ci
    npm run start
    ```

## Running app locally w/ docker w/o hot reload

    1. Install docker
    2. Run the following commands in root repo folder

    ```bash
    docker build . --force-rm --no-cache -t entity-api
    docker run --name entity-api -d --restart=always -p 4000:4000 entity-api
    ```
