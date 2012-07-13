#!/bin/sh

set -e
set -x

TARGET="thaiWitter-DEV"

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

mkdir Frameworks
rsync -rlv /Library/Frameworks/XUL.framework/Versions/13.0.2/ Frameworks/XUL.framework
rsync -rlv ../../Contents/ .

mkdir MacOS
cd MacOS
cp ../Frameworks/XUL.framework/xulrunner .
for I in ../Frameworks/XUL.framework/*.dylib; do ln -s "$I"; done


