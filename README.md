# Graduation_project_backend

### Guide: for how to create a Docker container 

---

## Docker Documentation for Node.js Application

### Building the Docker Image 

To build the Docker image, navigate to the directory containing the Dockerfile and run:

```bash
docker build -t backend-image .
```

This command builds the Docker image with the tag `backend-image`.

### Running the Docker Container

To run the container, use the command:

```bash
docker run -p 8000:3000 --name backend-container backend-image
```

This command creates and starts a container named `backend-container`, mapping port 8000 on the host to port 3000 in the container.

#### Handling Container Name Conflicts

If you encounter an error like:

```
docker: Error response from daemon: Conflict. The container name "/backend-container" is already in use...
```

It means a container with the same name already exists. You can either:

1. Remove the existing container with:
   ```bash
   docker rm backend-container -