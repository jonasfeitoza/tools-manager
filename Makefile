dev-up:
	docker-compose -f docker-compose.dev.yml up -d
	make dev-migration

dev-down:
	docker-compose -f docker-compose.dev.yml down

dev-logs:
	docker-compose -f docker-compose.dev.yml logs -f app

dev-build:
	docker-compose -f docker-compose.dev.yml build

dev-bash:
	docker-compose -f docker-compose.dev.yml exec app bash

dev-test:
	docker-compose -f docker-compose.dev.yml exec app npm run test

prod-up:
	docker-compose -f docker-compose.prod.yml up --build -d

prod-down:
	docker-compose -f docker-compose.prod.yml down

prod-logs:
	docker-compose -f docker-compose.prod.yml logs -f app

prod-build:
	docker-compose -f docker-compose.prod.yml build

prod-bash:
	docker-compose -f docker-compose.prod.yml exec app bash

dev-migration:
	docker-compose -f docker-compose.dev.yml exec app npx prisma migrate dev --name init

prod-migration:
	docker-compose -f docker-compose.prod.yml exec app npx prisma migrate deploy

get-version:
	@cat package.json | grep version package.json | sed 's/.*"version": "\(.*\)".*/\1/'
