# I. installation

docker-compose build

# install the dependencies

  docker-compose run --rm -it --entrypoint 'bash -c bash' crawlee
  # in the shell, should be in folder /app
  npm install

# launch services: environment with vnc server and crawlee
  docker-compose up


# II. while services are up, run crawlee script inside container


# see if this is already running from docker-compose command

# make it visible in vnc terminal


# launch a crawlee script in folder /app (aka ./src)

  node ./index.js