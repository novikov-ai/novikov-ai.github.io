---
title: What to Do When the Direct Path Doesn’t Work  
slug: what-to-do-when-the-direct-path-doesnt-work                 
date: 2024-09-10T16:31:03+03:00
draft: false                                  
params:
  author: Alexander Novikov                  
  ShowCodeCopyButtons: true
  ShowPostNavLinks: true                
weight: 10                                   
---

Yesterday, I was installing an extension for VS Code, which is maintained by colleagues for internal development convenience.

It was a simple plugin that colorizes brief files (a corporate standard for describing contracts similar to protobuf; you can read more about it [here](https://habr.com/ru/companies/avito/articles/527400/)), but it presented me with a challenge.

In large companies, it's customary to write documentation. Having documentation is good, but it's even more important for it to be kept up to date; otherwise, no one will use it.

The plugin came with a straightforward instruction:

1. Download the `vsix` file:
~~~
wget http://<extension-directory>.vsix
~~~

1. Add it to VS Code: Extensions -> ... -> Install from VSIX -> <extension-directory>.vsix

2. Or via the terminal:
~~~
code --install-extension <extension-directory>.vsix
~~~

Imagine my disappointment when I stumbled at the very first step. The file didn't exist at the specified path.

My first instinct was to write in the Platform chat to check if the plugin was even "alive." But as I was typing, I hesitated. I checked the commit history and noticed there were relatively recent commits, leading me to conclude that the development wasn't abandoned.

Next, I reasoned that if I had a repository that was actively being contributed to but didn't have the actual vsix file (even though it was my first encounter with such files), then what was stopping me from assembling the source code into that file?

Pleased with this simple thought, I shifted my focus from the problem of "missing file" to the task of "how to assemble the file." A moment later, I read that there’s a tool called [vsce](https://github.com/microsoft/vscode-vsce) - VS Code Extension Manager, which I could use to create the necessary vsix. So, I installed it:

~~~
npm install -g vsce
~~~

Next, I navigated to the directory containing the source code for the extension (where my plugin resides) and packaged it into the required vsix:

~~~
vsce package
~~~

Now I needed to install the extension in the IDE. I used the following command:

~~~
code --install-extension <extension-directory>.vsix
~~~

And while using `vsce` was straightforward, the next command, `code --install-extension`, posed a challenge for me as a relatively new VS Code user because it wasn't executing directly in the console. However, after a couple of minutes figuring out that it was a [CLI](https://code.visualstudio.com/docs/editor/command-line) command, I managed to install it.

In about 5-10 minutes, I was able to: understand the problem, learn how to build vsix files with the `vsce` extension manager, install them via CLI, and as a bonus, while everything was installing, I read up on the [GNU Wget project](https://www.gnu.org/software/wget/) (a little teaser: Wget2 is on the way).

Perhaps it’s tasks like these that I enjoy about development - they force you to analyze the problem at hand and seek alternative solutions rather than going straight at it.

I recommend that when a straightforward approach fails, take a moment to pause, jot down your question, and find an alternative solution by digging a bit deeper. This not only expands your expertise but also hones your systematic problem-solving skills.

*Read the original post and join the discussion on Telegram: [@time2code](https://t.me/time2code/299)*