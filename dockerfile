FROM zabbix/zabbix-web-nginx-pgsql:ubuntu-7.2.1

# Switch to root to perform file operations
USER root

# Rename the existing Zabbix frontend directory
RUN mv /usr/share/zabbix /usr/share/zabbix-old || true

# Create a new empty directory for the custom frontend
RUN mkdir -p /usr/share/zabbix

# Copy the custom frontend files into the container
COPY frontend /usr/share/zabbix

# Change ownership back to the original zabbix user (usually uid 1997)
RUN chown -R zabbix:zabbix /usr/share/zabbix

# Switch back to zabbix user (if needed)
USER zabbix

# Keep the default entrypoint
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/supervisord.conf"]