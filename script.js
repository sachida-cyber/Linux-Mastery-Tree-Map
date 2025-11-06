// ===== EMBEDDED DATA: 200+ Linux Commands with Hinglish Descriptions =====
const DATA = {
  name: "Linux Mastery",
  type: "root",
  short: "Complete Linux command reference",
  install: "-",
  usage: "-",
  children: [
    {
      name: "Navigation",
      type: "category",
      short: "Directory aur file system mein navigate karne ke commands",
      install: "-",
      usage: "-",
      children: [
        { name: "cd", type: "command", short: "Directory change karta hai — pwd se current location dekho", install: "-", usage: "cd /home/user — home directory mein jao\ncd .. — ek level upar jao" },
        { name: "pwd", type: "command", short: "Present working directory dikhata hai — aap kahan ho terminal mein", install: "-", usage: "pwd — current path print karta hai" },
        { name: "ls", type: "command", short: "Directory contents list karta hai — files aur folders dekhne ke liye", install: "-", usage: "ls -lah — detailed list with hidden files\nls -R — recursive listing" },
        { name: "tree", type: "command", short: "Directory structure tree format mein dikhata hai", install: "sudo apt install tree", usage: "tree — current dir ka tree\ntree -L 2 — 2 levels tak ka tree" },
        { name: "find", type: "command", short: "Files aur directories search karta hai recursively", install: "-", usage: "find /home -name '*.txt' — txt files search karo\nfind . -type f -size +10M — 10MB se badi files" },
        { name: "locate", type: "command", short: "Files ko naam se quickly search karta hai using database", install: "sudo apt install mlocate", usage: "locate myfile.txt — file ko locate karo\nupdatedb — database update karo" },
        { name: "which", type: "command", short: "Command ka full path dikhata hai", install: "-", usage: "which python — python command ka path" },
        { name: "whereis", type: "command", short: "Binary, source aur man pages locate karta hai", install: "-", usage: "whereis ls — ls command ki locations" }
      ]
    },
    {
      name: "File Viewing",
      type: "category",
      short: "Files ko read aur display karne ke commands",
      install: "-",
      usage: "-",
      children: [
        { name: "cat", type: "command", short: "File content ko screen par print karta hai completely", install: "-", usage: "cat file.txt — file dikha do\ncat file1 file2 > merged — files merge karo" },
        { name: "less", type: "command", short: "File ko page by page read karta hai — badi files ke liye best", install: "-", usage: "less largefile.log — navigate with arrows\n/search — search text" },
        { name: "more", type: "command", short: "File ko page by page dikhata hai — simple pager", install: "-", usage: "more file.txt — spacebar se next page" },
        { name: "head", type: "command", short: "File ki starting lines dikhata hai — default 10 lines", install: "-", usage: "head file.txt — first 10 lines\nhead -n 20 file.txt — first 20 lines" },
        { name: "tail", type: "command", short: "File ki last lines dikhata hai — logs ke liye useful", install: "-", usage: "tail -f /var/log/syslog — live log monitoring\ntail -n 50 file.txt — last 50 lines" },
        { name: "grep", type: "command", short: "Text pattern search karta hai files mein — regex support", install: "-", usage: "grep 'error' logfile — error word search karo\ngrep -r 'pattern' /dir — recursive search" },
        { name: "egrep", type: "command", short: "Extended grep — multiple patterns search kar sakta hai", install: "-", usage: "egrep 'error|warning' log.txt — OR search" },
        { name: "zgrep", type: "command", short: "Compressed files mein grep karta hai", install: "-", usage: "zgrep 'pattern' file.gz — gzip file mein search" },
        { name: "vim", type: "command", short: "Powerful text editor — modal editing ke saath", install: "sudo apt install vim", usage: "vim file.txt — file edit karo\n:wq — save and quit" },
        { name: "nano", type: "command", short: "Simple easy text editor — beginners ke liye best", install: "-", usage: "nano file.txt — file edit karo\nCtrl+X — exit" }
      ]
    },
    {
      name: "File Operations",
      type: "category",
      short: "Files aur directories create, copy, move karne ke commands",
      install: "-",
      usage: "-",
      children: [
        { name: "touch", type: "command", short: "Empty file create karta hai ya timestamp update karta hai", install: "-", usage: "touch newfile.txt — nai file banao\ntouch -t 202301011200 file — specific time set karo" },
        { name: "mkdir", type: "command", short: "New directory create karta hai", install: "-", usage: "mkdir mydir — nai directory\nmkdir -p path/to/dir — parent dirs bhi banao" },
        { name: "cp", type: "command", short: "Files aur directories copy karta hai", install: "-", usage: "cp source.txt dest.txt — file copy\ncp -r dir1 dir2 — directory copy with contents" },
        { name: "mv", type: "command", short: "Files ko move ya rename karta hai", install: "-", usage: "mv old.txt new.txt — rename\nmv file.txt /path/ — move to directory" },
        { name: "rm", type: "command", short: "Files aur directories delete karta hai — careful!", install: "-", usage: "rm file.txt — file delete\nrm -rf dir/ — directory forcefully delete" },
        { name: "rmdir", type: "command", short: "Empty directories delete karta hai", install: "-", usage: "rmdir emptydir — khali directory delete" },
        { name: "ln", type: "command", short: "Hard aur symbolic links create karta hai", install: "-", usage: "ln -s target linkname — symbolic link\nln file hardlink — hard link" },
        { name: "rename", type: "command", short: "Multiple files rename karta hai using regex", install: "sudo apt install rename", usage: "rename 's/.txt/.bak/' *.txt — txt ko bak mein rename" },
        { name: "dd", type: "command", short: "Low level data copy — disk imaging ke liye use hota hai", install: "-", usage: "dd if=/dev/sda of=backup.img — disk image banao\ndd if=/dev/zero of=file bs=1M count=100 — 100MB file create" }
      ]
    },
    {
      name: "Permissions",
      type: "category",
      short: "File permissions aur ownership manage karne ke commands",
      install: "-",
      usage: "-",
      children: [
        { name: "chmod", type: "command", short: "File permissions change karta hai — read, write, execute", install: "-", usage: "chmod 755 script.sh — rwxr-xr-x\nchmod +x file — executable banao" },
        { name: "chown", type: "command", short: "File owner aur group change karta hai", install: "-", usage: "sudo chown user:group file — ownership change\nsudo chown -R user dir/ — recursive ownership" },
        { name: "chgrp", type: "command", short: "File group ownership change karta hai", install: "-", usage: "chgrp groupname file — group change" },
        { name: "umask", type: "command", short: "Default file creation permissions set karta hai", install: "-", usage: "umask 022 — default permissions set karo\numask — current umask dekho" },
        { name: "getfacl", type: "command", short: "File ACL (Access Control List) dikhata hai", install: "-", usage: "getfacl file.txt — ACL dekho" },
        { name: "setfacl", type: "command", short: "File ACL set karta hai — advanced permissions", install: "-", usage: "setfacl -m u:user:rwx file — user ko rwx access do" }
      ]
    },
    {
      name: "Compression",
      type: "category",
      short: "Files compress aur extract karne ke commands",
      install: "-",
      usage: "-",
      children: [
        { name: "tar", type: "command", short: "Files archive karta hai — compress kar sakta hai with gzip/bzip2", install: "-", usage: "tar -czf archive.tar.gz dir/ — compress with gzip\ntar -xzf archive.tar.gz — extract" },
        { name: "gzip", type: "command", short: "Files ko gzip format mein compress karta hai", install: "-", usage: "gzip file.txt — file.txt.gz banata hai\ngzip -d file.gz — decompress" },
        { name: "gunzip", type: "command", short: "Gzip files decompress karta hai", install: "-", usage: "gunzip file.gz — original file restore" },
        { name: "bzip2", type: "command", short: "Better compression than gzip — slower hai", install: "-", usage: "bzip2 file.txt — file.txt.bz2 banata hai\nbzip2 -d file.bz2 — decompress" },
        { name: "zip", type: "command", short: "ZIP archive create karta hai — Windows compatible", install: "sudo apt install zip", usage: "zip archive.zip file1 file2 — zip create\nzip -r archive.zip dir/ — directory zip" },
        { name: "unzip", type: "command", short: "ZIP files extract karta hai", install: "sudo apt install unzip", usage: "unzip archive.zip — extract karo\nunzip -l archive.zip — contents list karo" },
        { name: "7z", type: "command", short: "7-Zip compression — bahut high compression ratio", install: "sudo apt install p7zip-full", usage: "7z a archive.7z dir/ — compress\n7z x archive.7z — extract" },
        { name: "xz", type: "command", short: "XZ format compression — bahut accha compression", install: "-", usage: "xz file.txt — compress\nxz -d file.xz — decompress" }
      ]
    },
    {
      name: "Processes",
      type: "category",
      short: "System processes manage karne ke commands",
      install: "-",
      usage: "-",
      children: [
        { name: "ps", type: "command", short: "Current running processes dikhata hai", install: "-", usage: "ps aux — sabhi processes\nps -ef — full format listing" },
        { name: "top", type: "command", short: "Real-time process monitoring — CPU aur memory usage", install: "-", usage: "top — live view\nPress 'q' to quit" },
        { name: "htop", type: "command", short: "Interactive process viewer — top se better interface", install: "sudo apt install htop", usage: "htop — interactive view\nF9 to kill process" },
        { name: "kill", type: "command", short: "Process ko signal bhejta hai — usually terminate karne ke liye", install: "-", usage: "kill PID — process terminate karo\nkill -9 PID — forcefully kill" },
        { name: "killall", type: "command", short: "Name se processes kill karta hai", install: "-", usage: "killall firefox — sabhi firefox processes kill" },
        { name: "pkill", type: "command", short: "Pattern match karke processes kill karta hai", install: "-", usage: "pkill -f 'python script' — matching processes kill" },
        { name: "pgrep", type: "command", short: "Pattern se process IDs search karta hai", install: "-", usage: "pgrep firefox — firefox ki PIDs" },
        { name: "nice", type: "command", short: "Process ko priority ke saath start karta hai", install: "-", usage: "nice -n 10 command — low priority\nnice -n -5 command — high priority" },
        { name: "renice", type: "command", short: "Running process ki priority change karta hai", install: "-", usage: "renice -n 5 -p PID — priority adjust" },
        { name: "bg", type: "command", short: "Process ko background mein run karta hai", install: "-", usage: "bg %1 — job 1 ko background mein" },
        { name: "fg", type: "command", short: "Background process ko foreground mein lata hai", install: "-", usage: "fg %1 — job 1 ko foreground mein" },
        { name: "jobs", type: "command", short: "Current shell ke background jobs dikhata hai", install: "-", usage: "jobs — sabhi jobs list" },
        { name: "nohup", type: "command", short: "Command ko logout ke baad bhi run karta hai", install: "-", usage: "nohup command & — logout proof execution" }
      ]
    },
    {
      name: "System Info",
      type: "category",
      short: "System information aur status check karne ke commands",
      install: "-",
      usage: "-",
      children: [
        { name: "uname", type: "command", short: "System information print karta hai — kernel version etc", install: "-", usage: "uname -a — sabhi info\nuname -r — kernel version" },
        { name: "hostname", type: "command", short: "System hostname dikhata ya set karta hai", install: "-", usage: "hostname — current hostname\nsudo hostname newhostname — set hostname" },
        { name: "uptime", type: "command", short: "System kitne time se running hai dikhata hai", install: "-", usage: "uptime — uptime aur load average" },
        { name: "date", type: "command", short: "Current date aur time dikhata hai", install: "-", usage: "date — current date/time\ndate '+%Y-%m-%d' — formatted date" },
        { name: "cal", type: "command", short: "Calendar display karta hai", install: "-", usage: "cal — current month\ncal 2024 — year 2024 ka calendar" },
        { name: "whoami", type: "command", short: "Current logged in user ka naam dikhata hai", install: "-", usage: "whoami — your username" },
        { name: "who", type: "command", short: "Sabhi logged in users dikhata hai", install: "-", usage: "who — logged in users list" },
        { name: "w", type: "command", short: "Who ka extended version — kya kar rahe hain users", install: "-", usage: "w — users aur unka activity" },
        { name: "last", type: "command", short: "Last login history dikhata hai", install: "-", usage: "last — recent logins\nlast -10 — last 10 logins" },
        { name: "lastlog", type: "command", short: "Sabhi users ki last login info", install: "-", usage: "lastlog — all users last login" },
        { name: "lsb_release", type: "command", short: "Linux distribution information dikhata hai", install: "-", usage: "lsb_release -a — distribution details" }
      ]
    },
    {
      name: "Disk & Storage",
      type: "category",
      short: "Disk space aur storage manage karne ke commands",
      install: "-",
      usage: "-",
      children: [
        { name: "df", type: "command", short: "Filesystem disk space usage dikhata hai", install: "-", usage: "df -h — human readable format\ndf -i — inode usage" },
        { name: "du", type: "command", short: "Directory/file disk usage dikhata hai", install: "-", usage: "du -sh /path — directory size\ndu -h --max-depth=1 — one level deep" },
        { name: "mount", type: "command", short: "Filesystem mount karta hai", install: "-", usage: "mount — mounted filesystems\nsudo mount /dev/sdb1 /mnt — device mount" },
        { name: "umount", type: "command", short: "Mounted filesystem unmount karta hai", install: "-", usage: "sudo umount /mnt — unmount karo" },
        { name: "fdisk", type: "command", short: "Disk partitions manage karta hai — create/delete/list", install: "-", usage: "sudo fdisk -l — partitions list\nsudo fdisk /dev/sda — partition editor" },
        { name: "parted", type: "command", short: "Advanced partition management tool", install: "sudo apt install parted", usage: "sudo parted /dev/sda print — partitions dekho" },
        { name: "mkfs", type: "command", short: "Filesystem create karta hai partition pe", install: "-", usage: "sudo mkfs.ext4 /dev/sdb1 — ext4 filesystem\nsudo mkfs.xfs /dev/sdb1 — xfs filesystem" },
        { name: "fsck", type: "command", short: "Filesystem check aur repair karta hai", install: "-", usage: "sudo fsck /dev/sdb1 — filesystem check" },
        { name: "lsblk", type: "command", short: "Block devices list karta hai — disks aur partitions", install: "-", usage: "lsblk — tree format\nlsblk -f — filesystem info bhi" },
        { name: "blkid", type: "command", short: "Block device attributes dikhata hai — UUID etc", install: "-", usage: "sudo blkid — sabhi devices ki UUID" }
      ]
    },
    {
      name: "Networking",
      type: "category",
      short: "Network configuration aur troubleshooting ke commands",
      install: "-",
      usage: "-",
      children: [
        { name: "ifconfig", type: "command", short: "Network interfaces configure aur display karta hai", install: "sudo apt install net-tools", usage: "ifconfig — sabhi interfaces\nifconfig eth0 — specific interface" },
        { name: "ip", type: "command", short: "Modern network configuration tool — ifconfig replacement", install: "-", usage: "ip addr show — IP addresses\nip route — routing table" },
        { name: "ping", type: "command", short: "Network connectivity test karta hai — ICMP packets", install: "-", usage: "ping google.com — reachability test\nping -c 4 8.8.8.8 — 4 packets send" },
        { name: "netstat", type: "command", short: "Network connections aur statistics dikhata hai", install: "sudo apt install net-tools", usage: "netstat -tuln — listening ports\nnetstat -an — all connections" },
        { name: "ss", type: "command", short: "Socket statistics — netstat ka modern replacement", install: "-", usage: "ss -tuln — listening sockets\nss -s — summary statistics" },
        { name: "curl", type: "command", short: "URL se data transfer karta hai — HTTP requests ke liye", install: "sudo apt install curl", usage: "curl https://api.example.com — GET request\ncurl -X POST -d 'data' url — POST request" },
        { name: "wget", type: "command", short: "Files download karta hai URLs se", install: "sudo apt install wget", usage: "wget url — file download\nwget -c url — resume download" },
        { name: "dig", type: "command", short: "DNS lookup karta hai — detailed DNS info", install: "sudo apt install dnsutils", usage: "dig google.com — DNS query\ndig @8.8.8.8 example.com — specific DNS server" },
        { name: "nslookup", type: "command", short: "DNS query karta hai — simple DNS lookup", install: "sudo apt install dnsutils", usage: "nslookup google.com — IP address lookup" },
        { name: "host", type: "command", short: "DNS lookup tool — simple output", install: "-", usage: "host google.com — DNS lookup" },
        { name: "traceroute", type: "command", short: "Network path trace karta hai destination tak", install: "sudo apt install traceroute", usage: "traceroute google.com — route dikhao" },
        { name: "nmap", type: "command", short: "Network scanner — ports aur services discover", install: "sudo apt install nmap", usage: "nmap 192.168.1.1 — host scan\nnmap -p 80,443 host — specific ports" },
        { name: "tcpdump", type: "command", short: "Network packet capture aur analysis", install: "sudo apt install tcpdump", usage: "sudo tcpdump -i eth0 — packets capture\nsudo tcpdump port 80 — HTTP traffic" },
        { name: "iptables", type: "command", short: "Firewall rules configure karta hai", install: "-", usage: "sudo iptables -L — rules list\nsudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT — rule add" },
        { name: "ufw", type: "command", short: "Uncomplicated Firewall — easy firewall management", install: "sudo apt install ufw", usage: "sudo ufw enable — firewall on\nsudo ufw allow 22 — SSH allow" }
      ]
    },
    {
      name: "Package Management",
      type: "category",
      short: "Software packages install aur manage karne ke commands",
      install: "-",
      usage: "-",
      children: [
        { name: "apt", type: "command", short: "Debian/Ubuntu package manager — install/update/remove", install: "-", usage: "sudo apt update — package list update\nsudo apt install package — install karo" },
        { name: "apt-get", type: "command", short: "APT ka older version — abhi bhi bahut use hota hai", install: "-", usage: "sudo apt-get update\nsudo apt-get upgrade — system upgrade" },
        { name: "dpkg", type: "command", short: "Debian package manager — low level tool", install: "-", usage: "sudo dpkg -i package.deb — install .deb\ndpkg -l — installed packages list" },
        { name: "yum", type: "command", short: "RedHat/CentOS package manager", install: "-", usage: "sudo yum install package\nsudo yum update — system update" },
        { name: "dnf", type: "command", short: "Modern YUM replacement — Fedora/RHEL 8+", install: "-", usage: "sudo dnf install package\nsudo dnf upgrade — system upgrade" },
        { name: "snap", type: "command", short: "Universal package manager — cross-distro", install: "sudo apt install snapd", usage: "snap install package\nsnap list — installed snaps" },
        { name: "flatpak", type: "command", short: "Universal app distribution — sandboxed apps", install: "sudo apt install flatpak", usage: "flatpak install app\nflatpak run app — app run karo" },
        { name: "pip", type: "command", short: "Python package installer", install: "sudo apt install python3-pip", usage: "pip install package\npip list — installed packages" },
        { name: "npm", type: "command", short: "Node.js package manager", install: "sudo apt install npm", usage: "npm install package\nnpm install -g package — global install" }
      ]
    },
    {
      name: "Services",
      type: "category",
      short: "System services manage karne ke commands",
      install: "-",
      usage: "-",
      children: [
        { name: "systemctl", type: "command", short: "Systemd services manage karta hai — start/stop/status", install: "-", usage: "systemctl status nginx — service status\nsudo systemctl restart service — restart" },
        { name: "service", type: "command", short: "Services control karta hai — older method", install: "-", usage: "sudo service apache2 start\nsudo service nginx status" },
        { name: "journalctl", type: "command", short: "Systemd journal logs dikhata hai", install: "-", usage: "journalctl -u nginx — service logs\njournalctl -f — follow logs" },
        { name: "systemd-analyze", type: "command", short: "Boot time analyze karta hai", install: "-", usage: "systemd-analyze — boot time\nsystemd-analyze blame — slow services" }
      ]
    },
    {
      name: "Users & Groups",
      type: "category",
      short: "User accounts aur groups manage karne ke commands",
      install: "-",
      usage: "-",
      children: [
        { name: "useradd", type: "command", short: "Naya user account create karta hai", install: "-", usage: "sudo useradd username\nsudo useradd -m -s /bin/bash user — with home dir" },
        { name: "usermod", type: "command", short: "Existing user account modify karta hai", install: "-", usage: "sudo usermod -aG sudo username — sudo group mein add" },
        { name: "userdel", type: "command", short: "User account delete karta hai", install: "-", usage: "sudo userdel username\nsudo userdel -r username — with home dir" },
        { name: "passwd", type: "command", short: "User password change karta hai", install: "-", usage: "passwd — apna password change\nsudo passwd username — user ka password" },
        { name: "groupadd", type: "command", short: "Naya group create karta hai", install: "-", usage: "sudo groupadd groupname" },
        { name: "groupdel", type: "command", short: "Group delete karta hai", install: "-", usage: "sudo groupdel groupname" },
        { name: "groups", type: "command", short: "User ke groups dikhata hai", install: "-", usage: "groups — your groups\ngroups username — user's groups" },
        { name: "id", type: "command", short: "User ID aur group IDs dikhata hai", install: "-", usage: "id — your IDs\nid username — user's IDs" },
        { name: "sudo", type: "command", short: "Commands root privileges ke saath execute karta hai", install: "-", usage: "sudo command — as root\nsudo -u user command — as specific user" },
        { name: "su", type: "command", short: "Switch user — doosre user ban jao", install: "-", usage: "su - username — user ban jao\nsu - — root ban jao" }
      ]
    },
    {
      name: "Text Processing",
      type: "category",
      short: "Text manipulation aur processing ke commands",
      install: "-",
      usage: "-",
      children: [
        { name: "sed", type: "command", short: "Stream editor — text find/replace karta hai", install: "-", usage: "sed 's/old/new/g' file — replace karo\nsed -i 's/old/new/g' file — in-place edit" },
        { name: "awk", type: "command", short: "Pattern scanning aur text processing language", install: "-", usage: "awk '{print $1}' file — first column\nawk -F: '{print $1}' /etc/passwd — custom delimiter" },
        { name: "cut", type: "command", short: "Text columns extract karta hai", install: "-", usage: "cut -d':' -f1 /etc/passwd — first field\ncut -c1-10 file — first 10 characters" },
        { name: "sort", type: "command", short: "Lines ko sort karta hai alphabetically ya numerically", install: "-", usage: "sort file.txt — alphabetically\nsort -n file.txt — numerically" },
        { name: "uniq", type: "command", short: "Duplicate lines remove karta hai — sorted input chahiye", install: "-", usage: "sort file | uniq — unique lines\nuniq -c file — count duplicates" },
        { name: "wc", type: "command", short: "Lines, words, characters count karta hai", install: "-", usage: "wc file.txt — lines words chars\nwc -l file.txt — only lines" },
        { name: "tr", type: "command", short: "Characters translate ya delete karta hai", install: "-", usage: "tr 'a-z' 'A-Z' < file — lowercase to uppercase\ntr -d '0-9' < file — digits remove" },
        { name: "diff", type: "command", short: "Files ke beech differences dikhata hai", install: "-", usage: "diff file1 file2 — differences\ndiff -u file1 file2 — unified format" },
        { name: "patch", type: "command", short: "Diff output apply karta hai files pe", install: "-", usage: "patch < patchfile — apply patch" },
        { name: "comm", type: "command", short: "Sorted files compare karta hai line by line", install: "-", usage: "comm file1 file2 — comparison" }
      ]
    },
    {
      name: "Scripting",
      type: "category",
      short: "Shell scripting aur automation ke commands",
      install: "-",
      usage: "-",
      children: [
        { name: "bash", type: "command", short: "Bourne Again Shell — most popular shell", install: "-", usage: "bash script.sh — script run karo\nbash -x script.sh — debug mode" },
        { name: "sh", type: "command", short: "System shell — POSIX compliant", install: "-", usage: "sh script.sh — script execute" },
        { name: "echo", type: "command", short: "Text print karta hai screen pe", install: "-", usage: "echo 'Hello' — text print\necho $PATH — variable print" },
        { name: "printf", type: "command", short: "Formatted text print karta hai", install: "-", usage: "printf '%s\\n' 'text' — formatted output" },
        { name: "read", type: "command", short: "User input read karta hai", install: "-", usage: "read var — input lena\nread -p 'Name: ' name — prompt ke saath" },
        { name: "export", type: "command", short: "Environment variables set karta hai", install: "-", usage: "export VAR=value — variable export\nexport PATH=$PATH:/new/path" },
        { name: "env", type: "command", short: "Environment variables dikhata hai", install: "-", usage: "env — sabhi variables\nenv | grep PATH — specific variable" },
        { name: "set", type: "command", short: "Shell options aur variables set karta hai", install: "-", usage: "set -x — debug on\nset +x — debug off" },
        { name: "source", type: "command", short: "Script ko current shell mein execute karta hai", install: "-", usage: "source script.sh — same shell\n. script.sh — shorthand" },
        { name: "cron", type: "command", short: "Scheduled tasks run karta hai automatically", install: "-", usage: "crontab -e — edit cron jobs\ncrontab -l — list jobs" },
        { name: "at", type: "command", short: "One-time scheduled tasks execute karta hai", install: "sudo apt install at", usage: "at 10:00 PM — schedule task\nat now + 1 hour — 1 hour baad" }
      ]
    },
    {
      name: "Monitoring",
      type: "category",
      short: "System monitoring aur performance tracking ke commands",
      install: "-",
      usage: "-",
      children: [
        { name: "vmstat", type: "command", short: "Virtual memory statistics dikhata hai", install: "-", usage: "vmstat — memory stats\nvmstat 1 — every second" },
        { name: "iostat", type: "command", short: "CPU aur I/O statistics dikhata hai", install: "sudo apt install sysstat", usage: "iostat — stats\niostat -x 1 — extended stats every second" },
        { name: "mpstat", type: "command", short: "Multi-processor statistics dikhata hai", install: "sudo apt install sysstat", usage: "mpstat — CPU stats\nmpstat -P ALL — all CPUs" },
        { name: "sar", type: "command", short: "System activity report — historical data collect", install: "sudo apt install sysstat", usage: "sar — CPU usage\nsar -r — memory usage" },
        { name: "free", type: "command", short: "Memory usage dikhata hai — RAM aur swap", install: "-", usage: "free -h — human readable\nfree -m — in MB" },
        { name: "dstat", type: "command", short: "Versatile resource statistics tool", install: "sudo apt install dstat", usage: "dstat — combined stats\ndstat -cdngy — custom columns" },
        { name: "glances", type: "command", short: "Advanced system monitoring tool — web interface bhi", install: "sudo apt install glances", usage: "glances — interactive view\nglances -w — web server mode" },
        { name: "iotop", type: "command", short: "I/O usage by process dikhata hai", install: "sudo apt install iotop", usage: "sudo iotop — disk I/O monitor" },
        { name: "iftop", type: "command", short: "Network bandwidth monitoring by connection", install: "sudo apt install iftop", usage: "sudo iftop — network monitor" },
        { name: "nethogs", type: "command", short: "Network bandwidth per process dikhata hai", install: "sudo apt install nethogs", usage: "sudo nethogs — bandwidth by process" }
      ]
    },
    {
      name: "Security",
      type: "category",
      short: "System security aur encryption ke commands",
      install: "-",
      usage: "-",
      children: [
        { name: "ssh", type: "command", short: "Secure Shell — remote login karta hai encrypted", install: "-", usage: "ssh user@host — remote login\nssh -i key.pem user@host — with key" },
        { name: "ssh-keygen", type: "command", short: "SSH key pairs generate karta hai", install: "-", usage: "ssh-keygen -t rsa -b 4096 — RSA key\nssh-keygen -t ed25519 — modern key" },
        { name: "scp", type: "command", short: "Secure copy — files copy over SSH", install: "-", usage: "scp file user@host:/path — copy to remote\nscp user@host:/file . — copy from remote" },
        { name: "rsync", type: "command", short: "Efficient file sync — local ya remote", install: "-", usage: "rsync -avz source/ dest/ — sync directories\nrsync -avz -e ssh src/ user@host:dest/" },
        { name: "gpg", type: "command", short: "GNU Privacy Guard — encryption aur signing", install: "-", usage: "gpg -c file — encrypt file\ngpg file.gpg — decrypt" },
        { name: "openssl", type: "command", short: "SSL/TLS toolkit — encryption aur certificates", install: "-", usage: "openssl enc -aes256 -in file -out file.enc — encrypt\nopenssl req -new -x509 -days 365 -out cert.pem — certificate" },
        { name: "fail2ban", type: "command", short: "Intrusion prevention — failed login attempts block", install: "sudo apt install fail2ban", usage: "sudo systemctl status fail2ban — service status" },
        { name: "lynis", type: "command", short: "Security auditing tool — system scan karta hai", install: "sudo apt install lynis", usage: "sudo lynis audit system — security audit" },
        { name: "chkrootkit", type: "command", short: "Rootkit detection tool", install: "sudo apt install chkrootkit", usage: "sudo chkrootkit — scan for rootkits" },
        { name: "rkhunter", type: "command", short: "Rootkit Hunter — malware detection", install: "sudo apt install rkhunter", usage: "sudo rkhunter --check — system check" }
      ]
    },
    {
      name: "Containers",
      type: "category",
      short: "Container management ke commands — Docker etc",
      install: "-",
      usage: "-",
      children: [
        { name: "docker", type: "command", short: "Container platform — apps ko isolate karke run karo", install: "curl -fsSL https://get.docker.com | sh", usage: "docker run image — container start\ndocker ps — running containers" },
        { name: "docker-compose", type: "command", short: "Multi-container applications define aur run", install: "sudo apt install docker-compose", usage: "docker-compose up — services start\ndocker-compose down — stop services" },
        { name: "podman", type: "command", short: "Daemonless container engine — Docker alternative", install: "sudo apt install podman", usage: "podman run image — container run\npodman ps — list containers" },
        { name: "kubectl", type: "command", short: "Kubernetes cluster manage karta hai", install: "curl -LO https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl", usage: "kubectl get pods — pods list\nkubectl apply -f config.yaml — apply config" },
        { name: "lxc", type: "command", short: "Linux Containers — system containers", install: "sudo apt install lxc", usage: "lxc-create -n container -t ubuntu — create\nlxc-start -n container — start" }
      ]
    },
    {
      name: "Development",
      type: "category",
      short: "Software development ke tools aur commands",
      install: "-",
      usage: "-",
      children: [
        { name: "git", type: "command", short: "Version control system — code ka history track karo", install: "sudo apt install git", usage: "git clone url — repo clone\ngit commit -m 'msg' — commit changes" },
        { name: "gcc", type: "command", short: "GNU C Compiler — C/C++ programs compile", install: "sudo apt install gcc", usage: "gcc file.c -o output — compile C\ngcc -Wall -g file.c — with warnings" },
        { name: "make", type: "command", short: "Build automation tool — projects compile karta hai", install: "sudo apt install make", usage: "make — build project\nmake clean — clean build files" },
        { name: "cmake", type: "command", short: "Cross-platform build system generator", install: "sudo apt install cmake", usage: "cmake . — generate Makefile\nmake — build" },
        { name: "python3", type: "command", short: "Python interpreter — scripts run karta hai", install: "-", usage: "python3 script.py — script run\npython3 -m http.server — simple web server" },
        { name: "node", type: "command", short: "Node.js runtime — JavaScript server-side", install: "sudo apt install nodejs", usage: "node script.js — script run\nnode -v — version check" },
        { name: "java", type: "command", short: "Java runtime environment", install: "sudo apt install default-jre", usage: "java -jar app.jar — run jar\njava ClassName — run class" },
        { name: "javac", type: "command", short: "Java compiler", install: "sudo apt install default-jdk", usage: "javac File.java — compile\njavac -d bin src/*.java — to directory" },
        { name: "go", type: "command", short: "Go programming language compiler", install: "sudo apt install golang", usage: "go run main.go — run\ngo build — compile" },
        { name: "rust/cargo", type: "command", short: "Rust package manager aur build tool", install: "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh", usage: "cargo new project — new project\ncargo build — build project" },
        { name: "strace", type: "command", short: "System calls trace karta hai — debugging ke liye", install: "-", usage: "strace command — trace syscalls\nstrace -p PID — attach to process" },
        { name: "ltrace", type: "command", short: "Library calls trace karta hai", install: "sudo apt install ltrace", usage: "ltrace command — trace library calls" },
        { name: "gdb", type: "command", short: "GNU Debugger — programs debug karta hai", install: "sudo apt install gdb", usage: "gdb program — start debugger\ngdb -p PID — attach to process" },
        { name: "valgrind", type: "command", short: "Memory leak detection aur profiling", install: "sudo apt install valgrind", usage: "valgrind ./program — check memory leaks" }
      ]
    },
    {
      name: "Logging",
      type: "category",
      short: "System logs dekhe aur manage karne ke commands",
      install: "-",
      usage: "-",
      children: [
        { name: "dmesg", type: "command", short: "Kernel ring buffer messages dikhata hai — boot logs", install: "-", usage: "dmesg — kernel messages\ndmesg | grep -i error — errors search" },
        { name: "logger", type: "command", short: "System log mein entries add karta hai", install: "-", usage: "logger 'message' — log entry add\nlogger -p user.info 'info message'" },
        { name: "logrotate", type: "command", short: "Log files rotate karta hai — manage space", install: "-", usage: "sudo logrotate /etc/logrotate.conf — rotate logs" },
        { name: "rsyslog", type: "command", short: "System logging daemon — logs collect karta hai", install: "-", usage: "sudo systemctl status rsyslog — service status" }
      ]
    },
    {
      name: "Performance",
      type: "category",
      short: "Performance tuning aur optimization ke commands",
      install: "-",
      usage: "-",
      children: [
        { name: "time", type: "command", short: "Command execution time measure karta hai", install: "-", usage: "time command — execution time\ntime sleep 5 — 5 seconds measure" },
        { name: "perf", type: "command", short: "Performance analysis tool — profiling", install: "sudo apt install linux-tools-common", usage: "perf stat command — performance stats\nperf record command — record profile" },
        { name: "sysctl", type: "command", short: "Kernel parameters modify karta hai runtime mein", install: "-", usage: "sysctl -a — all parameters\nsudo sysctl -w param=value — set parameter" },
        { name: "hdparm", type: "command", short: "Hard disk parameters get/set karta hai", install: "sudo apt install hdparm", usage: "sudo hdparm -I /dev/sda — disk info\nsudo hdparm -tT /dev/sda — speed test" },
        { name: "bonnie++", type: "command", short: "Filesystem aur disk benchmark tool", install: "sudo apt install bonnie++", usage: "bonnie++ — run benchmark" }
      ]
    },
    {
      name: "Backup & Recovery",
      type: "category",
      short: "Data backup aur recovery ke commands",
      install: "-",
      usage: "-",
      children: [
        { name: "rsnapshot", type: "command", short: "Filesystem snapshot utility — incremental backups", install: "sudo apt install rsnapshot", usage: "sudo rsnapshot configtest — test config\nsudo rsnapshot daily — run daily backup" },
        { name: "duplicity", type: "command", short: "Encrypted bandwidth-efficient backup", install: "sudo apt install duplicity", usage: "duplicity /source file:///backup — backup\nduplicity restore file:///backup /dest — restore" },
        { name: "timeshift", type: "command", short: "System restore tool — snapshots create karta hai", install: "sudo apt install timeshift", usage: "sudo timeshift --create — snapshot create\nsudo timeshift --restore — restore snapshot" },
        { name: "testdisk", type: "command", short: "Data recovery tool — deleted files recover", install: "sudo apt install testdisk", usage: "sudo testdisk — start recovery wizard" },
        { name: "photorec", type: "command", short: "Photo recovery — deleted images recover", install: "sudo apt install testdisk", usage: "sudo photorec — start photo recovery" }
      ]
    },
    {
      name: "Miscellaneous",
      type: "category",
      short: "Other useful commands jo categories mein fit nahi hote",
      install: "-",
      usage: "-",
      children: [
        { name: "xargs", type: "command", short: "Command arguments build karta hai input se", install: "-", usage: "find . -name '*.txt' | xargs rm — delete all txt\necho 'file1 file2' | xargs cat" },
        { name: "tee", type: "command", short: "Output ko file aur screen dono pe bhejta hai", install: "-", usage: "command | tee output.txt — save and display\ncommand | tee -a file.txt — append" },
        { name: "yes", type: "command", short: "Continuously 'y' ya custom string print karta hai", install: "-", usage: "yes | command — auto yes\nyes no | head -5 — 5 times 'no'" },
        { name: "watch", type: "command", short: "Command ko repeatedly execute karta hai — real-time updates", install: "-", usage: "watch -n 1 df -h — every second disk usage\nwatch 'command' — default 2 sec" },
        { name: "screen", type: "command", short: "Terminal multiplexer — multiple sessions manage", install: "sudo apt install screen", usage: "screen — new session\nscreen -r — reattach session" },
        { name: "tmux", type: "command", short: "Modern terminal multiplexer — better than screen", install: "sudo apt install tmux", usage: "tmux — new session\ntmux attach — attach session" },
        { name: "alias", type: "command", short: "Command shortcuts create karta hai", install: "-", usage: "alias ll='ls -lah' — create alias\nalias — list aliases" },
        { name: "history", type: "command", short: "Command history dikhata hai", install: "-", usage: "history — all commands\nhistory 20 — last 20 commands" },
        { name: "clear", type: "command", short: "Terminal screen clear karta hai", install: "-", usage: "clear — clean screen\nCtrl+L — keyboard shortcut" },
        { name: "man", type: "command", short: "Manual pages dikhata hai — help documentation", install: "-", usage: "man ls — ls command ka manual\nman -k keyword — search manuals" },
        { name: "apropos", type: "command", short: "Manual page names search karta hai", install: "-", usage: "apropos network — network related commands" },
        { name: "info", type: "command", short: "Info documentation reader — detailed help", install: "-", usage: "info ls — detailed info" },
        { name: "whatis", type: "command", short: "One-line command description dikhata hai", install: "-", usage: "whatis ls — brief description" },
        { name: "bc", type: "command", short: "Basic calculator — command line pe calculations", install: "sudo apt install bc", usage: "echo '2+2' | bc — calculate\nbc -l — with math library" },
        { name: "expr", type: "command", short: "Expression evaluation — arithmetic operations", install: "-", usage: "expr 5 + 3 — addition\nexpr 10 / 2 — division" },
        { name: "seq", type: "command", short: "Number sequences generate karta hai", install: "-", usage: "seq 1 10 — 1 to 10\nseq 5 2 15 — 5 to 15 step 2" }
      ]
    }
  ]
};

