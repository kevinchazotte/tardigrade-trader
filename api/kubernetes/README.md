These manifest files will be run from the provided scripts. Here are some helpful tips for debugging kubernetes instances:

* On changing the .env file (adding/removing/udpating keys, etc.), remember to update the generated secret. See `kubectl get secrets`, `kubectl delete`, and `kubectl create`.
* On deploying the kubernetes instance, internal server failures may be obfuscated. See `kubectl get pods` and `kubectl logs` for debugging logs in the deployed services.
* `kubectl describe` is also greatly useful for visualizing obfuscated information. This works with `secret` or `pod`.
