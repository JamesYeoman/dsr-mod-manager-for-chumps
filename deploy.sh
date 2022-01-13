#!/usr/bin/env sh

set -e

yarn build

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/JamesYeoman/dsrbmm.git HEAD:gh-pages

cd -