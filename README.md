# PolyglotMesh

### GraalVM Multi-Language Runtime Sandbox

PolyglotMesh is a secure multi-language code execution platform built using **GraalVM Polyglot** and **Spring Boot**. It provides an isolated environment for executing code in supported programming languages while applying security and resource restrictions to prevent unauthorized host access and uncontrolled resource consumption.

The project combines **multi-language execution, sandbox security, script persistence, REST APIs, and automated security testing** into a single backend platform.

---

## 🚀 Features

- Multi-language code execution using GraalVM Polyglot
- JavaScript execution using GraalJS
- Python execution using GraalPy
- Restricted host access
- Host class lookup disabled
- File and IO access disabled
- Native access disabled
- Guest thread creation disabled
- Execution timeout protection
- Statement-based resource limits
- Controlled runtime error handling
- Script persistence using MySQL
- CRUD APIs for saved scripts
- REST APIs for code execution
- Automated JUnit security tests
- Maven-based build and dependency management

---

## 🏗️ Technology Stack

| Technology | Purpose |
|---|---|
| Java 25 | Backend development |
| Spring Boot 3.5.16 | Application framework |
| Spring WebFlux | REST API layer |
| Spring Data JPA | Database persistence |
| MySQL | Script storage |
| GraalVM Polyglot | Multi-language execution |
| GraalJS | JavaScript execution |
| GraalPy | Python execution |
| Maven | Build and dependency management |
| JUnit 5 | Automated testing |
| Git & GitHub | Version control |

---

## 📁 Project Structure

```text
PolyglotMesh
│
├── src
│   ├── main
│   │   └── java
│   │       └── com
│   │           └── PolyglotMesh
│   │               │
│   │               ├── controller
│   │               │   ├── ScriptController.java
│   │               │   ├── ExecutionController.java
│   │               │   └── PythonExecutionController.java
│   │               │
│   │               ├── entity
│   │               │   └── Script.java
│   │               │
│   │               ├── repository
│   │               │   └── ScriptRepository.java
│   │               │
│   │               ├── service
│   │               │   ├── ScriptService.java
│   │               │   ├── PolyglotExecutionService.java
│   │               │   └── PythonExecutionService.java
│   │               │
│   │               └── PolyglotMeshApplication.java
│   │
│   └── test
│       └── java
│           └── com
│               └── PolyglotMesh
│                   └── service
│                       └── PolyglotExecutionServiceTest.java
│
├── pom.xml
└── README.md
```

---

# 🔐 Sandbox Security

PolyglotMesh executes user-provided code inside restricted GraalVM contexts.

The execution environment applies the following security restrictions:

### Host Access

Host access is disabled:

```java
.allowHostAccess(HostAccess.NONE);
```

This prevents guest code from directly accessing Java host objects.

### Host Class Lookup

Host class lookup is disabled:

```java
.allowHostClassLookup(className -> false);
```

This prevents guest code from loading Java classes.

For example:

```javascript
Java.type('java.lang.System')
```

is blocked.

### File and IO Access

File and IO access are disabled:

```java
.allowIO(false);
```

This prevents guest programs from directly accessing the host filesystem and other IO resources.

### Native Access

Native access is disabled:

```java
.allowNativeAccess(false);
```

### Guest Thread Creation

Guest-created threads are disabled:

```java
.allowCreateThread(false);
```

These restrictions follow a least-privilege approach for executing untrusted guest code.

---

# ⏱️ Resource Protection

PolyglotMesh includes protection against programs that consume excessive resources.

## Statement Limit

A statement execution limit is configured using GraalVM `ResourceLimits`.

Current limit:

```text
1,000,000 statements
```

For example:

```javascript
while (true) {}
```

is stopped when the configured resource limit is reached.

The API returns:

```text
Execution error: Resource limit exceeded.
```

## Execution Timeout

A maximum execution time of:

```text
5 seconds
```

is applied using Java's `ExecutorService` and `Future`.

This provides an additional layer of protection against long-running code.

---

# 💾 Script Persistence

PolyglotMesh supports storing scripts in a MySQL database.

The `Script` entity contains:

```text
id
name
language
code
createdAt
updatedAt
```

The database table is automatically managed through Spring Data JPA and Hibernate.

---

# 🌐 REST API

## Script APIs

### Create Script

```http
POST /api/scripts
```

Example request:

```json
{
  "name": "Hello Python",
  "language": "python",
  "code": "print(\"Hello from PolyglotMesh!\")"
}
```

---

### Get All Scripts

```http
GET /api/scripts
```

---

### Get Script by ID

```http
GET /api/scripts/{id}
```

---

### Update Script

```http
PUT /api/scripts/{id}
```

Example:

```json
{
  "name": "Updated Script",
  "language": "javascript",
  "code": "10 * 5"
}
```

---

### Delete Script

```http
DELETE /api/scripts/{id}
```

---

# ▶️ Code Execution APIs

## JavaScript

```http
POST /api/execute/javascript
```

