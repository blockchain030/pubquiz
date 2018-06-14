# Blockchain030.nl pubquiz using decentral storage and blockchain technology


This is still work in progress and might not resemble the final product.

Demo van be found at https://pubquiz.fun

---
TODO (UI)
  Grade should be stored per question.
  Add modal dialogs instead of pages for help, about, scores, waiting, EnterSeed(?)
  Icoon voor 'toevoegen aan startscherm' op Android
  favicon.ico voor Desktop
  Webcam croppen tot portait-mode
  UI in portait-mode-div weergeven, ook wanneer in landscape mode

SUGGESTION/TODO OPTIONALLY (UI)
  Add a training-round after which the scores will be reset.
  Ranking/Scores nicely animated (like in Mario Party)... rank 3, 2, 1 and only then the rest
  During grading a rood kruis, (bijv.) yin/yan symbol, geen checkbox ipv checkbox
  Submit button (quiz+grading). For now leave it. But think about quizmaster decides time of submit.
  Can the user always see the scores or only when the quizmaster allows it.
  If quizmaster decides about submit then we could use a snackbar for quizmaster messages.

DONE (UI)
  Title is now "Pubquiz" and will become "Pubquiz - <screenname>".
  Add waiting screen (and home tab) with prefilled/quizmaster set message.
  Number 87 on quiz pages is a mistake and should not be there.
  Grading: One press. 1 point (all good), second press 0.5 points (half good), third return to 0 points. For now we use right/wrong.
  Red+green icons become arrows left+right
  Final highscores: Remove 'back to quiz' and 'close quiz' buttons
  Leave Quiz add confirmation dialog

DON'T (UI)
  For now no playerslist
  For now no team icon

================================================================================
Nginx current config

upstream api_node_js {
    server    127.0.0.1:3001;
}

server {
  listen 80;
  listen 443 default_server ssl;

  server_name pubquiz.fun www.pubquiz.fun;

  ssl_certificate          /etc/letsencrypt/live/pubquiz.fun/fullchain.pem;
  ssl_certificate_key  /etc/letsencrypt/live/pubquiz.fun/privkey.pem;

  root /home/pubquiz/www;

  index index.html index.htm index.nginx-debian.html;

  if ($scheme = http) {
    return 301 https://$server_name$request_uri;
  }

  location / {
    # First attempt to serve request as file, then
    # as directory, then fall back to displaying a 404.
    try_files $uri $uri/ =404;

    # kill cache (include during development)
    add_header Last-Modified $date_gmt;
    add_header Cache-Control 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0';
    if_modified_since off;
    expires off;
    etag off;
  }

  location /api {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-NginX-Proxy true;

    rewrite ^/api/?(.*) /$1 break;

    proxy_pass http://api_node_js;
    proxy_redirect off;
  }
}
