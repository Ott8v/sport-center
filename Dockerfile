FROM node:latest

RUN mkdir -p /codebase


WORKDIR /codebase

COPY entrypoint.sh /etc/entrypoint.sh
RUN chmod +x /etc/entrypoint.sh

ENTRYPOINT ["/etc/entrypoint.sh"]
