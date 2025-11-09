// data.js — Linux Mastery Dataset (v2)
// Note: Global constant DATA used by script.js
// Enhanced version with examples + detailed descriptions for beginners

const DATA = {
  "name": "Linux Mastery",
  "type": "root",
  "short": "300+ Linux Commands with Hinglish + Real Terminal Examples",
  "children": [
    {
      "name": "Navigation",
      "type": "category",
      "short": "Directories aur files me move karne ke basic commands",
      "children": [
        {
          "name": "cd",
          "type": "command",
          "short": "Directory change karta hai — pwd se current location dekho",
          "usage": "cd /home/user — home directory mein jao\ncd .. — ek level upar jao",
          "example": "$ pwd\n/home/wojak\n$ cd Documents\n$ pwd\n/home/wojak/Documents",
          "desc": "‘cd’ ka use current working directory change karne ke liye hota hai. Agar aapko parent folder me jaane ka hai to ‘cd ..’ use karo."
        },
        {
          "name": "pwd",
          "type": "command",
          "short": "Present working directory dikhata hai",
          "usage": "pwd — current path print karta hai",
          "example": "$ pwd\n/home/wojak/Projects/Linux",
          "desc": "‘pwd’ batata hai ki aap terminal me abhi kis directory me ho. Navigation verify karne me madad karta hai."
        },
        {
          "name": "ls",
          "type": "command",
          "short": "Directory contents list karta hai — files aur folders dekhne ke liye",
          "usage": "ls -lah — detailed list with hidden files\nls -R — recursive listing",
          "example": "$ ls -lah\n-rw-r--r-- 1 user user 1.2K Nov 9 file.txt\n drwxr-xr-x 2 user user 4.0K Nov 9 Documents",
          "desc": "‘ls’ se directory ke andar ke files aur folders dikhte hain. Beginners ke liye sabse useful command hai structure samajhne ke liye."
        },
        {
          "name": "tree",
          "type": "command",
          "short": "Directory structure tree format me dikhata hai",
          "usage": "tree — current dir ka tree\ntree -L 2 — 2 levels tak ka tree",
          "example": "$ tree\n.\n├── Documents\n│   └── notes.txt\n└── Pictures\n    └── image.jpg",
          "desc": "‘tree’ visually file/folder structure dikhata hai — especially jab aapko directory hierarchy samajhni ho."
        },
        {
          "name": "cd -",
          "type": "command",
          "short": "Pichli directory me wapas jaata hai",
          "usage": "cd - — last directory me wapas",
          "example": "$ cd /etc\n$ pwd\n/etc\n$ cd -\n/home/wojak/Documents",
          "desc": "‘cd -’ se aap just pehle wali directory me jump kar sakte ho — bahut handy hota hai jab directories frequent change ho rahe ho."
        }
      ]
    },

    {
      "name": "File Operations",
      "type": "category",
      "short": "Files create, copy, move, rename aur delete karne ke commands",
      "children": [
        {
          "name": "touch",
          "type": "command",
          "short": "Empty file create karta hai ya timestamp update karta hai",
          "usage": "touch newfile.txt — nai file banao",
          "example": "$ touch notes.txt\n$ ls\nnotes.txt",
          "desc": "‘touch’ se ek empty file ban jaati hai. Agar file already exist karti hai, to uska modified time update ho jata hai."
        },
        {
          "name": "mkdir",
          "type": "command",
          "short": "Nayi directory banata hai",
          "usage": "mkdir mydir — nai directory\nmkdir -p path/to/dir — parent dirs bhi banao",
          "example": "$ mkdir Projects\n$ ls\nProjects",
          "desc": "‘mkdir’ ka use folder create karne ke liye hota hai. ‘-p’ option se nested directories bhi ek saath ban jaati hain."
        },
        {
          "name": "cp",
          "type": "command",
          "short": "File ya folder copy karta hai",
          "usage": "cp file.txt /target/path/\ncp -R folder1 folder2 — folder copy recursively",
          "example": "$ cp file1.txt backup/file1.txt\n$ cp -R Projects Projects_backup",
          "desc": "‘cp’ se aap file/folder ka duplicate bana sakte ho. Agar folder ho, to ‘-R’ flag lagana zaroori hai."
        },
        {
          "name": "mv",
          "type": "command",
          "short": "File ya directory move ya rename karta hai",
          "usage": "mv oldname.txt newname.txt\nmv file.txt /target/path/",
          "example": "$ mv report_old.txt report_new.txt\n$ mv document.txt ~/Documents/",
          "desc": "‘mv’ se ek file ya folder ko ek jagah se doosri jagah shift karte hain ya rename karte hain — cut-paste ka terminal version."
        },
        {
          "name": "rm",
          "type": "command",
          "short": "Files aur directories delete karta hai — careful!",
          "usage": "rm file.txt — file delete\nrm -rf dir/ — directory forcefully delete",
          "example": "$ rm oldfile.txt\n$ rm -rf tempdir/",
          "desc": "‘rm’ se files delete hoti hain. ‘-rf’ bahut powerful hai — directory aur uske contents sab delete ho jaate hain bina confirmation — beginners dhyan dein."
        },
        {
          "name": "rmdir",
          "type": "command",
          "short": "Empty directory delete karta hai",
          "usage": "rmdir mydir — tabhi jab directory khali ho",
          "example": "$ rmdir emptyFolder\n$ ls\n(no emptyFolder)",
          "desc": "‘rmdir’ se sirf khali directories delete hoti hain. Agar folder me files hain, to ‘rm -r’ ya ‘rm -rf’ use karna padega."
        },
        {
          "name": "ln",
          "type": "command",
          "short": "Link (hard ya symbolic) banata hai file/folder ka",
          "usage": "ln file linkname — hard link\nln -s target linkname — symbolic link",
          "example": "$ ln -s /usr/local/bin/myapp ~/bin/myapp\n$ ls -l ~/bin\nmyapp -> /usr/local/bin/myapp",
          "desc": "‘ln’ se aap links bana sakte ho — symbolic links ka use hota hai shortcuts ki tarah, hard links thodi advanced hote hain."
        }
      ]
    },

    {
      "name": "Viewing & Editing Files",
      "type": "category",
      "short": "File contents dekhna, edit karna aur search/filter karna",
      "children": [
        {
          "name": "cat",
          "type": "command",
          "short": "File contents terminal me display karta hai",
          "usage": "cat file.txt — file show karo\ncat file1 file2 — multiple files",
          "example": "$ cat notes.txt\nHere are my notes …",
          "desc": "‘cat’ se poori file ek baar me print hoti hai. Agar file bahut badi ho to scroll mushkil hoti hai — simpler use ke liye ‘less’ ya ‘more’ consider karo."
        },
        {
          "name": "less",
          "type": "command",
          "short": "Paged view deta hai file ka — scrollable",
          "usage": "less bigfile.txt — scroll karo\nless +G file.txt — end pe jao",
          "example": "$ less /var/log/syslog\n(use j/k to navigate, q to quit)",
          "desc": "‘less’ se large files easily read ki ja sakti hain — scroll up/down, search bhi hota hai. Beginners ke liye bohot aasan tool hai."
        },
        {
          "name": "head",
          "type": "command",
          "short": "File ke beginning ka part dikhata hai",
          "usage": "head file.txt — first 10 lines by default\nhead -n 20 file.txt — first 20 lines",
          "example": "$ head -n 5 notes.txt\nLine1\nLine2\nLine3\nLine4\nLine5",
          "desc": "‘head’ se file ke start me kya hai wo jaldi dekh sakte ho. Useful when file bahut bada ho."
        },
        {
          "name": "tail",
          "type": "command",
          "short": "File ke end ka part dikhata hai",
          "usage": "tail file.txt — last 10 lines\ntail -f logfile — live update view",
          "example": "$ tail -f /var/log/syslog\n…(new entries appear live)…",
          "desc": "‘tail’ se file ka bottom dekh sakte ho. ‘-f’ flag se live updates milte hain — useful for logs monitoring."
        },
        {
          "name": "grep",
          "type": "command",
          "short": "Text search karta hai output ya file me string basis pe",
          "usage": "grep 'pattern' file.txt\ncommand | grep 'pattern'",
          "example": "$ grep 'error' /var/log/syslog\nDec 9 … error: failed to connect",
          "desc": "‘grep’ bohot powerful command hai text search ke liye — output filter karne me ya logs me pattern dhundhne me beginners ko bohot help karega. :contentReference[oaicite:0]{index=0}"
        },
        {
          "name": "wc",
          "type": "command",
          "short": "Word, line, character count karta hai file me",
          "usage": "wc file.txt — total lines words characters\nwc -l file.txt — lines only",
          "example": "$ echo \"Hello world\" > file.txt\n$ wc file.txt\n1 2 12 file.txt",
          "desc": "‘wc’ se pata chalta hai file me kitne words/lines/characters hain — simple tool but beginners ko concept of pipeline samajhne me bhi help karta hai."
        }
      ]
    },

    {
      "name": "Permissions & Ownership",
      "type": "category",
      "short": "File aur folder rights manage karne ke commands",
      "children": [
        {
          "name": "chmod",
          "type": "command",
          "short": "File permissions change karta hai",
          "usage": "chmod 755 script.sh — rwxr-xr-x\nchmod +x file — executable banao",
          "example": "$ ls -l script.sh\n-rw-r--r-- 1 wojak wojak 200 Nov 9 script.sh\n$ chmod +x script.sh\n$ ls -l script.sh\n-rwxr-xr-x 1 wojak wojak 200 Nov 9 script.sh",
          "desc": "‘chmod’ command file ke permissions badalti hai. Example: 755 matlab owner ko sab rights, baaki ko read/execute. Beginners ko permission basics samajhne me yeh helpful hai."
        },
        {
          "name": "chown",
          "type": "command",
          "short": "File/folder ka owner ya group badalta hai",
          "usage": "chown user:group file.txt\nchown -R user:group folder/",
          "example": "$ sudo chown wojak:wojak myfile.txt\n$ ls -l myfile.txt\nwojak wojak myfile.txt",
          "desc": "‘chown’ se aap file/folder ka ownership change kar sakte ho — system administration me common hai. Beginners keyword: sudo ka use samajhna zaroori hai."
        },
        {
          "name": "umask",
          "type": "command",
          "short": "Default permission mask set karta hai new files/folders ke liye",
          "usage": "umask — current mask dikhata hai\numask 022 — new files 755 permissions ke saath create honge",
          "example": "$ umask\n0022\n$ touch newfile.txt\n$ ls -l newfile.txt\n-rw-r--r-- 1 wojak wojak 0 Nov 9 newfile.txt",
          "desc": "‘umask’ system me define karta hai ki new files/folders create hone par default permissions kya hongi. Beginners kabhi kabhi ignore karte hain, lekin samajhna accha hai."
        }
      ]
    },

    {
      "name": "Process & System Monitoring",
      "type": "category",
      "short": "Running processes, memory, CPU status check karna",
      "children": [
        {
          "name": "ps",
          "type": "command",
          "short": "Current running processes list karta hai",
          "usage": "ps aux — sab processes detailed\nps -ef — similar format",
          "example": "$ ps aux | head -n 5\nUSER   PID …\nwojak 2357 …  bash\nroot 1 0.0 … /sbin/init",
          "desc": "‘ps’ se pata chalta hai system me kaun-ka process chal raha hai. Beginners me process list samajhne ke liye helpful."
        },
        {
          "name": "top",
          "type": "command",
          "short": "Real-time process aur resource usage dikhata hai",
          "usage": "top — live CPU/memory usage\ntop -u user — filter by user",
          "example": "$ top\n(press q to exit)",
          "desc": "‘top’ ek interactive view deta hai system resources ka — RAM, CPU, processes. Beginners ko performance monitor karne ke liye bohot useful."
        },
        {
          "name": "htop",
          "type": "command",
          "short": "Enhanced version of top (agar installed ho)",
          "usage": "htop — coloured interactive UI",
          "example": "$ htop\n",
          "desc": "‘htop’ thoda visual version hai ‘top’ ka — agar aapka distro me hai to use karke dekhna chahiye. Beginners ko process tree dekhna accha lagega."
        },
        {
          "name": "kill",
          "type": "command",
          "short": "Running process terminate karta hai",
          "usage": "kill PID — simple\nkill -9 PID — force kill",
          "example": "$ ps aux | grep myscript.sh\nwojak 2435 0.0 … myscript.sh\n$ kill 2435",
          "desc": "‘kill’ se aap ek process band kar sakte ho. Agar process hang ho gayi ho to ‘-9’ use karta hai — beginners ko pehle gentle kill (without -9) try karna chahiye."
        },
        {
          "name": "free",
          "type": "command",
          "short": "System memory usage dikhata hai",
          "usage": "free -h — human-readable format",
          "example": "$ free -h\n              total        used        free      shared  buff/cache   available\nMem:           15Gi        2.3Gi        9.8Gi        0.2Gi        3.0Gi       12Gi",
          "desc": "‘free’ se pata chalta hai RAM ka kitna use ho raha hai aur kitna free hai. Beginners ke liye system health check karna asaan hota hai."
        }
      ]
    },

    {
      "name": "Networking",
      "type": "category",
      "short": "Network setup aur troubleshooting commands",
      "children": [
        {
          "name": "ping",
          "type": "command",
          "short": "Network connectivity test karta hai",
          "usage": "ping google.com — reachability test",
          "example": "$ ping -c 3 google.com\nPING google.com (142.250.185.46): 56 data bytes\n64 bytes from ...\n--- google.com ping statistics ---",
          "desc": "‘ping’ se check hota hai ki koi website/server reachable hai ya nahi. Internet connection test karne ke liye basic tool. :contentReference[oaicite:1]{index=1}"
        },
        {
          "name": "curl",
          "type": "command",
          "short": "URL se data transfer karta hai — HTTP requests ke liye",
          "usage": "curl https://example.com — page fetch karo",
          "example": "$ curl https://api.github.com\n{\n  \"current_user_url\": \"https://api.github.com/user\"\n}",
          "desc": "‘curl’ ka use API requests ya files download karne me hota hai. Web developers ke liye must-know command."
        },
        {
          "name": "wget",
          "type": "command",
          "short": "Internet se file download karta hai",
          "usage": "wget https://example.com/file.zip",
          "example": "$ wget https://example.com/sample.zip\n--2025-11-09 12:34:56--  https://example.com/sample.zip\n … saved ‘sample.zip’",
          "desc": "‘wget’ se aap CLI se file download kar sakte ho — beginners ke liye handy tool hai remote files laane ke liye. :contentReference[oaicite:2]{index=2}"
        },
        {
          "name": "ssh",
          "type": "command",
          "short": "Remote machine me secure shell access karta hai",
          "usage": "ssh user@host\nssh -p 2222 user@host — custom port",
          "example": "$ ssh wojak@192.168.1.10\nWelcome to Ubuntu 22.04 LTS",
          "desc": "‘ssh’ se aap remote server ya computer se securely connect ho sakte ho. Beginners ko host, user aur network basics samajhna important hai."
        },
        {
          "name": "ifconfig",
          "type": "command",
          "short": "Network interfaces aur IP address show karta hai",
          "usage": "ifconfig — old way\nip addr show — modern",
          "example": "$ ifconfig\neth0: flags=… inet 192.168.1.10  netmask 255.255.255.0 …",
          "desc": "‘ifconfig’ network configuration dekhne ka classic command hai; modern distributions 'ip' command prefer karte hain."
        }
      ]
    },

    {
      "name": "Archiving & Compression",
      "type": "category",
      "short": "Files/folders compress aur extract karne ke commands",
      "children": [
        {
          "name": "tar",
          "type": "command",
          "short": "Archive banata hai ya extract karta hai (.tar, .tar.gz etc)",
          "usage": "tar -czf archive.tar.gz folder/\ntar -xzf archive.tar.gz",
          "example": "$ tar -czf project.tar.gz Projects/\n$ tar -xzf project.tar.gz",
          "desc": "‘tar’ se aap multiple files/folders ko ek archive me pack kar sakte hain. Extract karna bhi simple hai. Beginners ko backup/transfer ke liye useful."
        },
        {
          "name": "zip",
          "type": "command",
          "short": "File/folder zip format me compress karta hai",
          "usage": "zip -r archive.zip folder/\nunzip archive.zip",
          "example": "$ zip -r myproject.zip Projects/\n$ unzip myproject.zip",
          "desc": "‘zip’ aur ‘unzip’ commands se compressed format me files use ki ja sakti hain — Windows users ke liye familiar hogi."
        },
        {
          "name": "gzip",
          "type": "command",
          "short": "Single file compress karta hai .gz format me",
          "usage": "gzip file.txt\ngunzip file.txt.gz",
          "example": "$ gzip largefile.log\n$ ls\nlargefile.log.gz",
          "desc": "‘gzip’ simple single file compression tool hai. Agar aap large log files compress karna chahte ho to useful hai."
        }
      ]
    },

    {
      "name": "Package Management",
      "type": "category",
      "short": "Software install/uninstall aur update commands (distribution specific)",
      "children": [
        {
          "name": "apt",
          "type": "command",
          "short": "Debian/Ubuntu based systems me package install/update karne ke liye",
          "usage": "sudo apt update\nsudo apt install package-name\nsudo apt upgrade",
          "example": "$ sudo apt update\n$ sudo apt install htop\nReading package lists… Done",
          "desc": "‘apt’ Ubuntu/Debian me software management ka main tool hai. Beginners ke liye sudo ka role aur package concept samajhna zaruri hai."
        },
        {
          "name": "yum",
          "type": "command",
          "short": "RedHat/CentOS based systems me software management ke liye",
          "usage": "sudo yum install package-name\nsudo yum update",
          "example": "$ sudo yum install vim\n… Installing …",
          "desc": "‘yum’ older RedHat based systems me popular hai. Beginners ko distro differences thodi baar samajhni padti hai."
        },
        {
          "name": "dnf",
          "type": "command",
          "short": "Newer Fedora/RedHat systems me package management ke liye",
          "usage": "sudo dnf install package-name\nsudo dnf upgrade",
          "example": "$ sudo dnf install nano\n… Done",
          "desc": "‘dnf’ RedHat derived distros ka modern tool hai. Beginners ko distribution knowledge thodi helpful hogi."
        }
      ]
    },

    {
      "name": "System Info & Utilities",
      "type": "category",
      "short": "System aur OS ki information check karne ke commands",
      "children": [
        {
          "name": "uname",
          "type": "command",
          "short": "System information print karta hai",
          "usage": "uname -a — sabhi info",
          "example": "$ uname -a\nLinux wojak 5.15.0-86-generic #96-Ubuntu SMP x86_64 GNU/Linux",
          "desc": "‘uname’ se system ka kernel version, OS name aur architecture milta hai. Beginners ko apne system ka overview milta hai."
        },
        {
          "name": "uptime",
          "type": "command",
          "short": "System kitne time se running hai dikhata hai",
          "usage": "uptime — uptime aur load average",
          "example": "$ uptime\n15:30:25 up 2 days,  5:40,  2 users,  load average: 0.25, 0.20, 0.18",
          "desc": "‘uptime’ system ka on-time aur average load show karta hai. System health monitor karne ke liye beginners use kar sakte hain."
        },
        {
          "name": "df",
          "type": "command",
          "short": "Disk file system ke usage dikhata hai",
          "usage": "df -h — human-readable format",
          "example": "$ df -h\nFilesystem      Size  Used Avail Use% Mounted on\n/dev/sda1       50G   12G   35G  26% /",
          "desc": "‘df’ se pata chalta hai aapke drives me kitna space use ho raha hai aur kitna free hai. Beginners ko storage planning me helpful hai. :contentReference[oaicite:3]{index=3}"
        },
        {
          "name": "du",
          "type": "command",
          "short": "Files/folders ka size dikhata hai",
          "usage": "du -sh foldername — summary human-readable",
          "example": "$ du -sh Projects/\n1.2G   Projects/",
          "desc": "‘du’ se pata chalta hai ek folder ya file kitna space leta hai. Backup ya clean-up tasks me beginners ke liye important hai."
        }
      ]
    },

    {
      "name": "Search & Find",
      "type": "category",
      "short": "Files ya content search karne ke commands",
      "children": [
        {
          "name": "find",
          "type": "command",
          "short": "File system me search karta hai criteria ke basis pe",
          "usage": "find . -name '*.log'\nfind /home -type f -mtime -7",
          "example": "$ find /var/log -name '*.log'\n/var/log/syslog.log\n/var/log/auth.log",
          "desc": "‘find’ bohot powerful hai files locate karne ke liye — beginners ko option flags (-name, -type, -mtime) samajhna useful hai. :contentReference[oaicite:4]{index=4}"
        },
        {
          "name": "whereis",
          "type": "command",
          "short": "Command ka binary, source, manual location dikhata hai",
          "usage": "whereis ls\nwhereis python",
          "example": "$ whereis ls\nls: /bin/ls /usr/share/man/man1/ls.1.gz",
          "desc": "‘whereis’ se pata chalta hai ki koi command system me kahaan install hai aur manual kaha hai — beginners ko environment understanding ke liye helpful."
        },
        {
          "name": "which",
          "type": "command",
          "short": "Command ka full path dikhata hai jo execute hoga",
          "usage": "which python\nwhich ls",
          "example": "$ which python\n/usr/bin/python",
          "desc": "‘which’ se pata chalta hai kaunsa binary run hoga jab aap command type karte ho — PATH aur environment concept me beginners ke liye insightful."
        }
      ]
    },

    {
      "name": "Shell & Scripting Basics",
      "type": "category",
      "short": "Shell features aur scripting ke basics commands",
      "children": [
        {
          "name": "echo",
          "type": "command",
          "short": "Simple text ya variable print karta hai",
          "usage": "echo \"Hello World\"\necho $USER",
          "example": "$ echo \"Hello W̶o̶j̶a̶k̶\"\nHello Wojak\n$ echo $USER\nwojak",
          "desc": "‘echo’ se terminal me text ya variables print kar sakte ho — scripting ke foundation me bahut important hai."
        },
        {
          "name": "alias",
          "type": "command",
          "short": "Shortcut command define karta hai",
          "usage": "alias ll=\"ls -lah\"\nalias gs=\"git status\"",
          "example": "$ alias ll=\"ls -lah\"\n$ ll\n(total …)",
          "desc": "‘alias’ se frequent commands ko shortcut me convert kar sakte ho — beginners productivity badha sakte hain. :contentReference[oaicite:5]{index=5}"
        },
        {
          "name": "export",
          "type": "command",
          "short": "Environment variable set karta hai",
          "usage": "export PATH=$PATH:/new/path\nexport VARIABLE=value",
          "example": "$ export MYVAR=\"Hello\"\n$ echo $MYVAR\nHello",
          "desc": "‘export’ se shell ke environment variables set karte hain — scripting me aur subshells me important hai."
        },
        {
          "name": "chmod +x",
          "type": "command",
          "short": "File ko executable banaata hai (scripting context)",
          "usage": "chmod +x script.sh\n./script.sh",
          "example": "$ chmod +x install.sh\n$ ./install.sh",
          "desc": "Ye ‘chmod +x’ ek specific use-case hai scripting ka — beginners jab script write ya run karte hain to ye step zaroori hota hai."
        }
      ]
    },

    {
      "name": "Advanced Utilities",
      "type": "category",
      "short": "Thodi advanced level ke commands jo beginners ko next level par le jate hain",
      "children": [
        {
          "name": "awk",
          "type": "command",
          "short": "Text processing aur data extraction tool",
          "usage": "awk '{print $1}' file.txt\nps aux | awk '{print $2,$11}'",
          "example": "$ awk '{print $1}' users.txt\nwojak\nadmin\nuser2",
          "desc": "‘awk’ powerful hai text data processing ke liye — beginners ke liye thoda steep learning curve hai, lekin samajhne ke baad bahut kaam aata hai."
        },
        {
          "name": "sed",
          "type": "command",
          "short": "Stream edit aur substitution ke liye tool",
          "usage": "sed 's/old/new/g' file.txt\ncat file | sed -n '1,5p'",
          "example": "$ sed 's/hello/hi/g' greetings.txt\n$ cat greetings.txt\nhi world",
          "desc": "‘sed’ text streams me in-place substitution aur editing karta hai — scripting aur automation me beginners ka next step ho sakta hai."
        },
        {
          "name": "xargs",
          "type": "command",
          "short": "Commands ko arguments me convert karta hai pipeline se",
          "usage": "find . -type f | xargs grep 'pattern'\ncat list.txt | xargs rm",
          "example": "$ find . -type f -name '*.log' | xargs rm\n$ cat files.txt | xargs -I {} mv {} archive/",
          "desc": "‘xargs’ se pipeline ka power badhta hai — beginners ko pipelines aur shell logic samajhne me helpful."
        },
        {
          "name": "dd",
          "type": "command",
          "short": "Low-level copy/convert tool — disk images, bootable USB banane ke liye",
          "usage": "dd if=/dev/sdb of=backup.img bs=4M\ndd if=usb.img of=/dev/sdb bs=4M",
          "example": "$ sudo dd if=/dev/sdb of=~/usb_backup.img bs=4M\n$ sudo dd if=ubuntu.iso of=/dev/sdb bs=4M",
          "desc": "‘dd’ bahut powerful command hai — disk-images banane ya clone karne ke liye. Beginners must be careful — wrong device specify karenge to data loss ho sakta hai."
        }
      ]
    },

    {
      "name": "Version Control & Development",
      "type": "category",
      "short": "Development environment me commonly used commands",
      "children": [
        {
          "name": "git",
          "type": "command",
          "short": "Version control tool — source code manage karne ke liye",
          "usage": "git clone url\ngit status\ngit commit -m \"message\"",
          "example": "$ git clone https://github.com/wojak/project.git\n$ git status\nOn branch main",
          "desc": "‘git’ programming aur projects ke liye essential tool hai. Beginners programming world me step up ke liye ye command samajhna accha hai."
        },
        {
          "name": "make",
          "type": "command",
          "short": "Build automation tool — especially C/C++ projects ke liye",
          "usage": "make\nmake clean\nmake install",
          "example": "$ cd myproject\n$ make\nCompiling …\n$ sudo make install",
          "desc": "‘make’ se aap code compile aur install process automate kar sakte ho. Beginners jo development me interest rakhte hain, unke liye helpful hai."
        }
      ]
    }

    // ... (aur categories aur commands add karo 10X scale ke liye)
  ]
};
