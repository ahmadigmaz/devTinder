--jason web token(jwt)

--Parameters of the use() function
if app.use(a,b) = then first is work as req and second worked as res
if app.use(a,b,c) = then first is work as req, second is work as res and the third one is worked as next;
if(a,b,c,d) = a = error

 # Express Router
 so lets first understand the problem statement , the problem is suppose if we have more than 100 api so wan not write our apis in a app.js file that is avery bad style of writing a code, So what we do , we can do here is , we can use express router to handle the groups of the apis, we can make a group of the apis and then use the express routwr to make an upcomming api calls . thats it


 if user send the some data through parameters then , you should get the data through params. e.g - const data = user.params.data;

 # PAGINATION
 "/feed?page=1&limit=10"=> first 10 users
 "/feed?page=2&limit=10"=> next 10 users=>from 11 to 20

 funcrions to use = skip() and limit()
 limit can be took from the req.query
 skip = (page-1)*limit;


 # AWS 
 - create an account on AWS
 - move to the console
 - search ec2 in search bar 
 - click om it
 - Luanch a new instance
 - select the os i choose ubuntu
 - then create a login pair , a secret pam file
 - then cliick launch , it takes some times
 - then click on view your instances
 - then click your instance id
 - then click connect.
 - login through terminal. go to SSH.
 - follow the steps of SSh terminal
 - in terminal go to the folder where that secret key is located and then run the command given in the SS terminal.


 # Nginx
 to host our product
 - command used
 sudo apt update
 sudo apt install nginx
 sudo systemctl start nginx
 sudo systemctl enable nginx
 copy code from disk folder to nginx
 sudo scp -r dist/* /var/www/html
 enable port 80 in your instances

 - 




