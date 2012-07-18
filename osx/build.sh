#!/bin/sh

set -e
set -x

TARGET="thaiWitter-DEV"
XULFRAMEWORK="`pwd`/XUL.framework/"

if [ "$CONFIGURATION" = "Release" ]; then
  TARGET="thaiWitter"
fi

mkdir -p "$TARGET.app"
cd "$TARGET.app"

mkdir Contents
cd Contents

link_or_copy() {
  if [ "$CONFIGURATION" = "Release" ]; then
    rsync -rlv "$1" "$2"
  else
    ln -s "$1" "$2"
  fi
}

link_or_copy ../../../tw/ Resources

if [ "$CONFIGURATION" = "Release" ]; then
  rm Resources/defaults/preferences/debug.js
fi

mkdir Frameworks
rsync -rlv "$XULFRAMEWORK" Frameworks/XUL.framework
rsync -rlv ../../Contents/ .

mkdir MacOS
cd MacOS
cp ../Frameworks/XUL.framework/xulrunner .
for I in ../Frameworks/XUL.framework/*.dylib; do ln -s "$I"; done


