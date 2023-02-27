# Opportunity Network Events Django Task

## Description

This is a mini-app for organizing and sharing events. It helps users browse through different events in one place.
I learned how to build a Django REST API with a React Frontend.

<!-- ## Table of Contents (Optional)

If your README is long, add a table of contents to make it easy for users to find what they need.

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license) -->

## Installation

Follow this steps to run the project in your machine.

### Github

- download by cloning the repo:

```shell
git clone https://github.com/marcelrm11/opp-network-events.git
cd ./opp-network-events
```

### Backend: Python-Django

- this project uses python 3.11.1, check your system and download it if needed.
- also install pipenv if needed:

```shell
python --version
python3 --version [for Mac users]
pip install pipenv [or pip3]
```

- create virtual environment, install dependencies and activate the subshell:

```shell
pipenv install
pipenv shell
```

- select the python interpreter created for this virtual environment, on VS Command Palette. It should have a path stating your virtual environment directory. This will enable the virtual environment for the new terminals opened in this project.

<img src="./frontend/src/assets/select-python-interpreter.png" width="400" alt="Select Python Interpreter" />

#### Database configuration:

- create database, open a new terminal window

```shell
createdb my-db-name
```

- in `settings.py` under DATABASES, configure your database connection, editting the name, user, password, host and port for your database connection.

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql', # or alternative
        'NAME': 'my-db-name',
        'USER': 'my-postgres-user',
        'PASSWORD': 'my-password',
        'HOST': '127.0.0.1', # localhost
        'PORT': '5432', # this is PostgreSQL default
    }
}
```

- apply migrations:

```shell
python manage.py migrate
```

- [OPTIONAL] populate with mock data, you can use the sql files found in the "events" directory. I use pgAdmin and copy paste the files. First the users file and after, the events file.

```sql
-- Mock data files contain 1000 rows like these.
-- Users:
insert into events_user (id, first_name, last_name, email, password, username, is_superuser, is_staff, is_active, date_joined) values (1, 'Hubie', 'Seer', 'hseer0@kickstarter.com', 'nFZzbSO9a', 'hseer0', true, false, true, '2023-02-16 07:14:25');
-- Events:
insert into events_event (id, title, slug, date, status, location, creator_id) values (1, 'sit amet sapien dignissim vestibulum vestibulum ante ipsum', 'jni-ysf-ycu-joc', '2023-01-31 16:39:19', 'PB', '5 Hayes Crossing', 216);
```

- then, you'll need to run these queries to set the current id values for both tables:

```sql
SELECT setval('events_user_id_seq', (SELECT MAX(id) FROM events_user));
SELECT setval('events_event_id_seq', (SELECT MAX(id) FROM events_event));
```

- you can check the current values like this:

```sql
SELECT currval(pg_get_serial_sequence('events_user', 'id'));
SELECT currval(pg_get_serial_sequence('events_event', 'id'));
```

- next, go back to your virtual environment terminal window, and create a superuser:

```shell
python manage.py createsuperuser
```

follow the steps and then go to the backend URL.

- you can go to "/admin" for the admin site (here you should log in with your super user credentials)
- you can go to "/events" for the rest api site (here you can use Django REST framework to test API endpoints).
  Note that you need to comment this code in `settings.py` to test the endpoints without passing the Authorization token every time:
  ```python
  REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
    }
  ```

### Frontend: React-Vite

- to start the frontend, you must first cd in "frontend" directory:

```shell
cd ./frontend
```

- install dependencies:

```shell
npm install
```

## Run the project

- start the backend server from the project root (you can specify a port number)

```shell
python manage.py runserver # [port_number]
```

by default, it will start at http://127.0.0.1:8000/ (localhost port 8000)
this is used by the frontend to make api calls to the database.

- run the project from the frontend directory in development mode:

```shell
npm run dev
```

by default, it will start at http://127.0.0.1:5173/ (localhost port 5173)
this is where the app can be accessed.

<!--
## Usage

### Frontend:
#### Router

#### Authentication

#### Display Events

#### Filter Events

Antes de comenzar a profundizar en los documentos de la API/Componente, sería genial ver cómo se ve el módulo en acción. Así puedo determinar rápidamente si el JS de ejemplo se ajusta al estilo y al problema deseados. La gente tiene muchas opiniones sobre cosas como promesas / devoluciones de llamada y ES6. Si se ajusta a los requisitos, entonces puedo proceder con más detalles.

Provide instructions and examples for use. Include screenshots as needed.

To add a screenshot, create an `assets/images` folder in your repository and upload your screenshot to it. Then, using the relative filepath, add it to your README using the following syntax:

    ```md
    ![alt text](assets/images/screenshot.png)
    ```

## Project Structure

## API/Component

El nombre, la descripción y el uso de este módulo me parecen atractivos. Es muy probable que utilice este módulo en este momento. Solo necesito escanear la API para asegurarme de que haga exactamente lo que necesito y que se integre fácilmente en mi base de código.

La sección de API debe detallar los objetos y funciones del módulo, sus firmas, tipos de devolución, devoluciones de llamada y eventos en detalle. Los tipos deben incluirse donde no sean obvios. Deben dejarse claras las advertencias.

## Stack | Not using the common-readme | Not required

Stack tecnológico utilizado y porqué y si se quiere reconocimientos a librerias u otros proyectos base del que se parte. -->

## Testing

So far, the app has been tested manually within the development environment. The available tools to test and debug the project are:

1. Django REST framework + debug toolbar for the backend.
2. Chrome DevTools + React DevTools + React Strict Mode for the frontend.

<!-- ## API Endpoints -->

## Next Steps

1. Correct Authentication syncing problems
2. Add Features (CRUD)
3. Improve UX
4. Refactor (Django and React)
5. Automated Testing

## Contact info

You can contact me at marcelrm11@gmail.com.

<!-- ## License

The last section of a high-quality README file is the license. This lets other developers know what they can and cannot do with your project. If you need help choosing a license, refer to [https://choosealicense.com/](https://choosealicense.com/). -->
