FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /app

# Copy the POM file first to leverage Docker cache
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the source code
COPY src/ ./src/

# Build the application
RUN mvn package -DskipTests

# Create the runtime image
FROM eclipse-temurin:21-jre-alpine

# Add non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Create uploads directory
RUN mkdir -p uploads && chown -R appuser:appgroup uploads

# Copy the JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar
COPY --chown=appuser:appgroup --from=build /app/target/*.jar app.jar

# Switch to non-root user
USER appuser

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
    CMD wget --quiet --tries=1 --spider http://localhost:8080/actuator/health || exit 1

ENTRYPOINT ["java", "-jar", "app.jar"]
EXPOSE 8080