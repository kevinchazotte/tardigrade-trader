#!/bin/bash

set -e

echo "Checking Minikube status..."
if ! minikube status &>/dev/null; then
  echo "Starting Minikube..."
  minikube start
else
  echo "Minikube is already running. Continuing..."
fi

echo "Building Docker image 'dashboard-api:0.0' in Minikube"
eval $(minikube -p minikube docker-env)
docker build -f api/Dockerfile -t dashboard-api:0.0 .
eval $(minikube -p minikube docker-env -u)

echo "Applying Kubernetes manifests..."
kubectl apply -f api/kubernetes/api-deployment.yaml
kubectl apply -f api/kubernetes/api-service.yaml

echo "Deployment complete!"
echo "Dashboard API service is accessible at URL defined by \$(minikube service api-service --url)"
