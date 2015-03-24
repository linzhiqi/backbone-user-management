# Backend

In the `backend` folder you can find a skeleton for a simple app. These assignments require you to modify and add code as needed. You should also add test cases when you think that's appropriate.

### 1. Password saving

Make sure that users are stored in the database in a safe way. How would you store passwords? You can add 3rd party libraries and new properties to User model if needed.

### 2. Password validation

How would you validate that user is logging in with the correct password? Implement the function `checkPassword` according to specification in the User model code.

### 3. Don't allow creating user with existing username
Creating users with existing username should result to error `Username xx is already taken`.

### 4. ACL
When listing users with

			GET /users
			GET /users/:id
		
Make sure passwords (and other non-public properties) are not sent. _Hint_: check [serverbone](https://github.com/Everyplay/serverbone) codebase.


# Frontend
Make a simple frontend app: 'admin' GUI for the previously built backend using [BackboneJS](http://backbonejs.org/) or [React](http://facebook.github.io/react/) or both. With the app, you should be able to create new users and list created users.

# Screenshots
Backend unit test
![Backend unit test](https://raw.github.com/linzhiqi/backbone-user-management/master/readme-img/backend-unit-test.png)

Frontend unit test
![Frontend unit test](https://raw.github.com/linzhiqi/backbone-user-management/master/readme-img/frontend-unit-test.png)

Form input validation error
![Form input validation error](https://raw.github.com/linzhiqi/backbone-user-management/master/readme-img/validation-error.png)

Error message from api
![Error message from api](https://raw.github.com/linzhiqi/backbone-user-management/master/readme-img/error-from-api.png)
