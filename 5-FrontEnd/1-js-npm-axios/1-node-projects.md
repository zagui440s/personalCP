# Node.js and NPM (Node Package Manager)

In this lesson, we will cover the fundamental concepts of Node.js, NPM (Node Package Manager), and how to work with import and export statements within Node.js projects. These topics are crucial for any junior developer looking to create JavaScript-based server-side applications and manage project dependencies efficiently.

## Node.js

**Node.js** is a JavaScript runtime environment that allows you to run JavaScript code on the server side. It provides a set of built-in libraries that enable you to perform various tasks, such as reading and writing files, making HTTP requests, and creating web servers.

## NPM (Node Package Manager)

**NPM**, short for Node Package Manager, is a tool that comes bundled with Node.js. It serves as a package manager for JavaScript, allowing you to easily manage project dependencies.

### Basic NPM Commands

Here are some essential NPM commands:

- `npm -v`: Displays the version of NPM currently installed within your machine.

- `npm init`: Initialize a new Node.js project and create a `package.json` file, which keeps track of your project's dependencies and configuration. You can utilize the `-y` flag to tell npm to utilize default values to create your project if you don't have any specific configurations when creating your project.

- `npm install <package-name>`: Install a specific package as a project dependency.

- `npm install` of `npm -i`: Install all project dependencies listed in the `package.json` file.

- `npm uninstall <package-name>`: Remove a package from your project.

- `npm list`: List all installed packages.

## Creating An NPM Project (package.json)

Create a directory for our project named `to-do-list`, enter this directory and create our npm project with the following instructions.

### npm init

When you run `npm init` in the terminal, you're initializing a new Node.js project and generating a `package.json` file. The `package.json` file is essential for tracking project dependencies, scripts, and other configuration details. Let's break down what happens during the `npm init` process and how to read and understand each item generated within `package.json`.

1. **Project Name**: You will be prompted to enter a project name. This should be a unique and descriptive name for your project. It becomes the `name` field in `package.json`.

2. **Version**: You can specify the initial version of your project. Typically, this starts at `1.0.0`, and you can increment it as you make updates. This becomes the `version` field in `package.json`.

3. **Description**: You can provide a short description of your project. This is useful for describing the purpose or functionality of your project. It becomes the `description` field in `package.json`.

4. **Entry Point**: This is the main entry point of your application, i.e., the starting JavaScript file. It's commonly set to `index.js`, but you can change it. This becomes the `main` field in `package.json`.

5. **Test Command**: You can specify a test command that runs your project's tests. The default is usually `npm test`. This becomes the `scripts.test` field in `package.json`.

6. **Git Repository**: You can specify the Git repository URL for your project. If your project is on GitHub, this would be the URL of your repository. This becomes the `repository.url` field in `package.json`.

7. **Keywords**: You can provide keywords that describe your project. These help others find your project when searching on NPM. Keywords are stored in the `keywords` field in `package.json`.

8. **Author**: You can specify your name or the name of the project's author. It becomes the `author` field in `package.json`.

9. **License**: You can specify the license under which your project is distributed. Common choices are MIT, Apache-2.0, and others. This becomes the `license` field in `package.json`.

10. **Is this OK?**: After filling out these details, `npm` will display a summary of the information you provided. If everything looks correct, you can confirm by typing "yes" and pressing Enter.

Once you've completed the `npm init` process, you'll have a `package.json` file in your project directory with the information you've entered. It should look something like this:

```json
{
  "name": "your-project-name",
  "version": "1.0.0",
  "description": "Your project description",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/your-username/your-project-name.git"
  },
  "keywords": [
    "keyword1",
    "keyword2"
  ],
  "author": "Your Name",
  "license": "MIT"
}
```

This `package.json` file is crucial for managing your project's dependencies and scripts. You can edit it directly or use `npm` commands to modify it. It also serves as a configuration file for your project when you publish it to NPM or share it with others.

### Installing Dependencies

When you want to add a new package or library to your Node.js project, you can use `npm` to install it. In this section, we'll look at what happens within your `package.json` file when you run the following command to install the testing framework Axios:

```bash
npm install axios --save # You may have to prepend this command by `sudo`
```

However, there is no need to use `sudo` for regular `npm install` commands as it may lead to permission issues. So, use `npm install` without `sudo` for most installations.

Here's what happens when you run the command:

1. **`npm install`**: This is the command to install a package. In this case, we're installing the Axios package.

