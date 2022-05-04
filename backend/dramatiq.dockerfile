# Pull Python image
FROM python:3.9

# Set workdir
WORKDIR /app

# Set envvars
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PYTHONPATH=/app

# Install System dependencies
RUN apt update && apt install chromium chromium-driver libgl1-mesa-glx -y

# Install Python dependencies
COPY ./app/Pipfile ./app/Pipfile.lock /app/
RUN pip install pipenv && pipenv install --system

# Copy project
COPY ./app /app
