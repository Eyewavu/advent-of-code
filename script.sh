#!/bin/bash

function create_link () {
  echo "$1"
  ln -s "../$1"
}

rm -fr day-*
mkdir -p day-{01..25}

for i in ./day-*/
do
  cd "$i"
  cp ../package.template.json package.json
  yarn init -y
  create_link 'tsconfig.json'
  create_link 'rollup.config.js'
  yarn install
  mkdir src
  touch src/index.ts
  cd ..
done