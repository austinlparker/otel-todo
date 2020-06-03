# Spring + Vue.JS SPA OpenTelemetry Example

This is a sample application demonstrating the usage of OpenTelemetry with Spring and Vue.JS in Kubernetes.

## Developing

TBD

## Add OpenTelemetry to the Server

Add the auto-instrumentation jar to the Docker container and the OTLP exporter
- https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/download/v0.3.0/opentelemetry-auto-0.3.0.jar
- https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/download/v0.3.0/opentelemetry-auto-exporters-otlp-0.3.0.jar

Modify your Dockerfile with the new startup info:

```
...
ADD https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/download/v0.3.0/opentelemetry-auto-0.3.0.jar /app/otel.jar
ADD https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/download/v0.3.0/opentelemetry-auto-exporters-otlp-0.3.0.jar /app/otel-otlp.jar
ENV OTEL_RESOURCE_ATTRIBUTES todo-server

...

ENTRYPOINT ["java",\
           "-XX:+UnlockExperimentalVMOptions",\
           "-javaagent:/app/otel.jar",\
           "-Dota.exporter.jar=/app/otel-otlp.jar",\
           "-Dota.exporter.otlp.endpoint=otel-collector:55680",\
            "-Djava.security.egd=file:/dev/./urandom",\
            "-jar","/app/spring-boot-application.jar"]
```
