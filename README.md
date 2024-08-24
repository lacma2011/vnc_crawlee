# I. installation

docker-compose build

# install the dependencies

  docker-compose run --rm -it --entrypoint 'bash -c bash' crawlee
  # in the shell, should be in folder /app
  npm install

# launch services: environment with vnc server and crawlee
  docker-compose up


# II. while services are up, run crawlee script inside container
    
# run vnc client on your machine and go to the container

  cd /app
  npx playwright install
  npx playwright install-deps

#TODO: make that install in the image build, since it seems to have failed

# launch a crawlee script in folder /app (aka ./src)

  node ./index.js