FROM gradle:6.4.1-jdk11 AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build --no-daemon 

FROM openjdk:11-jre-slim

EXPOSE 9000

RUN mkdir /app

ADD https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/download/v1.0.1/opentelemetry-javaagent-all.jar /app/otel.jar
COPY --from=build /home/gradle/src/build/libs/*.jar /app/spring-boot-application.jar
ENV OTEL_RESOURCE_ATTRIBUTES service.name=todo-server
ENV OTEL_EXPORTER_OTLP_ENDPOINT http://otel-collector:4317

ENTRYPOINT ["java",\
           "-XX:+UnlockExperimentalVMOptions",\
           "-javaagent:/app/otel.jar",\
            "-Djava.security.egd=file:/dev/./urandom",\
            "-jar","/app/spring-boot-application.jar"]
