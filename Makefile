.PHONY: test

up:
	docker-compose up --build
up-only:
	docker-compose up
build:
	docker-compose build
test:
	docker-compose run -e NODE_ENV=test backend bash -c "yarn test"