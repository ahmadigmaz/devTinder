# authRouter
- POST/signup
- POST/login
- POST/logout

# profileRouter
- GET/profile/view
- PATCH/profile/edit
- PATCh/profile/password

# connectionRequestRouter
- POST/request/send/interested/:userId
- POST/request/send/ignored/:userId
        //allowed request
        //checking that toUser is valid or not
        //checking connection request already exist or not


- POST/request/review/accepted/:requestId
- POST/request/review/rejected/:requestId

# userRouter
- GET/user/requests/received
- GET/user/connections
- GET/user/feed - // gets you the profile of the other users 


 status: ignore, interested, accepted, rejected 
