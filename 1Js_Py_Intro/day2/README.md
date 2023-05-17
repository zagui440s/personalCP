# Intro to Git

## NEED TO FINISH

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

## Assignments
- [Git Practice](https://github.com/Code-Platoon-Curriculum/git-practice)