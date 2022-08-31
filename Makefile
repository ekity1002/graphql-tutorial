## ENVs
# basic
export PWD=`pwd`
# docker
export CONTAINER_NAME=testvue
# dockerfileのあるディレクトリ
export DIR_DOCKER=./

export DOCKERFILE_NAME=Dockerfile
export CONTAINER_ID=`docker ps --format {{.ID}}`
# --------------------------------------------------------
b: #build frontend
	docker build -t testvue -f Dockerfile.frontend .
r: # run frontend
	docker run -it --rm -p 8080:8080 -v ${PWD}/frontend:/app/ --name testvue testvue /bin/ash
br:
	@make b
	@make r
up:
	docker-compose up -d
down:
	docker-compose down
cf:
	docker-compose exec frontend /bin/ash
cb:
	docker-compose exec backend /bin/ash

# --------------------------------------------------------
# docker commands
export NONE_DOCKER_IMAGES=`docker images -f dangling=true -q`
export STOPPED_DOCKER_CONTAINERS=`docker ps -a -q`
export RUNNING_DOCKER_CONTAINERS=`docker ps -f status=running -q`
rm: ## rm running container
	docker rm -f $(RUNNING_DOCKER_CONTAINERS)
clean: ## clean images/containers
	-@make clean-images
	-@make clean-containers
clean-images:
	docker rmi $(NONE_DOCKER_IMAGES) -f
clean-containers:
	docker rm -f $(STOPPED_DOCKER_CONTAINERS)
# help
help: ## this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'