// ===== GLOBAL VARIABLES =====
let root;
let treeLayout;
let svg;
let g;
let zoom;
let duration = 400;
let nodeId = 0;
let selectedNode = null;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
  initializeTree();
  populateExplanationsList();
  setupEventListeners();
});

// ===== TREE INITIALIZATION =====
function initializeTree() {
  const container = document.getElementById('tree-svg');
  const width = container.clientWidth;
  const height = container.clientHeight;

  // Create SVG
  svg = d3.select('#tree-svg')
    .attr('width', width)
    .attr('height', height)
    .attr('role', 'tree')
    .attr('aria-label', 'Linux commands tree navigation');

  // Create zoom behavior
  zoom = d3.zoom()
    .scaleExtent([0.1, 3])
    .on('zoom', (event) => {
      g.attr('transform', event.transform);
    });

  svg.call(zoom);

  // Create container group
  g = svg.append('g')
    .attr('transform', `translate(100,${height / 2})`);

  // Create tree layout
  treeLayout = d3.tree()
    .size([height - 100, width - 300])
    .separation((a, b) => (a.parent === b.parent ? 1 : 1.2));

  // Create hierarchy
  root = d3.hierarchy(DATA);
  root.x0 = height / 2;
  root.y0 = 0;

  // Assign IDs
root.descendants().forEach((d, i) => {
  d.id = i;
  d._children = d.children;
  // collapse deeper levels (keep only first 2 levels open)
  if (d.depth > 1) {
    d.children = null;
  }
});

  update(root);
}

