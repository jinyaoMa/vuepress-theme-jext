#!/usr/bin/env sh

# abort on errors
set -e

# build
#npm run icons:dev
#npm run vuepress:build

# navigate into the build output directory
cd "\$_docs/.vuepress/dist"

# if you are deploying to a custom domain
#echo 'ma-jinyao.cn' >CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:jinyaoMa/vuepress-theme-jext.git master:gh-pages

cd -
