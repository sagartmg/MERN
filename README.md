1. heorku install
2. heroku login
3. heroku create
4. git init
5. heroku git:remote -a sheltered-spire-06602

if in master git branch
==> git push heroku master

if not in master git branch
6.git checkout -b main// creating a branch named main
7.git branch -D master
8.git add .
9.git commit
10.git push heroku main
