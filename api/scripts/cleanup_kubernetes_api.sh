#!/bin/bash

set -e

echo "Deleting Kubernetes manifests..."
kubectl delete -f api/kubernetes/api-deployment.yaml || true
kubectl delete -f api/kubernetes/api-service.yaml || true

echo "Stopping Minikube..."
minikube stop

echo "Cleanup complete!"
