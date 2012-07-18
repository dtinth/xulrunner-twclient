This directory contains files needed to build the OS X version.

First, copy or extract `XUL.framework` into this directory.

To create the development build (most stuff being just symlinked),

    sh build.sh

To create the release build (really copy things into the app bundle),

    CONFIGURATION=Release sh build.sh


