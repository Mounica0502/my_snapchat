# Use the official Nginx image as base image
FROM nginx:latest

# Copy the HTML files to the Nginx default html directory
COPY favicon.ico /usr/share/nginx/html/
COPY index.html /usr/share/nginx/html/
COPY logo192.png /usr/share/nginx/html/
COPY logo512.png /usr/share/nginx/html/
COPY manifest.json /usr/share/nginx/html/
COPY robots.txt /usr/share/nginx/html/
COPY Connexion.jsx /usr/share/nginx/html/
COPY DisplaySnap.jsx /usr/share/nginx/html/
COPY Home.jsx /usr/share/nginx/html/
COPY Home_user.jsx /usr/share/nginx/html/
COPY Inscription.jsx /usr/share/nginx/html/
COPY getSnap.jsx /usr/share/nginx/html/
COPY index.js /usr/share/nginx/html/
COPY my_snapchat.css /usr/share/nginx/html/
COPY postSnap.jsx /usr/share/nginx/html/
COPY routes.jsx /usr/share/nginx/html/

# Expose port 80 for web traffic
EXPOSE 80

# Verify file permissions
RUN chmod 644 /usr/share/nginx/html/favicon.ico && \
    chmod 644 /usr/share/nginx/html/index.html && \
    chmod 644 /usr/share/nginx/html/logo192.png && \
    chmod 644 /usr/share/nginx/html/logo512.png && \
    chmod 644 /usr/share/nginx/html/manifest.json && \
    chmod 644 /usr/share/nginx/html/robots.txt && \
    chmod 644 /usr/share/nginx/html/Connexion.jsx && \
    chmod 644 /usr/share/nginx/html/DisplaySnap.jsx  && \
    chmod 644 /usr/share/nginx/html/Home.jsx && \
    chmod 644 /usr/share/nginx/html/Home_user.jsx && \
    chmod 644 /usr/share/nginx/html/Inscription.jsx && \
    chmod 644 /usr/share/nginx/html/getSnap.jsx && \
    chmod 644 /usr/share/nginx/html/index.js && \
    chmod 644 /usr/share/nginx/html/my_snapchat.css && \
    chmod 644 /usr/share/nginx/html/postSnap.jsx && \
    chmod 644 /usr/share/nginx/html/routes.jsx 
    
    

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
