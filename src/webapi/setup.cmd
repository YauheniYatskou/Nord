docker-compose -p entity-api down --remove-orphans
docker-compose -p entity-api build --force-rm --no-cache --parallel
docker-compose -p entity-api up -d
pause