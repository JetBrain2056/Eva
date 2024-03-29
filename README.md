# EVA
Business application development platform.
Demo (prototype) platform with MVC architecture, CRUD Rest API and Server-Side Rendering (SSR).
The configurator is designed for interactive construction of the DBMS architecture and easy migrations of its versions.
A hybrid of classical and object-oriented architecture (OOA).

## Installation

### SSH
```
git@github.com:JetBrain2056/Eva.git
```
### HTTPS
```
https://github.com/JetBrain2056/Eva.git
```
### GitHub CLI
```
gh repo clone JetBrain2056/Eva
```
To install dependencies use `npm i`
> If errors occur, delete `.node_modules` and write `npm i -s`


## Usage
### Example of the .env root file:
```
  PORT=3000
  HOST=0.0.0.0
  DB_NAME=eva
  DB_USER=postgres
  DB_PASSWORD=postgres
  DB_HOST=localhost
  DB_PORT=5432
  LANGUAGE=en-en
```
> HOST can also be 127.0.0.1
