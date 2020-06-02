# Spring + Vue.JS SPA OpenTelemetry Example

This is a sample application demonstrating the usage of OpenTelemetry with Spring and Vue.JS in Kubernetes.

## Developing

TBD

## Deploying the OpenTelemetry Operator

First, configure your cluster.

```
kubectl create -f https://raw.githubusercontent.com/open-telemetry/opentelemetry-operator/master/deploy/crds/opentelemetry.io_opentelemetrycollectors_crd.yaml
kubectl create -f https://raw.githubusercontent.com/open-telemetry/opentelemetry-operator/master/deploy/service_account.yaml
kubectl create -f https://raw.githubusercontent.com/open-telemetry/opentelemetry-operator/master/deploy/role.yaml
kubectl create -f https://raw.githubusercontent.com/open-telemetry/opentelemetry-operator/master/deploy/role_binding.yaml
kubectl create -f https://raw.githubusercontent.com/open-telemetry/opentelemetry-operator/master/deploy/operator.yaml
```

A collector instance will be created as part of the helm install.

## Add OpenTelemetry to the Server

Add the auto-instrumentation jar to the Docker container and the OTLP exporter
- https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/download/v0.3.0/opentelemetry-auto-0.3.0.jar
- https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/download/v0.3.0/opentelemetry-auto-exporters-otlp-0.3.0.jar

Modify your Dockerfile with the new startup info:

```
export OTEL_RESOURCE_ATTRIBUTES=service.name=shopping
java -javaagent:path/to/opentelemetry-auto-0.3.0.jar \
     -Dota.exporter.jar=path/to/opentelemetry-auto-exporters-otlp-0.3.0.jar \
     -Dota.exporter.otlp.endpoint=localhost:55678 \
     -jar myapp.jar
```