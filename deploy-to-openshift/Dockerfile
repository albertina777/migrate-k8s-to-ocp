FROM registry.access.redhat.com/ubi8/nodejs-14:1-28 AS builder

WORKDIR /app
COPY app/ /app

# Install dependencies
RUN npm install

# Build our deployable image based on UBI
FROM registry.access.redhat.com/ubi8/nodejs-14:1-28

USER root

## Update security
RUN dnf -y update-minimal --security --sec-severity=Important --sec-severity=Critical && \
    dnf clean all

USER 1001
WORKDIR /app
COPY --from=builder /app .

ENV WEB_PORT 3000
EXPOSE  3000

# Define command to run the application when the container starts
CMD ["node", "/app/app.js"]
