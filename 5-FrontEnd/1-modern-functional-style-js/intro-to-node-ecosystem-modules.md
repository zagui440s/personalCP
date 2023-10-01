# Intro to the node project ecosystem

---

## aka

The agony and the ecstasy of:

- npm vs yarn
- package.json
- node projects
- CommonJS vs ESModules, i.e. require vs import/export


---

## in other words ...

Modern JS!

---

## Project scaffolding and setup

---

### Initial setup - create the project

First, create your project directory and navigate to it.

```bash
> mkdir video-store
> cd video-store
```

---

### Initialize the node project

Now run `npm init` in the project root directory to initialize an npm project. Follow all the steps below.

1. For "package name" put `video-store`,  you will see why shortly.
2. **When it prompts you for an entry point**, put `app.js`
3. Just leave everything else blank and hit enter for now. If you want to experiment, feel free, it should not break anything.

---

The npm init CLI asked us for an **entry point** -- this is the file path (which includes the file name) that node and npm will use when searching through files for dependencies (other files/modules we are importing, etc).

---

We set our entry point to `app.js`. Lets create that file now. Run this in your project root dir:

```bash
> touch app.js
```

Add `console.log('hello, world!)` to line one of `app.js` and then run:

```bash
> node app.js
```

---

It is **always** a good idea to continuously ensure - usually by running code or tests - that your program is in a good state, i.e. that it runs without errors `and does what you are expecting it to do. This is the easiest way to catch typos and programmer error early before they metastasize and suck up hours of debugging. 

---

### Sidebar 

#### what is an npm module?

---

An npm module or *node module* is a standard format for sharing Javascript **projects** (a collection of files, essentially) that use node.js and npm or another node package manager like yarn.

An npm module **must** contain a `package.json` file.

---

An npm module can be *published*, either publicly to the [npmjs registry](https://www.npmjs.com/) or privately.

We didn't do it this time but by modifying your `package.json` file you can control this, and, tell npm to look for a specific git repository, etc, when a user wants to install your module.

---

When we run `npm install my-module`, npm checks the npmjs server to see where to go (usually a github repo) to get the source code for that module.

---

#### Back to - what is an entry point?

We set our entry point to `app.js`

**If someone else has downloaded our module using `npm install`, and then uses `require` to import and run our module in their program - this is the file that gets run.**

**Like so ...**

---


*example of another person using our program in their code*

```js
// runs our program by executing whatever is in `app.js`
// Note that they use the *name* of our npm module, which we specified
// when we ran `npm init`
const videoStore = require(video-store);

// lets pretend our module actually does stuff ...
videoStore.addCustomer('Alice');
```

---

### Best practice -- Getting oriented

For a new project, always get oriented.

---

It's always a good idea to take a few minutes to look at the config files and directory structure of a new project. Let's do that now.

---

#### package.json

Look at the `package.json` file. This was created when we ran `npm init`. We don't have to modify it yet, just check it out. It is a good habit to always look at the `package.json` file of a project to get a sense of its structure, dependencies, and npm scripts.

---

#### .gitignore

Look at the `.gitignore` file. Wait! We don't have that yet - it doesn't exist. Why do we want one?

- The `.gitignore` file tells whatever git repo (ie whatever directory) its in to *ignore* certain files and folders.

Why do we want to do that?

---

##### Stuff we want to ignore

- Log files with error messages and such, which we don't want to check into version control (put into our projects github).

- *Dependencies* - other programs we install. Like node modules.
  - We want a **list** of the dependency names - this goes in `package.json`
  - But the dependencies themselves ...
    - We want to be able to grab the newest version.
    - They can get big.

---

##### Best Practice

Don't check dependencies (modules or libraries you install with a package manager) into version control.

They take up space, and you often want to grab the latest version.

Instead, check the **dependency name and version** into version control.

- In JS with npm this is done in `package.json`
- In Python with pip this is done in `requirements.txt`

---

#### ... Back to creating that `.gitignore` file:


```bash
> echo 'node_modules' >  .gitignore
```

This creates the file and appends "node_modules" to it.
You can run these commands to confirm the file was created correctly and contains what it should:

```bash
ls -a 
cat .gitignore
```

---

### Wait ... node_modules?

The `node_modules/` directory is where our *dependencies* - npm packages (aka node modules) get installed. We will investigate this more shortly.

---


(which was included in this repo). When you create a github repo you can choose a default `.gitignore` file and one option is specifically for node.js projects, which is what was used here.

---

Note that the `node_modules/` directory is in there, which means that git will ignore everything in `node_modules/`. This is good, as we don't want to check dependencies into version control.

---

### Creating a 'start' npm script

Now lets modify `package.json`. We are going to add an *npm script* we can call to run our program for us.

**For node projects this script is always called "start"**.

---

Modify the `scripts` object so it has a property named `start`. It should look more-or-less like the code below.

*** IMPORTANT *** **Don't forget to add a comma at the end of the "test" line of code**

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js"
  },
```

---

As your node projects become more complex, this is a standard practice. Many frontend build tools, like *vite* or *create-react-app* actually do this for you.