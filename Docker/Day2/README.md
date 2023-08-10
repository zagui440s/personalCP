# Lesson: Django API + PostgreSQL + Docker

## Introduction to Docker and Django

Docker's containerization offers numerous advantages for Django API developers. It provides isolation, preventing interference between different components of the application. Developers can effortlessly reproduce the same development environment on any machine with Docker support, making collaboration more efficient. Additionally, Docker's rapid deployment capabilities enable seamless scaling, allowing the Django API to handle varying workloads with ease.

The combination of Docker and Django API empowers developers to focus on writing high-quality code and building feature-rich web applications without being constrained by complex infrastructure configurations. With its ability to manage dependencies, streamline deployment, and ensure consistency, Docker serves as a foundational pillar for unleashing the full potential of Django API and driving modern web application development forward.

## Learning Objectives

- Create a Dockerfile to define the configuration of the Django application container.
- Build a Docker image from the Dockerfile.
- Set up a PostgreSQL database container and connect it to the Django API container.
- Use basic Docker commands to manage containers effectively.
- Deploy and run the Django API project connected to the PostgreSQL database using Docker.

## Concepts and Steps

### Docker Basics

#### 1. Dockerfile

### Step 1: Configure Django Project

Before we proceed with Docker, make sure your Django API project is configured to work with PostgreSQL.

Update the Django settings to use PostgreSQL as the database backend:

```python
# settings.py

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'mydb',
        'USER': 'myuser',
        'PASSWORD': 'mypassword',
        'HOST': 'db',  # The hostname of the PostgreSQL container (will be explained later)
        'PORT': '5432',
    }
}
```

### Step 2: Create the Dockerfile

Now, let's create a Dockerfile to define the configuration of the Django API container.

Create a new file named `Dockerfile` in the root directory of your Django API project. Open the `Dockerfile` and add the following content:

```Dockerfile
# Use the official Python base image
FROM python:3.9

# Set environment variables for the Django application
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Create and set the working directory inside the container
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    postgresql-client

# Install Python dependencies
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the entire Django project to the container
COPY . .

# Expose port 8000 for Django development server
EXPOSE 8000

# Start the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
```

#### Explanation:

- `FROM python:3.9`: This line sets the base image for our Docker image, using the official Python image.

- `ENV PYTHONDONTWRITEBYTECODE 1`: Prevents Python from writing `.pyc` files to improve startup time.

- `ENV PYTHONUNBUFFERED 1`: Ensures that Python output is sent straight to the terminal without being buffered.

- `WORKDIR /app`: Sets the working directory inside the container to `/app`.

- `RUN apt-get update && apt-get install -y --no-install-recommends gcc postgresql-client`: Installs system dependencies required for PostgreSQL.

- `COPY requirements.txt .`: Copies the `requirements.txt` file from the host machine to the container's working directory.

- `RUN pip install --upgrade pip && pip install -r requirements.txt`: Installs Python dependencies from `requirements.txt`.

- `COPY . .`: Copies the entire Django project from the host machine to the container's working directory.

- `EXPOSE 8000`: Exposes port 800

0 on the container to allow access to the Django development server.

- `CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]`: Specifies the command to run when the container starts, which starts the Django development server.

### Step 3: Build the Docker Image

With the Dockerfile in place, we can now build the Docker image for our Django API project.

Open the terminal, navigate to the root directory of your Django API project (where the `Dockerfile` is located), and run the following command:

```bash
docker build -t my-django-api .
```

#### Explanation:

- `docker build`: This is the command to build a Docker image.
- `-t my-django-api`: The `-t` flag is used to tag the image with a name (in this case, `my-django-api`).

This command will build the Docker image `my-django-api` using the Dockerfile located in the current directory.

### Step 4: Run the Django API Container

Now that both the Docker images are built and the PostgreSQL container is running, we can run a Docker container for the Django API project that links with our PostgreSQL container.

Run the following command:

```bash
docker run -d -p 8000:8000 --name my-django-app --link my-postgres-db:db my-django-api
```

#### Explanation:

- `docker run`: This command creates and runs a Docker container based on the `my-django-api` image.
- `-d`: The `-d` flag runs the container in detached mode, which means it runs in the background.
- `-p 8000:8000`: The `-p` flag maps port 8000 from the container to port 8000 on your local machine, allowing you to access the Django API at `localhost:8000`.
- `--name my-django-app`: The `--name` flag assigns a name (`my-django-app`) to the container for easier identification.
- `--link my-postgres-db:db`: Links the Django API container to the PostgreSQL container with the name `my-postgres-db` and an alias `db`. This allows the Django API container to access the PostgreSQL database.
- `my-django-api`: The name of the Docker image to use when creating the container.

### Step 5: Migrations & Fixtures

The PostgreSQL database and Django API containers are now linked together but our migrations are not reflected on the database. We will have to enter the Django API container and migrate our migrations from our Django project

```bash
docker exec -it my-django-app python manage.py migrate
```

Now that all of our migrations are within our database let's finally load any fixture data we may have to ensure our api is working properly.

```bash
docker exec -it my-django-app python manage.py loaddata list.json
docker exec -it my-django-app python manage.py loaddata task.json
docker exec -it my-django-app python manage.py loaddata subtasks.json
```

### Step 6: Access the Django API

Congratulations! Your Django API project connected to the PostgreSQL database is now running in a Docker container and is accessible at `localhost:8000` on your local machine.

You can interact with the Django API and perform API requests using tools like `curl` or Postman.

### Step 7: Exiting the Docker Container

If you want to stop the Docker container, you can use the `docker stop` command. First, find the container ID or name:

```bash
docker ps
```

Locate the container ID or name in the output. Then, stop the container:

```bash
docker stop my-django-app
```

## Conclusion

In this lesson, you've learned how to deploy a Django API project connected to a PostgreSQL database using Docker. You've seen the essential Docker commands, what each command does, and how to set up the Django project to work with Docker.

Docker simplifies the deployment process and ensures consistency and portability across various environments. Now you can use Docker to deploy and manage Django applications with ease. Happy coding!
