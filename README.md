# Welcome to Level Up
<div style="text-align: center;">
<img src="frontend/src/assets/logo.png" alt="Alt Text" width="300"><br>
</div>
Level Up is an online learning platform which was made as the final project for a course named "CS50's Web Development with Python and Javascript" by Harvard University. It is a website with it's frontend based on react.js and backend based on Django. It works on the idea that anyone can curate video tutorials of various Youtubers to make their own custom designed course.

## Distinctiveness and Complexity  

### Seperate Frontend and Backend:
Earlier I used JS linked with Django HTML templates which had limited frontend features.
In this **Online Learning Platform** I have seperated the frontend & backend and have used whole React + Typescript framework as frontend. And for backend, Django. The use of react opened a new dimension for me as I have used custom datatypes for user, course, category and all other model data. React also brought with it useState, useEffect, useRef, useParams, which brings a complex path of asynchronous nature of programming which is effectively used.

### useState():
Setting a variable with new value takes time. We might not be updating the latest value of variable.
So in the case of an array[] or object{} as the data in state variable, I used an updater function to pass the previous value and then add a new value to the variable.

### useEffect():
Knowing that if a variable in the dependency array is set inside useEffect, it would result in infinite loop, I had to make a chain of multiple useEffects one saving a state variable..and that triggering another useEffect.

### Reactive forms:
Earlier submitting a form without refreshing the whole page was difficult.
Therefore I have implemented reactive forms. When a field is edited, the state variable keeps track of each keystroke entered in the field and whenever we press submit the form data is sent as a PATCH request. Then the returned updated data is re-entered into the fields (in case of profile page form). In case of Course editing, small edit icons can be seen by you if you are the instructor/creator of the course. Thus you as an instructor, when clicks the edit button, the data becomes an input field/textarea and you can edit the field individually and then you can click on the green tick and it will be saved right there without even going to another page. 

### Conditional Rendering:
There are a lot of places where I have used conditional rendering. A student not enrolled cannot see course modules & lectures in it. Only the user who has created the course can see edit buttons and can edit fields, can edit modules, and can delete the whole course. If a student is not initially enrolled in ANY course, then a section of "My Courses" is not shown.

### Local Storage:
I earlier saved user data to local storage, which could be insecure. So I used JSON Web Tokens(JWT) to maintain sessions. Now only basic frequently reused info is saved in the local storage.

### Cookie Extraction:
As Django saves CSRF Token into cookies,I had to make a custom function to extract csrftoken from cookies.

### Reusable Components:
React allows to make reusable components which I have repeatedly used in Logo, Header, Bottom menu and Card. I made other components too in initial excitement but later realised that if requirements are only to show all inputs, checkboxes, buttons consistent, then CSS is way better option here. 

### Used AI to curate and upload dummy data:
Manually cretaing data for ~350 courses x ~5 modules each x ~5 lectures each was a very tedious task. And I did not wanted simply dummy data which dooes not present the website correctly.
So I made scripts to crawl accurate thumbnails, data/links from YouTube and AI generated Titles, Taglines, Descriptions, Requirements, and every course has some Modules and each Module has some Lectures. All data was generated based on their parent. Thus the site currently has on the topic courses>modules>lectures fully working links. 

### Webpack and it's plugins:
A bundler is needed so that typescript can be converted to JS
Therefore I have used Webpack, CSSMinimizer, babel and other plugins to convert and optimize .CSS, .TSX files in faster loading and more compatible form.

### Proxy Url:
Had to setup the proxy url. When a frontend router cannot find a url in the App.tsx routing code, then it goes to the proxy i.e. the backend database.

### Mobile-First approach:
I have created the UI on mobile first approach which means it works more better on mobile phone (considering the large number of mobile devices accessing the web in India and around the world.)

### DRF(Django Rest Framework):
I have used django_rest_framework for connecting frontend to backend. It provides multiple features like  Authentication, Serialization, Browsable API, Viewsets.

### DefaultRouter, Viewsets, Serializers:
I have used viewset.ModelViewSet as base class for viewsets and added custom code over it. When we register a keyword say "books" with a viewset named "BooksViewSet" to the DefaultRouter, the router will route CRUD operations as per request methods to the respective ViewSet. This viewset after manipulating data, sends this data to the registered serializer. Which returns the data in JSON format for API. 

### Pagination:
I have used PageNumberPagination class from rest_framework.pagination. By this I paginated serialized data, hence you can see courses in pages.

I have also immensely used **@action decorator** for code logic apart from basic CRUD operations. For Free, Trending, Related Courses, Search filtering.

I have also used **@api_view** decorator which are function based views and require manually set seperate urls unlike @action decorator which takes care of the url routing.

### CORS(Cross-Origin Resource Sharing):
I have setup CORS variables which are required to allow hosts so that other websites( front-end in this case) can fetch data from API requests.

### Fetch Requests:
I have sent requests by using the fetch() method. Every request must be made as per the requirements of the backend and must include method, body with appropriate data format, headers like Content-Type, X-CSRFToken for CORS. These requests return promises which take certain time to resolve. Once resolved, successful ones have returned data in them from backend which can then be used to save into state variables which are being displayed on the front end. Here 2 things play important role. First, time to resolve a promise, second,  time to save value into state variable. Doing this in desired sequence was a challenge.

### Secret keys:
A usual things for projects, but not included in my previous small projects was the use of .env file and secret keys inside it. And mentioning the file formats in .gitignore so that it is not uploaded there.

