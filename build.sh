#!/usr/bin/env bash

echo "cleaning...";
rm -rf prebuild;
mkdir prebuild;
cp -r ./src/* ./prebuild;

echo "lessing...";
for lessfile in $(find ./prebuild -name "*.less"); do
cssfile=$(echo $lessfile | sed 's/\.less$/.css/')
echo "Comiling $lessfile to $cssfile";
rm -f $cssfile;
node_modules/.bin/lessc $lessfile > $cssfile;
done;

for file in $(find ./prebuild -name "*.ts"); do
sed -ie 's/.less/.css/g' $file;
done;

echo "aoting...";
rm -rf bin;
node_modules/.bin/ngc -p tsconfig.aot.json;
cp package.json bin;