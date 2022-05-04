# Unique - Anti Theft
Searching and reporting plagiats all over the Internet.

# How to build and develop frontend?
You add this prefix to all of your `npm` commands: `sudo docker-compose exec frontend`.
Let's say, you want to install `react-input-mask` library. You should execute
this command: `sudo docker-compose exec frontend npm install react-input-mask`.
After any change to `node_modules`, please restart `frontend` docker container executing 
`sudo docker-compose restart frontend`.