// ===== KEYBOARD ACCESSIBILITY FUNCTIONS =====
function handleNodeActivation(d) {
  if (d.children || d._children) {
    toggle(d);
    update(d);
  }
  showDetails(d.data);
  highlightNode(d);
}

function handleKeyboardNavigation(event, d) {
  const visibleNodes = root.descendants().filter(n => {
    let parent = n.parent;
    while (parent) {
      if (!parent.children) return false;
      parent = parent.parent;
    }
    return true;
  });

  const currentIndex = visibleNodes.findIndex(n => n.id === d.id);

  switch(event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault();
      handleNodeActivation(d);
      break;
    
    case 'ArrowUp':
      event.preventDefault();
      if (currentIndex > 0) {
        focusNode(visibleNodes[currentIndex - 1]);
      }
      break;
    
    case 'ArrowDown':
      event.preventDefault();
      if (currentIndex < visibleNodes.length - 1) {
        focusNode(visibleNodes[currentIndex + 1]);
      }
      break;
    
    case 'ArrowRight':
      event.preventDefault();
      if (d._children) {
        // Expand collapsed node
        toggle(d);
        update(d);
      } else if (d.children && d.children.length > 0) {
        // Move to first child
        focusNode(d.children[0]);
      }
      break;
    
    case 'ArrowLeft':
      event.preventDefault();
      if (d.children) {
        // Collapse expanded node
        toggle(d);
        update(d);
      } else if (d.parent) {
        // Move to parent
        focusNode(d.parent);
      }
      break;
    
    case 'Home':
      event.preventDefault();
      focusNode(visibleNodes[0]);
      break;
    
    case 'End':
      event.preventDefault();
      focusNode(visibleNodes[visibleNodes.length - 1]);
      break;
  }
}

