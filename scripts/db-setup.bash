#!/bin/bash

# A script to pull and run the official Oracle Database Express Edition (XE) Docker image.
#
# This script will:
# 1. Prompt you for a secure password for the Oracle database users.
# 2. Prompt you for a local path for persistent data storage.
# 3. Pull the official Oracle Database XE Docker image from the Oracle Container Registry.
# 4. Run the container with the provided configuration.
# 5. Provide instructions on how to connect to and manage the container.

# --- Configuration ---
IMAGE_NAME="container-registry.oracle.com/database/express:latest"
CONTAINER_NAME="oracle-xe"
PORT_MAPPING="1521:1521"

echo "--- Oracle Database XE Docker Setup ---"
echo "This script will download and run the official Oracle Database XE container."
echo "You must have already accepted the license agreement on the Oracle Container Registry."
echo ""

# --- Step 1: Check for Docker ---
if ! command -v docker &> /dev/null
then
    echo "Error: Docker is not installed. Please install Docker and try again."
    exit 1
fi

if ! docker info &> /dev/null
then
    echo "Error: Docker daemon is not running. Please start Docker and try again."
    exit 1
fi

# --- Step 2: Get user input for password ---
while true; do
    read -s -p "Enter a secure password for SYS, SYSTEM, and PDBADMIN users: " password
    echo ""
    read -s -p "Confirm password: " password_confirm
    echo ""

    if [[ -z "$password" ]]; then
        echo "Password cannot be empty. Please try again."
        continue
    fi

    if [[ "$password" == "$password_confirm" ]]; then
        break
    else
        echo "Passwords do not match. Please try again."
    fi
done

# --- Step 4: Pull the Docker image ---
echo "Pulling Docker image '$IMAGE_NAME'..."
docker pull "$IMAGE_NAME"
if [[ $? -ne 0 ]]; then
    echo "Error: Failed to pull the Docker image. Make sure you have accepted the license and are logged in to the Oracle registry."
    exit 1
fi
echo "Image pull successful."
echo ""

# --- Step 5: Run the Docker container ---
echo "Starting the Oracle Database XE container..."

# Check if a container with the same name already exists and offer to remove it
if docker ps -a --format '{{.Names}}' | grep -q "^$CONTAINER_NAME$"; then
    read -p "A container named '$CONTAINER_NAME' already exists. Do you want to remove it and start a new one? (y/n): " choice
    if [[ "$choice" == "y" || "$choice" == "Y" ]]; then
        docker stop "$CONTAINER_NAME" > /dev/null 2>&1
        docker rm "$CONTAINER_NAME" > /dev/null 2>&1
        echo "Existing container '$CONTAINER_NAME' has been removed."
    else
        echo "Aborting script. Please manage the existing container manually or choose to remove it."
        exit 0
    fi
fi

# Run the container
docker run \
  --name "$CONTAINER_NAME" \
  -p "$PORT_MAPPING" \
  -e ORACLE_PWD="$password" \
  "$IMAGE_NAME"

echo "showing the password for dev purposses $password"

if [[ $? -ne 0 ]]; then
    echo "Error: Failed to run the Docker container. Check the logs with 'docker logs $CONTAINER_NAME'."
    exit 1
fi

echo ""
echo "--- Setup Complete! ---"
echo "Oracle Database XE is now running in a Docker container."
echo "  - Container Name: '$CONTAINER_NAME'"
echo "  - Port Mapping:   '$PORT_MAPPING' (connect to localhost:1521)"
echo "  - Users:          SYS, SYSTEM, PDBADMIN"
echo ""
echo "The database will take a few minutes to initialize. You can check its status with:"
echo "  docker logs -f $CONTAINER_NAME"
echo ""
echo "To stop the container:"
echo "  docker stop $CONTAINER_NAME"
echo ""
echo "To remove the container (and its volume if you don't use -v):"
echo "  docker rm $CONTAINER_NAME"