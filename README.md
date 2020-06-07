# Spring + Vue.JS SPA OpenTelemetry Example

This is a sample application demonstrating the usage of OpenTelemetry with Spring and Vue.JS in Kubernetes.

We start with a small bug that you'll use OpenTelemetry to discover, as well as better understand the performance of your application.

## Prerequisites

- Docker
- Kubernetes (Local or GKE)
- Helm
- Codefresh and Lightstep (for building, deploying, and viewing telemetry)

For remote deployment, you'll need a static IP address for your Ingress.

## Developing

TBD

## Add OpenTelemetry to the Server

Add the auto-instrumentation jar to the Docker container and the OTLP exporter by modifying the Dockerfile in /server/. You'll then add some new startup options to the entrypoint command.

```shell
...

ADD https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/download/v0.3.0/opentelemetry-auto-0.3.0.jar /app/otel.jar
ADD https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/download/v0.3.0/opentelemetry-auto-exporters-otlp-0.3.0.jar /app/otel-otlp.jar
ENV OTEL_RESOURCE_ATTRIBUTES service.name=todo-server

...

ENTRYPOINT ["java",\
           "-XX:+UnlockExperimentalVMOptions",\
           "-javaagent:/app/otel.jar",\
           "-Dota.exporter.jar=/app/otel-otlp.jar",\
           "-Dota.exporter.otlp.endpoint=otel-collector:55680",\
            "-Djava.security.egd=file:/dev/./urandom",\
            "-jar","/app/spring-boot-application.jar"]
```

## Add OpenTelemetry to the Client

## Add the OpenTelemetry Collector

## Run The Application