#!/bin/bash
usage() { echo "Usage: $0 [-f <flag>]" 1>&2; exit 1; }

while getopts ":f:" o; do
  case "${o}" in
    f)
      flag=${OPTARG}
      ;;
    *)
      usage
      ;;
  esac
done
shift $((OPTIND-1))

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR/..

echo "Running $flag Mode"
if [ "$flag" == "runnable" ]; then
  mv "$DIR/bower.json" "$PWD/bower.json"
  mv "$DIR/app/index.html" "$PWD/app/index.html"
  mv "$DIR/app/scripts/app.js" "$PWD/app/scripts/app.js"
  mv "$DIR/app/scripts/config.js" "$PWD/app/scripts/config.js"
  mv "$DIR/app/scripts/configs/routesConfig.js" "$PWD/app/scripts/configs/routesConfig.js"
  mv "$DIR/app/data/url.json" "$PWD/app/data/url.json"
  mv "$DIR/app/components/about" "$PWD/app/components/about"
  mv "$DIR/app/components/home" "$PWD/app/components/home"
  mv "$DIR/app/components/bootstrap/partials/nav.html" "$PWD/app/components/bootstrap/partials/nav.html"
  mv "$DIR/test/spec/about" "$PWD/test/spec/about"

else
  mv "$PWD/bower.json" "$DIR/bower.json"
  mv "$PWD/app/index.html" "$DIR/app/index.html"
  mv "$PWD/app/scripts/app.js" "$DIR/app/scripts/app.js"
  mv "$PWD/app/scripts/config.js" "$DIR/app/scripts/config.js"
  mv "$PWD/app/scripts/configs/routesConfig.js" "$DIR/app/scripts/configs/routesConfig.js"
  mv "$PWD/app/data/url.json" "$DIR/app/data/url.json"
  mv "$PWD/app/components/about" "$DIR/app/components/about"
  mv "$PWD/app/components/home" "$DIR/app/components/home"
  mv "$PWD/app/components/bootstrap/partials/nav.html" "$DIR/app/components/bootstrap/partials/nav.html"
  mv "$PWD/test/spec/about" "$DIR/test/spec/about"
fi