### Social Login:
I have implemented google and facebook login in this project and was successfully able to fetch data from user accounts. But I only had access to limited data from them and the user then had to fill rest of data by themmselves. Due to time constraints I decided only to work with Custom Login and SignUp.

### JWT Authentication and Custom Authentication:
Earlier, I used local storage to maintain if the user is logged in or not. But when I logged in a different user in the frontend, the backend request.user remained the previous one. This made me realise that the user in the front and backend must be synced. Then I implemented JSON Web Tokens to keep track and update backend user. And removed any local storage dependency. Directly verifying user from backend. 

JWT is basically an authentication system which provides tokens if the user is authenticated successfully. And this token expires after a certain time marking the end of a session. Then user has to either login again or refresh token to continue being authenticated.

### Error handling:
In complex projects like this where API requests are being sent on internet, chances of errors are many. Error handling becomes very crucial. I have currently used console.log as a way to catch errors or show success.

## File Structure and Contents

Basic Structure and major files. Also frontend>src>pages has important javascript files.
.
```
├── backend
│   ├── api
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── authentication.py
│   │   ├── __init__.py
│   │   ├── migrations
│   │   ├── models.py
│   │   ├── __pycache__
│   │   ├── resources.py
│   │   ├── serializers.py
│   │   ├── tests.py
│   │   ├── urls.py
│   │   ├── utilities.py
│   │   └── views.py
│   ├── backend
│   │   ├── asgi.py
│   │   ├── __init__.py
│   │   ├── __pycache__
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── db.sqlite3
│   ├── manage.py
│   ├── media
│   │   ├── category_images
│   │   ├── course_thumbnails
│   │   ├── misc
│   │   ├── profile pics
│   │   └── subcategory_images
│   ├── requirements.txt
│   ├── staticfiles
│   └── venv
├── frontend
│   ├── babel.config.js
│   ├── dist
│   ├── node_modules
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── public
│   │   └── index.html
│   ├── requirements.txt
│   ├── src
│   │   ├── App.tsx
│   │   ├── assets
│   │   ├── components
│   │   ├── index.tsx
│   │   ├── pages
│   │   ├── styles.css
│   │   └── utilities
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── webpack.config.js
├── README.md
├── scripts
└── Workflow.png 
```

## Installation Instructions

**Clone Repository:** git clone https://www.github.com/Waqar-q/levelup.git

### Backend Setup:

**Navigate to backend:** cd backend <br>
**Create virtual environment:** python -m venv venv <br>
**Activate virtual environment:** source venv/bin/activate (Linux/Mac) or venv\Scripts\activate (Windows) <br>
**Install dependencies:** pip install -r requirements.txt <br>
**Apply migrations:** python manage.py migrate <br>
**Start backend server:** python manage.py runserver <br>

### Frontend Setup:

**Navigate to frontend:** cd ../frontend <br>
**Install dependencies:** npm install <br>
**Start frontend server:** npm run start <br>

### Access Application:

Visit http://localhost:3000 in browser.



## Usage Instructions  
1. **Login & Sign Up**: Start from the login page. at the bottom you will find a sign up link. Sign up by making a new user account.
2. **Select Role**: Select Instructor/Student.
3. **Explore**: Explore various courses on the explore page.
4. **Search**: You can even search a specific course by clicking on search icon/button in top right.
5. **Filter**: You can filter the courses by trending or free.
5. **Course Page**: Click on any course to view all about it.
6. **Enroll**: You can enroll just by clicking on "Enroll" button.
7. **Course Access**: Once enrolled, you'll be able to see course modules and inside each module, there will be muliple lectures.
8. **Edit Course Fields Dynamically**: If you are the Creator/Instructor of the course, you'll see a small edit icon near course details like near course title, tagline, description etc. You can edit them there only and click on tick to confirm.
9. **Add Modules Dynamically**: If you want to edit/add modules of your created course, then in top right options you'll find "Edit Modules" option where you can add modules and add lectures inside it.
10. **Profile**: You can edit your personal details in Profile page.
11. **Settings**: You can access options like logout here.

## Requirements  
View all Backend dependencies in backend/**requirements.txt** <br>
View all Frontend dependencies in frontend/package.json

## Known Issues and Limitations
- Some Courses might not have empty data (Thumbnails, Modules or Lectures) as they were generated/crawled with AI/script. And some gaps were left unfilled.
- The data of views, duration, rating, is currently only uploadable via admin interface of django.
- The Percentage of course in "my courses" on explore page is randomly generated on each refresh.
- Settings page has many options, but only profile and logout are currently functional.
- No paywall has been added to the enrollment process for now to ease up testing.
- Editing course thumbnail and profile image in currently on possible via admin interface. Though while making a new course, thumbnail can be easily previewed and added.
- In Sidebar, apart from Settings and My Profile, other links do not work.
- In Bottom Menu, Notifications does take you to a notifications page. But functionality to update and save notifications to it's model has not been added yet.
- In Bottom Menu, My courses does not take you to a seperate my courses page. But you can see them on explore page for now.

## Future Improvements
1. Fully funtional Bottom Menu.
2. Profile picture and Thumbnail editable from UI.
3. Real Project Tracking
4. Functional views, duration, and rating.
5. Functional Paywall.
6. Contact and Support.

## Stay Connected
- Instagram: [waqar_curious](https://www.instagram.com/waqar_curious)
- GitHub: [Waqar-q](https://www.github.com/Waqar-q)
- LinkedIn: [Waqar Qureshi](https://www.linkedin.com/in/mrwaqarqureshi/)
