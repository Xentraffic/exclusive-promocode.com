npm run build
mkdir dist
cp -r homepage_files dist/
cp index.html dist/

aws s3 sync dist s3://exclusive-promocode.com/ --profile xentraffic --acl public-read --exclude "*.DS_Store"