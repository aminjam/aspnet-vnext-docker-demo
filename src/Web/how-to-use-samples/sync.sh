#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR/..
git pull
git fetch upstream
git checkout upstream/master
git rebase master
git checkout master
git merge --no-ff --no-edit upstream/master
git push