Example:

```text
10 * 5
```

Response:

```text
50
```

---

## Python

```http
POST /api/execute/python
```

Example:

```python
10 * 5
```

Expected result:

```text
50
```

---

# 🧪 Testing

PolyglotMesh includes automated tests for sandbox security and execution behavior.

Current tests include:

- Normal JavaScript execution
- Host access restriction
- File access restriction
- Invalid JavaScript handling
- Runtime error handling
- Infinite-loop/resource-limit protection

Tests are executed using Maven:

```bash
mvn test
```

Successful execution produces:

```text
BUILD SUCCESS
```

---

# ⚙️ Setup and Installation

## Prerequisites

Install the following:

- JDK 25
- Maven
- MySQL
- Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/Ummerasultana/PolyglotMesh.git
```

Move into the project:

```bash
cd PolyglotMesh
```

---

## 2. Configure MySQL

Create the database:

```sql
CREATE DATABASE polyglotmesh;
```

Update the database credentials in:

```text
src/main/resources/application.properties
```

Example:

```properties
spring.application.name=PolyglotMesh

spring.datasource.url=jdbc:mysql://localhost:3306/polyglotmesh
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

server.port=8081
```

Replace:

```text
YOUR_MYSQL_PASSWORD
```

with your local MySQL password.

---

## 3. Build the Project

```bash
mvn clean package -DskipTests
```

---

## 4. Run Tests

```bash
mvn test
```

---

## 5. Run the Application

```bash
mvn spring-boot:run
```

The application runs on:

```text
http://localhost:8081
```

---

# 🧪 Example Testing

### JavaScript Execution

PowerShell:

```powershell
Invoke-RestMethod `
  -Uri "http://localhost:8081/api/execute/javascript" `
  -Method POST `
  -ContentType "text/plain" `
  -Body "10 * 5"
```

Response:

```text
50
```

### Infinite Loop Protection

```powershell
Invoke-RestMethod `
  -Uri "http://localhost:8081/api/execute/javascript" `
  -Method POST `
  -ContentType "text/plain" `
  -Body "while (true) {}"
```

Response:

```text
Execution error: Resource limit exceeded.
```

### Host Access Protection

```javascript
Java.type('java.lang.System').getProperty('java.version')
```

Host access is blocked by the sandbox.

---

# 🔄 Execution Flow

```text
User
  │
  ▼
REST API
  │
  ▼
Execution Controller
  │
  ▼
Execution Service
  │
  ▼
Create Restricted GraalVM Context
  │
  ├── Host Access Disabled
  ├── Host Class Lookup Disabled
  ├── IO Disabled
  ├── Native Access Disabled
  ├── Guest Threads Disabled
  └── Resource Limits
  │
  ▼
Execute Guest Code
  │
  ├── Successful Execution
  │
  └── Controlled Error / Resource Limit
  │
  ▼
Return Result
```

---

# 🗄️ Persistence Flow

```text
Client
  │
  ▼
Script REST API
  │
  ▼
ScriptController
  │
  ▼
ScriptService
  │
  ▼
ScriptRepository
  │
  ▼
MySQL
```

---

# 🛡️ Security Approach

PolyglotMesh follows a **least-privilege sandboxing approach**.

The guest program receives only the capabilities required for language execution and does not receive unrestricted access to the Java host environment.

The security layer focuses on:

- Host isolation
- File/IO restriction
- Native access restriction
- Thread restriction
- Resource consumption limits
- Execution timeout
- Controlled exception handling

---

# 📊 Current Implementation Status

| Component | Status |
|---|---|
| Spring Boot backend | ✅ Completed |
| MySQL persistence | ✅ Completed |
| Script CRUD APIs | ✅ Completed |
| GraalVM Polyglot integration | ✅ Completed |
| JavaScript execution | ✅ Completed |
| JavaScript sandbox security | ✅ Completed |
| Resource limits | ✅ Completed |
| Execution timeout | ✅ Completed |
| JUnit security tests | ✅ Completed |
| GraalPy dependency | ✅ Added |
| Python execution service | ✅ Implemented |
| Python execution API | ✅ Implemented |
| Extended Python testing | 🔄 In Progress |
| Further QA and deployment validation | 🔄 In Progress |

---

# 👥 Project Contribution

My contribution to PolyglotMesh focuses on:

- Sandbox security
- Restricted GraalVM execution contexts
- Least-privilege host access
- Resource and execution safeguards
- Script persistence using MySQL
- Script CRUD APIs
- Security and execution testing
- Python runtime integration
- Build and deployment validation

---

# 🔮 Future Enhancements

Potential future improvements include:

- Additional language runtimes
- Improved execution isolation
- Memory/resource monitoring
- Authentication and authorization
- Execution history
- Improved API response models
- Container-based execution isolation
- Native Image feasibility evaluation
- Extended automated security testing
- Frontend interface for script creation and execution

---

# 📜 License

This project is developed as an academic/team project for educational and experimental purposes.