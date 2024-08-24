
#PREQUISITES:

#npm install express 
#npm install selenium-webdriver
#npm install axios
#npm install cors
#npm install -g pm2
#npm install -g serve

#Server start commands

#pm2 start server.js --output output.log --error error.log
#cd client
#pm2 start npm --name "react-app" -- start --output react-output.log --error react-error.log

pm2 start ecosystem.config.js

pm2 stop ecosystem.config.js

#To check running processes:

#pm2 list
#pm2 stop react-app
#pm2 restart server
#pm2 restart react-app
#pm2 delete react-app
#pm2 logs server
#pm2 logs react-app
