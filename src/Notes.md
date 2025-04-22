This is the files which helps to taken down the notes.
20-04-2025-Today we are learning the data sanitization, input validation and a lot more.

API level validations and Schema level validations.

{
    name: "igmaz",
    rollNumer: 12
}


const data = req.body;

const abc = Object.keys(data).every((key)=>
        xys.includes(key);
)



data should be validates first, then the password should be incripted

for validation ou should validate the firstName, lastName, email, strong password, 



create a login api=> what you have to do is that first check that the email user send is valid one or not then check the email which user send is present in our database or not then fetch the password of that user from that database and user the function bcrypt.compare(password, dbPass);
and this function returns the bullion and we got the bullion values from the database and according;y we can do the same.




to read a cookie we need a npm libraray , which is called cookie parser.



jason web token(jwt), 


if app.use(a,b) = then first is work as req and second worked as res
if app.use(a,b,c) = then first is work as req, second is work as res and the third one is worked as next;
if(a,b,c,d) = a = error

how can we expire the jwt token.
now we are gonna learn about how can we set the time to expire out token.
