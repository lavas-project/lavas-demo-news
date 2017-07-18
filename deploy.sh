dir=../lavas-project.github.io/lavas-demo/news-v2/

if [ ! -d "$dir" ]; then
    mkdir $dir
fi

cp -Rf dist/* $dir

cd $dir

git add -A
git ci -m 'deploy news-v2'
git push origin master