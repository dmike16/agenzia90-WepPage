#!/usr/bin/env bash
#
# Author: dmike
# email:  cipmiky@gmail.com
# description: build a two stage image to serve the application
#
set -Eeuo pipefail
trap "buildah rm -a" ERR

VERSION='3.0.0'

build_container=$(buildah from --format oci --name app-build node:lts-alpine3.16)
buildah run $build_container -- mkdir '/tmp/working_dir'
buildah copy $build_container 'packages' '/tmp/working_dir/packages'
buildah copy $build_container 'lerna.json' '/tmp/working_di/'
buildah copy $build_container 'package.json' '/tmp/working_dir/'
buildah copy $build_container 'tsconfig.json' '/tmp/working_dir/'
buildah config --workingdir '/tmp/working_dir' $build_container
buildah run $build_container -- npm install && npm run bootstrap && npm run build && npm run pack

server_container=$(buildah from --format oci --name app nginx:stable-alpine)
buildah add --from app-build $server_container /tmp/working_dir/packages/app/build/app-v${VERSION}.zip /usr/share/nginx/html/
buildah add --from app-build $server_container /tmp/working_dir/packages/app/build/app-legacy-v${VERSION}.zip /usr/share/nginx/html/
buildah run $server_container -- unzip -o -d /usr/share/nginx/html /usr/share/nginx/html/app-v${VERSION}.zip
buildah run $server_container -- unzip -o -d /usr/share/nginx/html /usr/share/nginx/html/app-legacy-v${VERSION}.zip


buildah config --created-by "dmike16"  $server_container
buildah config --author "dmike16 at cipmiky@gmail.com" $server_container
buildah config --label name="dlabc/studio90srls-host:${VERSION}" $server_container

# Commit the image and remove the container
buildah commit --rm $server_container dlabc/studio90srls-host:${VERSION}
buildah rm $build_container
