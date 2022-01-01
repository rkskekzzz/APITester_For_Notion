# Vars =========================

PROJECT	=	apitester
IMAGES	=	petercha2000/apitester:0.0.1

# Rules =========================

all		: build

.PHONY:	build
build	: clean
	sudo docker-compose -f docker-compose.prod.yml --env-file .env build
	sudo docker-compose -f docker-compose.prod.yml push

.PHONY:	prod
prod	: clean
	sudo docker-compose -f docker-compose.prod.yml pull
	sudo docker-compose -f docker-compose.prod.yml -p $(PROJECT)-prod up -d

.PHONY:	clean
clean	:
	@sudo docker rmi $(shell (sudo docker images --filter "dangling=true" -q --no-trunc)) 2>/dev/null | cat

.PHONY:	fclean
fclean	: clean
	sudo docker-compose -f docker-compose.prod.yml -p $(PROJECT)-prod down
	sudo docker-compose -f docker-compose.prod.yml -p $(PROJECT)-prod rm
	sudo docker rmi $(IMAGES)
