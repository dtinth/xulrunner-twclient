#!/bin/sh

set -e
set -x

TARGET="thaiWitter"
XULFRAMEWORK="`pwd`/xulrunner/"

mkdir "$TARGET"
cd "$TARGET"

rsync -rlv ../additional-files/ .

rsync -rlv ../../tw/ twclient
cd twclient
rm defaults/preferences/debug.js

