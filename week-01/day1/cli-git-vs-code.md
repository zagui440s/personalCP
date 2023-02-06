# Installfest

## Topics Covered / Goals

- Get your local machine set up to start the course
- Operating Sytem / UNIX ideas
- Be able to navigate your computer using the command line
- Create and manage git repositories using the command line

## Lesson

### Computer Setup (Mac, Linux, & Windows)

Before we get started, just know that this will be chaos. Your goal is to get a working environment. Please follow along closely!

- [Slack](https://slack.com/downloads) - for all communication purposes
- [Zoom](https://zoom.us/support/download)
- Sign up for [Operation Code](https://operationcode.org/join)

#### Mac Setup

- [Complete Installfest (MacOS)](../../page-resources/installfest_mac.md)

#### Ubuntu Linux Setup

- [Complete Installfest (Ubuntu Linux)](../../page-resources/installfest_ubuntu.md)

#### Windows Setup

- [Complete Installfest (Windows)](../../page-resources/installfest_windows.md)

### Intro to UNIX

#### What is UNIX?

Whether you are on an actual Linux system, MacOS or Windows with WSL, we are going to refer to all of these environments as 'UNIX', or just 'the command line'. So what is UNIX? Without getting deep into the details: **UNIX is an operating system architecture and set of tools that allows a user to interact with that operating system through a command line interface**. It is the lingua-franca of operating systems, i.e. it is the language you can expect (almost) any operating system to speak and allows you to interact with it in a predictable way.

#### The Details

In reality, UNIX started as a specific OS invented at Bell Labs in the 1960s, by some of the same people who invented the C language. It was very popular, but also open-source, so different operating systems copied the concept but there was poor compatibility between different implementations (a common theme in the history of software development). Complicating things further, software used to be deeply coupled with hardware and made to fit an individual product, so even within a given company there wasn't a single OS that unified the experience across devices.

That changed in the 80s with the invention of the personal computer and Apple and Microsoft becoming it's most significant major players. MacOS based it's OS architecture on UNIX, whereas Microsoft went it's own way entirely with Windows and MSDOS. Then in the 90s Linux was invented as an open source OS and defined the core 'kernel' that all other Linux distributions (or 'flavors') are based on. Linux is odd in that sense in that it is open-source, so there isn't one Linux, there's just a few popular 'flavors' but a million others that are jsut as 'legitimate', just not widely used. That means that in the modern age we have:

**Linux** - most closely based on UNIX, but may differ slightly based on the 'flavor' you go with (Ubuntu and Debian are the major players).

**MacOS** - very UNIX-_like_, but will differ in small ways. Really just a specific flavor of Linux but one that Apple uniquely controls and is closed-source as a result. Also Apple has a habit of making breaking updates whenever they please.

**Windows** - Windows is built on a fundamentally different architecture, and you will see this if you try to put UNIX commands into Command Prompt or Windows PowerShell - most will simply not be recognized (even basic ones like `ls`!) However this was such a pain point for developers on Windows that they eventually relented, and the modern solution is WSL - Windows Subsystem for Linux. Essentially, if you are on Windows, the suggestion is to use WSL, which means you have an entire Linux system (defaulting to the flavor Ubuntu) within your Windows system, and, with rare exceptions, it will work just like the flavor of Linux that your WSL environment uses.

The major take home is: no matter the OS we can all be on _basically_ the same environment, **_but_** there will always be small differences that will make the bahevior of Windows/MacOS/Linux different, and even one version of MacOS (for example) will differ ever so slightly from another, and this is what makes environment setup so dofficult, we simply can't anticipate every issue that you will encounter given all the permutations of that determine what makes your environment unique.

#### Architecture

On a basic level, a computer can only run a single program at a time, so an OS is _the_ program your physical hardware is running, and by it's design it is an interface between the hardware and the user, allowing other programs to be run _on top_ of this main program. Think of the OS like a _scheduler_ - it's there to coordinate the sharing of hardware resources between multiple users and programs without requiring each one of those users/programs to know the intimate details of the hardware.

UNIX (or any OS) can therefore be thought of in terms of the following set of layers:

![Unix architecture](./../../page-resources/shell-diagram.jpeg)

These are the essential components of your OS and the concentric circles represent what is built 'on top' of what. From the inside out, the 4 components are:

1. The **Hardware** - the literal hardware of your computer. It could be made by any manufacturer but to interact with it requires ...

2. The **Kernel** - So named because it is the essential layer that allows an OS to command your hardware to do things. You will generally never touch the kernel, despite it being necessary for the OS to function. Think of it like the engine of a car - it's how the entire thing works but the domain of an expert, while you the general user will usually only interact with ...

3. The **Shell**. So named because it wraps the kernel. This is how you interact with the underlying hardware at a level of abstraction that is 'safe' for the average user. The shell is a command-line (i.e. text based) interface and set of basic commands and programs that will allow you to do common tasks a computer user cares to accomplish. This is the layer we will focus on most of this lecture. But finally of course there is the last layer of ...

4. **Applications**. No OS would be complete without the ability to run arbitrary applications. The command 'python' is itself an application, one that can read and execute text documents that follow the Python programming syntax. An application is any program that isn't essential to the OS and therefore isn't built directly into the shell, but a modern shell generally provides an interface for downloading and running such applications.

#### Files and Folders

There are only two types of 'things' as far as a UNIX environment is concerned: files and folders.

- A `file` _is_ a _thing_. Depending on what kind of _thing_ it is it can be read from or written to or executed.
- A `folder` (also called a 'directory') can _contain_ 0 or more _things_, i.e. other files or folders.

As it turns out, these are the only two concepts you need to have a fully functional OS.

### UNIX Commands

Many of the commands have difficult to remember acronyms. It's a product of history. At an earlier point in history computers had extremely limited memory and saving even a few characters was worth it. Also, you will be typing these commands _a lot_, so conciseness is appreciated over time, though as a beginner it can be daunting to remember what all these short commands each do.

#### Folder Navigation (Essential)

In order to use the shell at all we need to know how to navigate it. Some essential navigation commands include:

- `pwd`

  - 'print working directory'. This will print (to the console) the full path (more on this later) of where you currently are. Most shells will include this info as part of a standard interface, but it isn't guaranteed, so it's useful to know about it as a standalone command.

- `ls`

  - 'list'. This lists everything in the current directory.

- `ls -a`

  - Same as `ls` but prints 'hidden' files too. By default any file with a '.' in front of it will be hidden by `ls`.
  - `-a` is our first example of a `flag`, i.e. a modifier to a command that changes its behavior. Flags generally start with a `-` and you can include more than one after a single `-`, so `ls -l -a` is equivalent to `ls -la`.
  - Try `ls -la`! This will print all files in the directory, including hidden ones, plus a bunch of extra info you won't understand yet.

- `cd <directory_name>`

  - 'change directory'. Like it sounds it changes directory, i.e. moves the user to a new folder. This command needs an _argument_ however! An argument is anything that comes after the command that doesn't start with a `-`. Unlike a flag, it doesn't modify the command, but rather is an _input_ to the command. Such as:
  - `cd /`. Move to `/`, the root of the entire file system.
  - `cd ~`. Move to `~`, the 'home' folder of the current user.
  - `cd ..`. Move one directory up in the hierarchy.
  - `cd .`. This won't do anything (seemingly), because `.` is shorthand for 'the current directory', which is not useful in the case of `cd` but it is useful in general to have a shorthand way of representing the current directory.

> Absolute vs relative filepaths: When speaking of paths, we often speak of the absolute (or full) path to a file, and relative paths. An absolute path starts with a `/`, it is 'relative' to the root fo the entire filesystem, which is the same for all users of that system, so we call that 'absolute'. A relative path is one that starts with `~` or `.` or `..`. If a path starts with `~` it just means 'relative to the current user's home directory', which will be different for every user. If it starts with a `.` it means 'relative to the current directory', and if it starts with `..` that means 'relative to the current directory's parent'. In truth there is only the absolute path as far as the file system is concerned, but `~` and `.` and `..` act similarly to variables in a programming language - they hold a value that can change depending on the context they are evaluated within, but the result is always a full path.

#### File Management (Essential)

- `mkdir <directory_name>`

  - Creates a new directory. By default this will be a child of the current directory. Needs an argument with the new directory's name. This new directory will be empty.
  - Ex: `mkdir my-new-folder`

- `touch <filename>`

  - Creaters a new file. By default this will be a child of the current directory. Needs an argument with the new file's name. This new file will be empty.
  - Ex: `touch my-new-file.txt`

> File extensions are meaningless! `.txt` is only a shorthand that allows an OS to guess what program might be appropriate to open a file with. File extensions don't truly mean anything at the shell level thought, so `my-new-file` and `my-new-file.xyz` are both valid file names, and will open/run correctly assuming you use the correct program to open/run them.

- `cp <source> <destination>`

  - Copies a _file_ from one directory to another.
  - Ex: `cp ./my-file.txt ../somewhere-else`
  - Note: you cannot copy a _folder_ (with things in it) by default, so you will want to use the `-r` flag. `-r` stands for recursively, so it will copy the folder, plus anything inside, to the new directory.
  - Ex: `cp -r ./my-folder ../somewhere-else`

- `mv <current_name> <new_name>`

  - 'moves' one file/folder to another, but this term is confusing, it really means 'rename'.
  - Ex: `mv file1.txt wacky-file-name.xyz`

- `rm <filename>`

  - 'Remove' a file.
  - `rm fil1.txt` will remove `file1.txt` (assuming it exists).
  - `rm -r my-folder` will remove a folder with stuff in it (recursively).
  - `rm -rf my-folder` will remove a folder with something in it 'forcefully' i.e. without asking 'are you sure?' first.

> DO NOT TYPE THIS IN! `rm -rf /`. This will remove all files/folders, recursively and forcefully, starting at the root. In other words it will destroy your entire filesystem, no questions asked! This is included to demonstrate the power of these small commands, and the power you have as a user (and why such an idea as 'permissions' matters).

#### Miscellaneous (Essential)

- `sudo <command_name>`

  - 'super user do'. We will get into this in more depth in the lecture on permissions, but it's good to know about even early on. Some commands won't work if you don't have the right permissions, and `sudo` is a command that let's you temporarily elevate your permissions status to run such a command. Be careful anytime you need to use `sudo`, it's a sign you are likely doing something powerful and irreversable.

- `clear`

  - Clear the screen of content. `cmd+k` is a keyboard shortcut that does the same on most systems.

#### File Navigation (Nice to Know)

You will use these less commonly as on a modern system you will have access to better ways to view and edit files (like VSCode)

- `head <filename>`

  - Display the first few lines of a file.

- `tail <filename>`

  - Display the last few lines of a file.

- `less <filename>`

  - Lets you see the contents of a file and navigate it like so:
  - `<spacebar>` moves down a page
  - `b` moves up a page
  - `q` quits

- `vi`/`vim`

  - A text editor you will generally get by default. It's very powerful but awkward to use as a beginner. The basics for if you ever have to use it are:
  - press `i`. Enters 'insert' (write) mode
  - type some text content.
  - press `<esc>` to re-enter 'normal' mode
  - type `wq <filename>` to 'write, quit' and save the file with the filename provided
  - or type `q!` to quit without saving
  - Like I said, extremely awkward. Some love it but I avoid it like the plague.

  > The difference between `vi` and `vim` is just that `vi` was xcreated first and is less feature-rich, but `vim` is the standard built-in UNIX text editor at this point.

#### Interrupts (Nice to Know)

This section is small but worth mentioning. An 'interrupt' is a way of communicating with the operating system to override it's current task (literally, to interrupt the running process).

- `<control-C>`

  - What do you do if you run a command and it's taking forever to finish? `<control-C>` sends an 'interrupt' signal to the shell telling it to quit the currently running operation.

- `<control-D>`
  - Similar to the above but more powerful. This sends an 'interrupt' signal to the OS to quit the currently running shell. Sometimes you will be running a shell within a shell and `<control-C>` won't be enough to cancel the current operation. This is a powerful (but dangerous) escape hatch. A general rule of thumb is: if the shell is 'stuck' in a frozen state and `<control-C>` isn't helping, try a `<control-D>`.

#### Others Worth Mentioning (Non-essential)

- `echo <string_to_echo>`

  - Will literally 'echo' whatever you write to it to the terminal output. This seems useless but you will see the utlity in a moment.

- `sort <filename>`

  - Sort lines of a given file by alphabetical order.

- `find <string_to_match>`

  - Will search a directory recursively for a matching file/folder name, and if found print the found file/folder (and it's contents if it is a folder).

- `grep <string_to_match>`

  - Like `find` but will search the contents of files as well. This becomes very powerful when combined with regular expressions, but that is an advanced topic we won't get into for the moment.

- `man <command_name>`

  - Everything you have seen up until now are essential navigation commands, but there are many more. `man` means 'manual' and is a quick way to see what an unknown command does. That said, at this point in history the internet is usually a better resource (specifically [ExplainShell](https://explainshell.com/)).

#### Operators (Non-essential)

- `*` aka wilcards

  - Often you will want to say 'match anything' and the wildcard symbol is how you do that.
  - Ex: I want to copy all files from one folder to another, so I type `cp my-folder/* ../temp`
  - Ex: Wildcards can be combined with regular characters, which is often useful for matching just files with a given extension, like: `cp my-folder/*.md ../temp`

- `>` and `>>`

  - `>` and `>>` are 'input redirection' operators.
  - These aren't exactly 'commands' but 'operators', and they are what make `echo` useful.
  - Ex: `echo "hello world" > hello.txt` will overwrite (or create) `hello.txt` with the echoed input
  - Ex: `echo "goodbye moon" >> hello.txt` will concatenate `hello.txt` with the echoed input

- `|`

  - 'pipe', another operator, 'pipes' output into another command.
  - Ex: `less hello.txt | sort` is equivalent to `sort hello.txt`

- `&`

  - runs one command, does not wait for it to finish, then begins running the next command
  - Ex: `touch file1.txt & touch file2.txt`
  - Kind of dangerous unless you know the two commands can be run simultaneously with no guarantee as to who is done first

- `&&`
- runs one command, waits for it to finish, then begins running the next command
- Ex: `touch file1.txt & code file1.txt`
- Not dangerous, just a way of chaining commands together in one line

### Git

Git is another shell command that may or may not be built-in to a system, but it's the de-facto 'version control system', in other words, it's the means by which you can save a file with it's history intact, so if you need to 'rewind' to an earlier point, you can. It ends up being a very complex tool (it is essentially solving the problem of managing/merging/splitting multiple timelines, which is fundamentally complex) but it's a necessary tool to know at a basic level and you will notice how it follows many of the same patterns as standard UNIX commands.

Also note: **Git is not Github**! Git is the earlier invention, and is open-source, it is designed to manage versioning for a local filesystem, with the possibility of backing it up externally, but by default it all lives on your one computer. Github is a modern product/company (now owned by Microsoft) that aims to be the de-facto place to back up your local filesystem externally, and offers lots of related tools to the concern of version control.

- `git init`

  - Create a new git repo (essential a hidden `.git` folder tracking all of the versioning details)

- `git status`

  - the current 'status' of your repo
  - files are either:
    - 'untracked' (a new file git doesn't know what to do with yet)
    - tracked but not staged for commit (a file it knows about that was recently changed)
    - staged for commit (marked as ready to be 'committed' in the next commit)

- `git add .`

  - Stage a file (usually `.`, or everything) for commit

- `git commit -m 'i did work'`

  - Creates a new commits, ie saves all the files and marks it as a unqiue 'version'
  - -m adds a (required) message inline, otherwise you'll find yourself in vim

- `git log`

  - Shows the version history
  - Github is usually going to provide a nicer visualization of this

- `git remote add origin https://github.com/username/reponame`

  - Set up a remote (external) location to push your commits

- `git push origin main`

  - 'push' the current state of the branch 'main' to the remote location named 'origin'
  - Once setup the first time `git push` will suffice

- `git pull origin main`

  - 'pull' the current state of the remote location origin at the branch 'main' to the matching local branch 'main'
  - Once setup the first time `git pull` will suffice

- `git clone https://github.com/username/reponame`
  - Create a new git repo locally and populate it with the state of the remote location in the url

Unfortunately git is a far too complex tool to teach at this stage, and yet necessary to get started. Struggling with git is normal and most people (myself included) end up learning it the hard way when something goes very wrong.

Some good git advice:

1. Be careful when using a visual git tool, as it is running commands behind the scenes, many of which you may not understand.
2. **Never** use a git command you copied off the internet and don't fully understand. You will only run into even greater complications.
3. Run `git status` between every other command you run. It will tell you what the state of the system is and the main way you get familiar with the concepts git uses.

## Resources

- When in doubt what a shell command does, [ExplainShell](https://explainshell.com/) can be a very useful tool.

## Assignments

- [99 Bottles](https://github.com/tangoplatoon/algo-99-bottles) in JS
- [Deaf Grandma](https://github.com/tangoplatoon/algo-deaf-grandma) in JS

- [Terminal Commands In Depth](https://github.com/tangoplatoon/misc-command-line) ...nothing to submit here but necessary reading
- [Incoming Student Survey](https://docs.google.com/forms/d/e/1FAIpQLSePRzeiSCe1hqzud7btr--Xxm791zqCe_RqA_9mGxEIUN_IwQ/viewform)
