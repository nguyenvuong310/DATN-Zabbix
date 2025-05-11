#!/bin/bash

# Stop on error
set -e
echo "Start build ...."

# Check build branch
current_branch=$(git branch --show-current)
echo "Checking build branch with $current_branch ..."

if [ "$current_branch" != "master" ]; then
  echo "Not on the master branch. Aborting the build."
  exit 1
fi

DOCKER_IMAGE_NAME="$DOCKER_USER/tvbix"


echo "Logging into DockerHub..."
docker login -u $DOCKER_USER -p $DOCKER_PASS

echo "Building Docker image: $DOCKER_IMAGE_NAME:$DOCKER_TAG ..."
docker buildx build -t $DOCKER_IMAGE_NAME:$DOCKER_TAG . --platform linux/amd64

echo "Pushing Docker image to DockerHub..."
docker push $DOCKER_IMAGE_NAME:$DOCKER_TAG

echo "Docker image built and pushed successfully."