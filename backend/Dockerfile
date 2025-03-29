FROM maven:3.9-eclipse-temurin-17 AS build

WORKDIR /app

# Copy the POM file first to leverage Docker cache
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the source code
COPY src/ ./src/

# Build the application
RUN mvn package -DskipTests

# Create the runtime image
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Create uploads directory
RUN mkdir -p uploads && chmod 777 uploads

# Set the entrypoint
ENTRYPOINT ["java", "-jar", "app.jar"]

# Expose the port
EXPOSE 8080