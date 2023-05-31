# Intro to Git

## Topics Covered / Goals

- Learn how to use git as a cli tool for version control
- Learn how to use git with Github

## Lesson

### `git`

`git` is a just another shell command but an important one as it's the de-facto 'version control system' for code. In other words, it's the means by which you can save a file, including it's history, so if you need to 'rewind' to an earlier point, you can. It is ultimately a very complex tool as it is essentially solving the problem of managing/merging/splitting multiple timelines, but it's also a necessary tool to know at a basic level, so that is what we will be covering today.

> First, an important note: **Git is not Github**! *Git* is the original invention, and it is designed to manage versioning for a local filesystem and by default it all lives on your own computer. *Github* is a modern product/company (now owned by Microsoft) that aims to be the de-facto place to *back up* your local git repo on the internet, and offers lots of related tools for working with on a distributed team.

### Creating a git repo

Any folder can be made into a git repo, so to begin, let's make a new empty folder somewhere on our filesystem. Assuming you are in the home directory (`~`) execute the commands:

```sh
mkdir my-first-repo
cd my-first-repo
```

Ok, we created a file and entered it, what now? Well, let's see what's in there. Because it's a new, empty folder, it should be empty, right?!

```sh
ls -a
```

If you type `ls -a` (list, including hidden) you might see some hidden 'folders' called `.` and `..`. You can ignore these, as they just represent the current directory and the parent (for when you type `cd .` or `cd ..`). But we want to make this a git repo, so let's do that before anything else.

#### `git init`

```sh
git init
```

`git init` will make the current folder a git repo. What does this mean? Well, depending on your terminal and shell, you may already see some visual display implying the terminal understands this is folder is a git repo. But how does it know? Type `ls -a` again. You should see a folder called `.git`. You don't need to go in there and root around (in general you shouldn't) but this is what git itself uses to manage the folder as a git repo.

`git status`

Before doing anything else, type `git status`. This will tell you the 'status' of the repo, as git sees it. Because we haven't done anything yet you should see something like:

```bash
On branch main

No commits yet

nothing to commit (create/copy files and use "git add" to track)
```

It's important when starting out to continually type `git status` as reading it's output will teach you what git is actually doing. The status tells us:

