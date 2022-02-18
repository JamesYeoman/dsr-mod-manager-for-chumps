#!/usr/bin/env sh

set -e

export GH_PAGES_BUILD=1
yarn build
unset GH_PAGES_BUILD

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/JamesYeoman/dsrbmm.git HEAD:gh-pages

cd -