function focusNode(d) {
  // Find the DOM element for this node and focus it
  g.selectAll('.node')
    .filter(n => n.id === d.id)
    .node()
    ?.focus();
  
  // Also show details
  showDetails(d.data);
  highlightNode(d);
}

// ===== TREE UPDATE FUNCTION =====
function update(source) {
  const treeData = treeLayout(root);
  const nodes = treeData.descendants();
  const links = treeData.links();

  // Normalize for fixed-depth
  nodes.forEach(d => {
    d.y = d.depth * 200;
  });

  // ===== NODES =====
  const node = g.selectAll('g.node')
    .data(nodes, d => d.id || (d.id = ++nodeId));

  // Enter new nodes
  const nodeEnter = node.enter().append('g')
    .attr('class', 'node')
    .attr('transform', d => `translate(${source.y0},${source.x0})`)
    .attr('tabindex', 0)
    .attr('role', 'treeitem')
    .attr('aria-label', d => `${d.data.name}: ${d.data.short || d.data.type}`)
    .attr('aria-expanded', d => d.children ? 'true' : d._children ? 'false' : null)
    .on('click', (event, d) => {
      handleNodeActivation(d);
    })
    .on('keydown', (event, d) => {
      handleKeyboardNavigation(event, d);
    })
    .on('mouseenter', (event, d) => showTooltip(event, d))
    .on('mouseleave', hideTooltip);

  nodeEnter.append('circle')
    .attr('r', 6)
    .style('fill', d => d._children ? '#4da6ff' : '#238636');

  nodeEnter.append('text')
    .attr('dy', '0.31em')
    .attr('x', d => d.children || d._children ? -10 : 10)
    .attr('text-anchor', d => d.children || d._children ? 'end' : 'start')
    .text(d => d.data.name);

  // Update existing nodes
  const nodeUpdate = nodeEnter.merge(node);

  nodeUpdate.transition()
    .duration(duration)
    .attr('transform', d => `translate(${d.y},${d.x})`);

  // Update aria-expanded attribute
  nodeUpdate.attr('aria-expanded', d => d.children ? 'true' : d._children ? 'false' : null);

  nodeUpdate.select('circle')
    .style('fill', d => d._children ? '#4da6ff' : '#238636')
    .attr('r', 6);

  // Exit old nodes
  const nodeExit = node.exit().transition()
    .duration(duration)
    .attr('transform', d => `translate(${source.y},${source.x})`)
    .remove();

  nodeExit.select('circle')
    .attr('r', 0);

  nodeExit.select('text')
    .style('fill-opacity', 0);

  // ===== LINKS =====
  const link = g.selectAll('path.link')
    .data(links, d => d.target.id);

  // Enter new links
  const linkEnter = link.enter().insert('path', 'g')
    .attr('class', 'link')
    .attr('d', d => {
      const o = {x: source.x0, y: source.y0};
      return diagonal(o, o);
    });

  // Update existing links
  linkEnter.merge(link).transition()
    .duration(duration)
    .attr('d', d => diagonal(d.source, d.target));

  // Exit old links
  link.exit().transition()
    .duration(duration)
    .attr('d', d => {
      const o = {x: source.x, y: source.y};
      return diagonal(o, o);
    })
    .remove();

  // Store old positions
  nodes.forEach(d => {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

// ===== DIAGONAL PATH GENERATOR =====
function diagonal(s, d) {
  return `M ${s.y} ${s.x}
          C ${(s.y + d.y) / 2} ${s.x},
            ${(s.y + d.y) / 2} ${d.x},
            ${d.y} ${d.x}`;
}

// ===== TOGGLE NODE =====
function toggle(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
}

// ===== TOOLTIP FUNCTIONS =====
function showTooltip(event, d) {
  const tooltip = document.getElementById('tooltip');
  const data = d.data;
  
  let content = `<h4>${data.name}</h4>`;
  if (data.short && data.short !== '-') {
    content += `<p>${data.short}</p>`;
  }
  if (data.usage && data.usage !== '-') {
    const usageLines = data.usage.split('\n');
    content += `<p><code>${usageLines[0]}</code></p>`;
  }
  
  tooltip.innerHTML = content;
  tooltip.classList.add('visible');
  
  const x = event.pageX + 15;
  const y = event.pageY + 15;
  tooltip.style.left = x + 'px';
  tooltip.style.top = y + 'px';
}

function hideTooltip() {
  const tooltip = document.getElementById('tooltip');
  tooltip.classList.remove('visible');
}

// ===== DETAILS PANEL =====
function showDetails(data) {
  const content = document.getElementById('detailsContent');
  
  if (data.type === 'root' || data.type === 'category') {
    content.innerHTML = `
      <h3>${data.name}</h3>
      <span class="type-badge">${data.type}</span>
      <p class="short-desc">${data.short}</p>
    `;
  } else {
    content.innerHTML = `
      <h3>${data.name}</h3>
      <span class="type-badge">${data.type}</span>
      <p class="short-desc">${data.short}</p>
      ${data.install !== '-' ? `
        <h4>📦 Installation:</h4>
        <div class="install-cmd">${data.install}</div>
      ` : ''}
      ${data.usage !== '-' ? `
        <h4>💡 Usage:</h4>
        <div class="usage-cmd">${data.usage.replace(/\n/g, '<br>')}</div>
      ` : ''}
    `;
  }
  
  // Highlight in explanations list
  scrollToExplanation(data.name);
}

// ===== EXPLANATIONS LIST =====
function populateExplanationsList() {
  const list = document.getElementById('explanationsList');
  const allCommands = [];
  
  function collectCommands(node) {
    if (node.type === 'command' || node.type === 'tool') {
      allCommands.push(node);
    }
    if (node.children) {
      node.children.forEach(child => collectCommands(child));
    }
  }
  
  collectCommands(DATA);
  
  allCommands.forEach(cmd => {
    const item = document.createElement('div');
    item.className = 'explanation-item';
    item.dataset.name = cmd.name;
    item.innerHTML = `
      <strong>${cmd.name}</strong>
      <p>${cmd.short}</p>
    `;
    item.addEventListener('click', () => {
      findAndSelectNode(cmd.name);
    });
    list.appendChild(item);
  });
}

function scrollToExplanation(name) {
  const items = document.querySelectorAll('.explanation-item');
  items.forEach(item => {
    if (item.dataset.name === name) {
      item.classList.add('highlighted');
      item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      item.classList.remove('highlighted');
    }
  });
}

function findAndSelectNode(name) {
  root.each(d => {
    if (d.data.name === name) {
      // Expand path to this node
      let current = d.parent;
      while (current) {
        if (!current.children) {
          current.children = current._children;
          current._children = null;
        }
        current = current.parent;
      }
      update(root);
      showDetails(d.data);
      highlightNode(d);
    }
  });
}

function highlightNode(d) {
  // Remove previous highlights
  g.selectAll('.node').classed('highlighted', false);
  g.selectAll('.node circle').classed('selected', false);
  
  // Add highlight
  g.selectAll('.node')
    .filter(node => node.id === d.id)
    .classed('highlighted', true)
    .select('circle')
    .classed('selected', true);
  
  selectedNode = d;
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
  // Theme Toggle
  document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
  });

  // Expand All
  document.getElementById('expandAll').addEventListener('click', () => {
    root.each(d => {
      if (d._children) {
        d.children = d._children;
        d._children = null;
      }
    });
    update(root);
  });

  // Collapse All
  document.getElementById('collapseAll').addEventListener('click', () => {
    root.each(d => {
      if (d.children && d.depth > 1) {
        d._children = d.children;
        d.children = null;
      }
    });
    update(root);
  });

  // Reset View
  document.getElementById('resetView').addEventListener('click', () => {
    const container = document.getElementById('tree-svg');
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    svg.transition().duration(750).call(
      zoom.transform,
      d3.zoomIdentity.translate(100, height / 2)
    );
  });

  // Export JSON
  document.getElementById('exportJson').addEventListener('click', () => {
    const dataStr = JSON.stringify(DATA, null, 2);
    const blob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'linux-mastery-data.json';
    a.click();
    URL.revokeObjectURL(url);
  });

  // Search
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    if (!query) {
      // Reset all nodes
      g.selectAll('.node')
        .classed('highlighted', false)
        .classed('dimmed', false);
      return;
    }
    
    // Search and highlight
    const matches = [];
    root.each(d => {
      const nameMatch = d.data.name.toLowerCase().includes(query);
      const shortMatch = d.data.short && d.data.short.toLowerCase().includes(query);
      
      if (nameMatch || shortMatch) {
        matches.push(d);
        // Expand path to matched node
        let current = d.parent;
        while (current) {
          if (!current.children) {
            current.children = current._children;
            current._children = null;
          }
          current = current.parent;
        }
      }
    });
    
    update(root);
    
    // Highlight matches
    g.selectAll('.node')
      .classed('highlighted', d => matches.includes(d))
      .classed('dimmed', d => !matches.includes(d) && matches.length > 0);
    
    // Show first match details
    if (matches.length > 0) {
      showDetails(matches[0].data);
      scrollToExplanation(matches[0].data.name);
    }
  });

  // Keyboard accessibility
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchInput.value = '';
      searchInput.dispatchEvent(new Event('input'));
    }
  });
}
