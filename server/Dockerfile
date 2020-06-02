FROM gradle:6.4.1-jdk11 AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build --no-daemon 

FROM openjdk:11-jre-slim

EXPOSE 9000

RUN mkdir /app

ADD https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/download/v0.3.0/opentelemetry-auto-0.3.0.jar /app/otel.jar
ADD https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/download/v0.3.0/opentelemetry-auto-exporters-otlp-0.3.0.jar /app/otel-otlp.jar
ADD https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/download/v0.3.0/opentelemetry-auto-exporters-logging-0.3.0.jar /app/otel-log.jar
COPY --from=build /home/gradle/src/build/libs/*.jar /app/spring-boot-application.jar

ENTRYPOINT ["java",\
           "-XX:+UnlockExperimentalVMOptions",\
           "-javaagent:/app/otel.jar",\
           "-Dota.exporter.jar=/app/otel-log.jar",\
            "-Djava.security.egd=file:/dev/./urandom",\
            "-jar","/app/spring-boot-application.jar"]