2. **`--save` (or `-S`)**: This flag is used to add the package as a project dependency in your `package.json` file. This means that Axios will be listed as a dependency, and its version information will be recorded.

Now, let's take a look at your `package.json` file after running the command:

```json
{
  "name": "your-project-name",
  "version": "1.0.0",
  "description": "Your project description",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/your-username/your-project-name.git"
  },
  "keywords": [
    "keyword1",
    "keyword2"
  ],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "axios": "^1.6.0"
  }
}
```

As you can see, the `"dependencies"` section in your `package.json` now includes Axios, along with its version number. This means that anyone who downloads your project and runs `npm install` will automatically get the required dependencies, including Axios, thanks to the information in `package.json`. This is crucial for ensuring that your project works consistently across different environments and for sharing your project with others.

In addition to saving the package as a dependency, Axios will be installed in the `node_modules` directory within your project folder, and you'll be able to use it for testing your JavaScript code.

### `package.json` vs. `package-lock.json`

When working with Node.js and managing project dependencies using npm, you'll often come across two important files: `package.json` and `package-lock.json`. These files play distinct roles in your project, and it's essential to understand the differences between them:

#### `package.json`

- **Purpose**: The `package.json` file is the heart of your Node.js project. It serves as a manifest for your project, documenting its name, version, description, author, dependencies, and other project-specific information.

- **Contents**: Within `package.json`, you define the project's metadata, scripts, and dependencies. The dependencies section lists all the packages your project relies on, along with their version constraints.

- **Editing**: You can manually edit the `package.json` file to add, remove, or update dependencies, scripts, and other project details. You can also manage it using the `npm init` command or by running `npm install <package-name> --save` to add new dependencies.

- **Version Constraints**: The `package.json` specifies the range of acceptable versions for each dependency, usually using semantic versioning (semver). This allows you to define which versions of a package are compatible with your project.

- **Sharing Configuration**: The `package.json` file can be shared with other developers working on the project, and it should be committed to your version control system (e.g., Git).

- **Update Frequency**: Developers typically modify `package.json` more frequently, especially when they add or update dependencies, scripts, or project details.

#### `package-lock.json`

- **Purpose**: The `package-lock.json` file is designed to lock down the exact versions of dependencies, ensuring that your project uses the same versions across different installations.

- **Contents**: `package-lock.json` records the specific versions of every package and its sub-dependencies that were installed in your project. It also stores the dependency tree with resolved versions.

- **Generation**: `package-lock.json` is automatically generated by npm whenever you run `npm install`. It's not intended for manual editing and should be left as is.

- **Security**: It helps enhance the security and reliability of your project by preventing unintended changes to your project's dependencies. This prevents the so-called "dependency hell" problem where different installations might use different package versions.

- **Consistency**: When other developers or build servers run `npm install`, `package-lock.json` ensures that they get the exact same versions of dependencies as you have in your project.

- **Use Cases**: `package-lock.json` is most useful for collaborative projects where consistency and reproducibility are crucial. It's also important for automated deployments and Continuous Integration/Continuous Deployment (CI/CD) pipelines.

In summary, `package.json` defines your project's metadata, scripts, and dependencies with version constraints. It's the primary file that developers work with and share. On the other hand, `package-lock.json` ensures that your project's dependencies remain consistent and reproducible across different environments, enhancing security and reliability. While both files are essential, they serve different purposes and should be used together for managing Node.js projects effectively.

### Creating File Structure

Now that we've created our Node projects utilizing NPM lets create the remaining files to start building our project.

```bash
todo-list/
├── node_modules
├── index.js
├── package-lock.json
├── package.json
└── tasks.json
```

Finally lets add a command to our `package.json > scripts` named `start` that will compile `index.js`through node.

```json
"scripts": {
    "start": "node index.js",
  },
```

Now we can successfully run both our test suite and our project through npm script commands.

## Conclusion

In this lesson, we've explored the fundamental concepts of Node.js and NPM, crucial tools for managing dependencies in Node.js projects. We've learned how to initialize a Node.js project with `npm init` and the significance of the `package.json` file in tracking dependencies and project configuration. We've introduced `package-lock.json` to ensure dependency consistency and discussed the project directory structure, including creating custom script commands in `package.json` for running Node.js applications. This knowledge equips junior developers with the essential skills to efficiently create JavaScript-based server-side applications and manage dependencies, laying a strong foundation for Node.js development.
