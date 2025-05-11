FROM zabbix/zabbix-web-nginx-pgsql:ubuntu-7.2.1

# Switch to root to perform file operations
USER root

RUN rm -rf /usr/share/zabbix || true

# Create a new empty directory for the custom frontend
RUN mkdir -p /usr/share/zabbix

# Copy the custom frontend files into the container
COPY frontend /usr/share/zabbix

# Keep the default entrypoint
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/supervisord.conf"]