- the current 'status' of the repo
- the branch you are on (more on this later)
- what files git knows about and whether they are:
  - 'untracked' (a new file git doesn't know what to do with yet)
  - tracked, but not staged for commit (a file it knows about that was recently changed)
  - staged for commit (marked as ready to be 'committed' in the next commit)

What is this 'commit' business? A 'commit' essentially means a unit of changes that git is aware of. But before we can do this, we need to add some files.

#### `git add`

We want to add files to our repo, so first let's create some files!

You can do anything here, but what I did was:

```sh
code example.txt example.py example.js
```

and then filled in the contensts of each file with something basic. So:

`example.txt`: `hello world`
`example.py`: `print('hello')`
`example.js`: `console.log('hello')`

This is just to have some content for git to keep track of. If you saved these files you should not be able to type `ls` and see them within your folder.

Now type `git status` again. You should see something like:

```bash
...

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	example.js
	example.py
	example.txt

...
```

These files exist, but git doesn't know what to think of them. Let's change this with `git add`.

We could add one file at a time with `git add example.txt`, `git add example.py` etc, but this is often more specific then you need. To add all untracked files to git, type `git add .` i.e. 'git add everything in the current folder'. Now type `git status` again. You may notice some visual changes, like red lines becoming green, and an output like:

```bash
...

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   example.js
	new file:   example.py
	new file:   example.txt

...
```

Ok, git knows about our changed, they are 'ready to commit', so let's move on to the next step - committing!

#### `git commit`

A 'commit' represents a unit of work in git. Once some files are 'staged' (added) for commit, we can then commit them. Try typing `git commit` now. If you did the setup in installfest correctly, it should open VSCode with some pre-populated commit message, telling you to add a comment. This is one approach, but it is often overkill. If you close this file without adding any comment, the commit will be aborted.

The easier/more common way then is to write something like so:

```sh
git commit -m 'my first commit'
```

This will create a new commit with the provided comment directly in the cli. Some message is required so this is the simplest way.

Now type `git status` once again. It should show something like:

```bash
On branch main
nothing to commit, working tree clean
```

So what happened to the work we just committed? To see this type `git log`. This will output your 'commit history'. Mine looks like:

```bash
commit 1dcf85ba9c295be3938152711715cfb72925d76b (HEAD -> main)
Author: Benjamin Cohen <benjamin@codeplatoon.org>
Date:   Mon May 22 11:42:33 2023 -0600

    my first commit
```

This is an example of a 'commit'. That long alphanumeric code next to 'commit' is the commit's 'hash' - ie it's unique ID for referencing it in the future.

Before we can show the next concept (`git checkout`), let's add one more commit so we have something to 'rewind' to. I changed the contents of a single file (`example.py`), staged it for commit (`git add .`) and then committed it (`git commit -m 'changed example.py`).

Now when I type `git log` again mine looks like:

```bash
commit 03de341e283937972d485d7ebe7ae2227756f1dc (HEAD -> main)
Author: Benjamin Cohen <benjamin@codeplatoon.org>
Date:   Mon May 22 11:47:31 2023 -0600

    changed example.py

commit 1dcf85ba9c295be3938152711715cfb72925d76b
Author: Benjamin Cohen <benjamin@codeplatoon.org>
Date:   Mon May 22 11:42:33 2023 -0600

    my first commit
```

Great, we have 2 commits in our history! You might also note the word `HEAD` next to the most recent commit. `HEAD` is git-speak for the current 'version' the repo is representing, which by default will be the most recent commit.

So let's say I wanted to 'rewind' to the previous commit? I would do this with `git checkout`.

#### `git checkout`

`git checkout` let's me 'check out' a previous commit, using it's hash. Type `git log` an get the previous commit's hash. Mine looks like:

```bash
commit 1dcf85ba9c295be3938152711715cfb72925d76b
Author: Benjamin Cohen <benjamin@codeplatoon.org>
Date:   Mon May 22 11:42:33 2023 -0600

    my first commit
```

so the hash is `1dcf85ba9c295be3938152711715cfb72925d76b`

Now type `git checkout <your_hash>`

If you do this you will now be in 'detached HEAD mode' and so looking at previous commits. If you were to open the file you changed, you would see it has it's old contents.

We aren't going to dwell on this concept for too long because we ultimately won't use it much, Github will very soon be our chosen tool for looking at the history of our repo. But first, let's get back to our original status.

```bash
git checkout main
```

This will checkout our main branch (the default branch and only one we have, more on branches later). and put us back in our original position.

The next step is to back up our local git repo somewhere remote - Github!

### Github

In a browser, go to github.com, sign in, and click the '+' button near your profile picture and select 'New repository'. You should see a page like below:

![create new github](./page-resources/create-new-repo.png)

Give the repo a name and leave all the defaults as they are, and then hit 'Create repository'. You should now see a page like:

![new repo clean](./page-resources/my-first-repo-clean.png)

This gives us some steps for hooking up this remote repo to our local git repo, which we will now walk through. The only thing to note is the url, which we want to copy for later. Mine is `https://github.com/AloofBuddha/my-first-git-repo.git`.

#### `git remote`

Back on the cli, we want to type:

```bash
git remote add origin <github-repo-url>
```

Which for me is then:

```bash
git remote add origin https://github.com/AloofBuddha/my-first-git-repo.git
```

This adds the github url as our 'remote' backup for the local copy. We named this backup location 'origin', as that is the standard.

If you now type `git remote -v` you should see that this url is recognized for the sake of pushing (pushing code from local to remote) and fetching (fetching code from remote to local).

Now that we have made the connection, let's backup our local work.

#### `git push`

First, type `git push` in the cli. This won't work yet, but will give you a helpful message. The first time you push a local repo to a remote repo, it wants you to be more specific. The instructions I got tell me to instead type:

```bash
git push --set-upstream origin main
```

What this means is we are going to push our current branch (`main`) to the remote repo named `origin` and we are using the flag `--set-upstream` to link them, so in the future `git push` will suffice. The output of that command for me looks like:

```bash
Enumerating objects: 8, done.
Counting objects: 100% (8/8), done.
Delta compression using up to 8 threads
Compressing objects: 100% (4/4), done.
Writing objects: 100% (8/8), 634 bytes | 634.00 KiB/s, done.
Total 8 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/AloofBuddha/my-first-git-repo.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
```

This tells us we pushed some code from `main` to `origin/main` and set up that connection. Now go back to the github page from before and refresh. You should now see the files like below:

![new repo pushed](./page-resources/my-first-repo-pushed.png)

Great! This is almost everything you need to know at this point! If you press the 'commits' link in the previous image you will be able to explore the history of your repo.

What we have done so far will suffice for working on your own, but there are a few more topics that become more significant when collaborating with others.

#### `git branch`

`git` has a concept called 'branching' that allows us to work on multiple versions of a project simultaneously. We already have a single branch, the default branch, called 'main'. Type `git branch` and you will see all of your currently existing branches, of which there should be only one, `main`.

Now, if we want to make a new branch, type `git checkout -b <name-of-new branch>`. This will create, then immediately checkout the new branch. I wrote:

```bash
git checkout -b dev
```

> I  chose the name `dev` as this is a common pattern - `main` can represent the stable copy of something while `dev` is a place to do new work from that may or may not prove fruitful.

I am now on a new branch called `dev` and can confirm this with `git status`. Nothing has changed yet, as initially a branch will fully copy whatever branch it was branched off from (we were on `main`, so that's what the initial contents of `dev` now are).

Now let's make a change and commit it:

```bash
<Changed contents of example.js>
git add .
git commit -m 'changed example.js'
```

Now let's share this change with the remote repo with `git push`.

If you do this, you will see a message like before - git needs to know the connection initially, so we need a more involved command like:

```bash
 git push --set-upstream origin dev
```

Now that we type this command, our local dev branch will be linked to a Github branch called dev. Go back to Github's site to see this:

![dev branch](./page-resources/dev-branch.png)

You may notice the prompt to do a 'pull request' up top. A 'pull request' is a way of 'merging' two branches so the merged into branch represents the combined work of both. Imagine we did a lot of work on `dev` and were ready to have this work added to the stable branch, `main` - this is how we would do that. Let's click this and go through the steps to merge. As we are the only user of this repo this will be simple, but in the real world you will often be collaborating with others, and there could be merge conflicts to fix (ie the two branches overlap in areas that need manual attention to combine correctly) and there are usually permissions so not just anyone can merge to `main` without some kind of code review first. Now that this is done though, `main` now represents the combined changes of `main` and `dev`.

However this change is only represented on Github, on our remote. How do we sync our local with our remote? `git pull`!

#### `git pull`

Go back to the cli and first make sure you are on the `main` branch (`git checkout main`). Now type `git pull`. This will 'pull' changes from the remote into local, so they stay in sync.

### Conclusion

This concludes our intro git lecture, but as you probably suspect there is a lot that has not been covered. For better or worse git is a very complex tool and we have only scratched the surface. The essential point is that you already have what you need to backup your own work when working alone. Those essential commands are:

- `git clone <repo-url>` - We didn't cover this one explicitly but its how you create a local repo from an existing Github repo

- `git init` - make a new local repo

- `git status` - get feedback on the current state of your repo

- `git add .` - add files to git for staging

- `git commit -m '<message>'` - commit staged files as a discrete unit of 'work' that git tracks

- `git remote add origin <github-url>` - set up your local git repo to refer to a remote (Github) repo

- `git push -u origin main` - initial setup for pushing your main branch to an equivalent branch on your Github repo (origin)

- `git push` - continually push changes once the initial setup has been done

All other concepts, like branching and pull requests, and merging, really only come into play once collaborating with others, so we cover this more thoroughly in later lectures.

### Advice

Some good general git advice:

1. Be careful when using a visual git tool, as it is running commands behind the scenes, many of which you may not understand. To be safe, don't use a visual git tool until you feel pretty confortable with git.

2. **Never** use a git command you copied off the internet and don't fully understand. You will only run into even greater complications. If you encounter a new git command on stack overflow do your due dilligence and read about it first, and ideally seek a TAs help before proceeding.

3. Run `git status` between every other command you run. It will tell you what the state of the system is and is the main way you get familiar with the concepts git uses.

## Assignments

- [Git Practice](https://classroom.google.com/c/NjEyMzM5MTczMDQ4?cjc=vunqfsg)
- [Learn Git Branching](http://learngitbranching.js.org/)
