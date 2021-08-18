#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd src/.vuepress/dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://minimal-apis.github.io/
#git push -f Minimal-APIs/minimal-apis.github.io.git main
git push origin gh-pages --force

# if you are deploying to https://<USERNAME>.github.io/<REPO>
#git push -f git@github.com Minimal-APIs/minimal-apis.github.io.git main:gh-pages
git checkout main

cd -