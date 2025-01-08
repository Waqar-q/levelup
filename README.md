# levelup
An online Learning Platform

First time I am making sure modularity and reusability before even starting the project. This will create consistency in design and make me work faster. Taking care of theme and repeatable elements in the start itself.

Dec 10, 2024 : I have realised that the easier way i was using to check if the user was logged in by using a variable in the localStorage, would have to b esent in request to the backend to check if the user is logged in. also if the user changes, backend does not know. so i have decided to use the jwt(JSON web token) in django. this will save a cookie under the name 'jwt' which can tell me in the backend about login situation. Also the user stays updated along the backend. 

I have learned that there are alot of things based on user data, hence it should be properly configured and login, register etc processes should be fully completed before going on to other things. Now I am having issues to change hings when user changes.

Dec 11, 2024: I learned that HTTP-only cookies cannot be accessed in frontend.
I am trying to make a custom MIDDLEWARE to keep track of the user using jwt tokens.

Dec 12, 2024: I learned that if we "setStateVariable()" inside component will result infinite re-rendering.

Dec 21, 2024: I have countered numerous problems due to the timing of fetch() overlapping with other fetches and long .then() chains. I thought code will excecute in sequence if .then is used. But state variables are queued by react irrespective of .then().

Dec 25, 2024: After 2 days i realised that setState({...variable, key:value}) is different from setState(variable => ({...variable, key:value})) as due to asynchronous nature of JS, former updates using current state of variable, whereas the latter updates after any other state changes in sequence have occured.