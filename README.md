# tsumami-jalopy

A full-stack web application for managing recipes and meals, built with Spring Boot and a custom vanilla JavaScript SPA framework.

## Tech Stack

### Backend
- **Spring Boot 2.7.4** - Java application framework
- **Spring Data JPA** - Database persistence layer
- **Spring Web** - RESTful API endpoints
- **Java 17** - Programming language
- **Hibernate Validator 6.2.5** - Input validation
- **SpringDoc OpenAPI 1.6.12** - API documentation (Swagger UI)
- **Lombok** - Code generation for Java
- **Gson 2.9.1** - JSON serialization/deserialization
- **Maven** - Build and dependency management

### Frontend
- **Jalopy** - Custom SPA routing framework coded with vanilla JavaScript
  - Client-side routing and navigation
  - View rendering and state management
  - RESTful API integration
  - Authentication and authorization
- **Vanilla JavaScript (ES6+)** - No framework dependencies
- **HTML5 & CSS3** - Markup and styling
- **Thymeleaf 3.0.15** - Server-side template engine

### Database
- **MariaDB** / **MySQL** - Primary database with JDBC driver support

### Development Tools
- **Spring Boot DevTools** - Hot reload during development
- **Maven Wrapper** - Consistent build environment

## Jalopy Framework

Jalopy is a custom Single Page Application (SPA) routing framework written in vanilla JavaScript. It provides:

- **Router** (`router.js`) - Defines routes and maps URIs to views
- **View Creator** (`createView.js`) - Handles view creation and data loading
- **Renderer** (`render.js`) - Manages DOM updates and view transitions
- **Data Fetcher** (`fetchData.js`) - Fetches data from APIs for views
- **Initializer** (`init.js`) - Bootstraps the application
- **Authentication** (`auth.js`) - User authentication and session management

## Project Setup

Follow these steps to set up the project for local development:

### Prerequisites

1. **Java Development Kit (JDK) 17**
   - Download from [Eclipse Temurin](https://adoptium.net/) or [Oracle](https://www.oracle.com/java/technologies/downloads/)
   - Verify installation:
     ```bash
     java -version
     ```
     Should output Java 17.x.x

2. **MariaDB or MySQL Database**
   - Install [MariaDB](https://mariadb.org/download/) or [MySQL](https://dev.mysql.com/downloads/)
   - Start the database service
   - Create a database for the application:
     ```sql
     CREATE DATABASE tsumami;
     ```

3. **API Token**
    - Request an API token for external integrations (e.g., Spoonacular) from [API Token Request Page](https://spoonacular.com/food-api/).
    - Replace `your_api_key_here` in `private_constants.js` with the token you receive.

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd tsumami-jalopy
   ```

2. **Configure Database Connection**
   
   Copy the example properties file:
   ```bash
   cp src/main/resources/example.properties src/main/resources/application.properties
   ```
   
   Edit `src/main/resources/application.properties` with your database credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/tsumami
   spring.datasource.username=your_db_username
   spring.datasource.password=your_db_password
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   ```

3. **Configure Frontend Constants**
   
   Create the private constants file for frontend configuration:
   ```bash
   touch src/main/resources/static/js/private_constants.js
   ```
   
   Add the required constants (example):
   ```javascript
   const BACKEND_HOST_URL = 'http://localhost:8080';
   const SPOONACULAR_API = 'your_api_key_here';
   ```

4. **Build the Project**
   
   Use the Maven wrapper to build the project:
   ```bash
   ./mvnw clean install
   ```
   
   On Windows:
   ```cmd
   mvnw.cmd clean install
   ```

5. **Run the Application**
   
   Start the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```
   
   On Windows:
   ```cmd
   mvnw.cmd spring-boot:run
   ```

6. **Access the Application**
   
   Open your web browser and navigate to:
   - **Application**: http://localhost:8080
   - **API Documentation**: http://localhost:8080/swagger-ui.html

### Running Tests

Execute the test suite:
```bash
./mvnw test
```

### Development Mode

For automatic reloading during development:
```bash
./mvnw spring-boot:run
```

Spring Boot DevTools will automatically restart the application when changes are detected.

## Project Structure

```
tsumami-jalopy/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── tsumami/tsumamijalopy/    # Spring Boot application
│   │   │       ├── config/               # Configuration classes
│   │   │       ├── data/                 # Data models and repositories
│   │   │       ├── services/             # Business logic
│   │   │       └── web/                  # REST controllers
│   │   └── resources/
│   │       ├── static/                   # Frontend assets
│   │       │   ├── css/                  # Stylesheets
│   │       │   └── js/                   # Jalopy framework & app logic
│   │       ├── templates/                # Thymeleaf templates
│   │       └── application.properties    # Configuration (not in git)
│   └── test/                             # Test files
├── pom.xml                               # Maven configuration
└── README.md                             # This file
```

## Additional Notes

- The `application.properties` file is excluded from version control for security
- The `private_constants.js` file is also excluded and must be created locally
- Make sure to configure your database before running the application
- API keys (like Spoonacular) should be kept secure and not committed to the repository