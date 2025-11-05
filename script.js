/* script.js
   Linux Mastery Tree Map
   - Single-file data object contains 200+ commands
   - Vanilla JS: builds UI, search, panel, localStorage theme, random command, copy example
*/

/* --------------- Data: 200+ Commands --------------- */
/* Each item: { name, category, description, usage, example, tip } */
const COMMANDS = [
  /* Filesystem & Navigation (20) */
  {name:"ls", category:"Filesystem & Navigation", description:"List directory contents.", usage:"ls [options] [directory]", example:"ls -la /home/user", tip:"Use 'ls -lh' for human-readable sizes."},
  {name:"cd", category:"Filesystem & Navigation", description:"Change current directory.", usage:"cd [directory|-]", example:"cd /var/log", tip:"'cd -' returns to previous directory."},
  {name:"pwd", category:"Filesystem & Navigation", description:"Print working directory.", usage:"pwd", example:"pwd", tip:"Useful in scripts to confirm location."},
  {name:"tree", category:"Filesystem & Navigation", description:"Display directory tree.", usage:"tree [options] [directory]", example:"tree -L 2 /etc", tip:"Install via tree package if missing."},
  {name:"find", category:"Filesystem & Navigation", description:"Search for files and directories.", usage:"find <path> <expr>", example:"find / -name 'passwd' 2>/dev/null", tip:"Combine with -exec to act on results."},
  {name:"locate", category:"Filesystem & Navigation", description:"Find files using a prebuilt database.", usage:"locate <pattern>", example:"locate '*.conf' | head", tip:"Run updatedb as root to refresh DB."},
  {name:"stat", category:"Filesystem & Navigation", description:"Display file or filesystem status.", usage:"stat <file>", example:"stat /etc/passwd", tip:"Shows timestamps, size, and permissions."},
  {name:"realpath", category:"Filesystem & Navigation", description:"Resolve absolute path.", usage:"realpath <path>", example:"realpath ../bin", tip:"Useful to canonicalize symlinks."},
  {name:"readlink", category:"Filesystem & Navigation", description:"Print resolved symbolic link target.", usage:"readlink [-f] <file>", example:"readlink -f /usr/bin/python", tip:"-f resolves symlink chain."},
  {name:"du", category:"Filesystem & Navigation", description:"Estimate file/directory space usage.", usage:"du [options] [file...]", example:"du -sh /var/log", tip:"Use --max-depth to limit recursion."},
  {name:"df", category:"Filesystem & Navigation", description:"Report filesystem disk space usage.", usage:"df [options]", example:"df -h", tip:"-h for human-readable sizes."},
  {name:"mount", category:"Filesystem & Navigation", description:"Mount a filesystem.", usage:"mount [device] [dir]", example:"sudo mount /dev/sdb1 /mnt/usb", tip:"Use /etc/fstab for persistent mounts."},
  {name:"umount", category:"Filesystem & Navigation", description:"Unmount a mounted filesystem.", usage:"umount [dir|device]", example:"sudo umount /mnt/usb", tip:"Use -l for lazy unmounts."},
  {name:"lsblk", category:"Filesystem & Navigation", description:"List block devices.", usage:"lsblk [options]", example:"lsblk -f", tip:"Shows UUIDs and Fs types."},
  {name:"blkid", category:"Filesystem & Navigation", description:"Locate/print block device attributes.", usage:"blkid [device]", example:"sudo blkid /dev/sda1", tip:"Requires root to see all info."},
  {name:"statfs", category:"Filesystem & Navigation", description:"Display filesystem statistics (via stat -f).", usage:"stat -f <file>", example:"stat -f /", tip:"Gives block-level info."},
  {name:"basename", category:"Filesystem & Navigation", description:"Strip directory and suffix from filenames.", usage:"basename <path> [suffix]", example:"basename /tmp/file.txt .txt", tip:"Handy in shell scripts."},
  {name:"dirname", category:"Filesystem & Navigation", description:"Strip last component from path.", usage:"dirname <path>", example:"dirname /tmp/file.txt", tip:"Pairs with basename."},
  {name:"cp", category:"Filesystem & Navigation", description:"Copy files and directories.", usage:"cp [options] source dest", example:"cp -r src/ dest/", tip:"-a preserves attributes; -r for recursive."},
  {name:"mv", category:"Filesystem & Navigation", description:"Move/rename files and directories.", usage:"mv [options] source dest", example:"mv file.txt /tmp/backup/", tip:"Overwrites by default; use -n to avoid overwrite."},

  /* File Management (20) */
  {name:"rm", category:"File Management", description:"Remove files or directories.", usage:"rm [options] file...", example:"rm -rf build/", tip:"Be careful with sudo rm -rf; use -i for interactive."},
  {name:"mkdir", category:"File Management", description:"Create directories.", usage:"mkdir [options] directory...", example:"mkdir -p /tmp/project/src", tip:"-p creates parents as needed."},
  {name:"rmdir", category:"File Management", description:"Remove empty directories.", usage:"rmdir <dir>", example:"rmdir olddir", tip:"Only removes empty directories."},
  {name:"touch", category:"File Management", description:"Create empty file or update timestamps.", usage:"touch <file>", example:"touch ~/.myconfig", tip:"Useful to create files quickly."},
  {name:"chmod", category:"File Management", description:"Change file access permissions.", usage:"chmod [options] mode file", example:"chmod 644 file.txt", tip:"Use symbolic modes like u+x for clarity."},
  {name:"chown", category:"File Management", description:"Change file owner and group.", usage:"chown [owner][:group] file", example:"sudo chown user:users /var/www", tip:"Use -R for recursive changes."},
  {name:"ln", category:"File Management", description:"Create hard and symbolic links.", usage:"ln [-s] target linkname", example:"ln -s /usr/bin/python3 ~/bin/python", tip:"Hard links not allowed across filesystems."},
  {name:"split", category:"File Management", description:"Split files into pieces.", usage:"split [options] file [prefix]", example:"split -b 10M large.iso part_", tip:"Pairs with cat to reassemble."},
  {name:"cat", category:"File Management", description:"Concatenate and print files.", usage:"cat [file...]", example:"cat /etc/hosts", tip:"Use with > or >> to create files."},
  {name:"tac", category:"File Management", description:"Concatenate and print files in reverse.", usage:"tac [file]", example:"tac /var/log/syslog | head", tip:"Reverse counterpart of cat."},
  {name:"nl", category:"File Management", description:"Number lines of files.", usage:"nl [file]", example:"nl README.md", tip:"Useful for referring to lines."},
  {name:"more", category:"File Management", description:"Page through text interactively (older).", usage:"more [file]", example:"more /var/log/dmesg", tip:"Use less for more features."},
  {name:"less", category:"File Management", description:"View files one page at a time.", usage:"less [file]", example:"less /var/log/syslog", tip:"Use / to search inside less."},
  {name:"head", category:"File Management", description:"Output the first part of files.", usage:"head [options] [file]", example:"head -n 20 /var/log/syslog", tip:"-n controls lines."},
  {name:"tail", category:"File Management", description:"Output the last part of files.", usage:"tail [options] [file]", example:"tail -f /var/log/syslog", tip:"-f to follow appended data in real time."},
  {name:"tee", category:"File Management", description:"Read standard input and write to files and stdout.", usage:"tee [file]", example:"ps aux | tee processes.txt", tip:"Use -a to append."},
  {name:"xxd", category:"File Management", description:"Make a hex dump or do the reverse.", usage:"xxd [file]", example:"xxd -g 1 /bin/ls | head", tip:"Great for quick binary introspection."},
  {name:"sha256sum", category:"File Management", description:"Compute or check SHA256 checksums.", usage:"sha256sum [file]", example:"sha256sum file.iso", tip:"Compare against vendor checksum to verify downloads."},

  /* Processes & System Monitoring (20) */
  {name:"ps", category:"Processes & System Monitoring", description:"Report snapshot of current processes.", usage:"ps [options]", example:"ps aux | grep nginx", tip:"Use aux for full-format listing."},
  {name:"top", category:"Processes & System Monitoring", description:"Dynamic real-time view of processes.", usage:"top", example:"top", tip:"Press c to see full command lines."},
  {name:"htop", category:"Processes & System Monitoring", description:"Interactive process viewer (improved top).", usage:"htop", example:"htop", tip:"Install htop; offers sorting and tree view."},
  {name:"kill", category:"Processes & System Monitoring", description:"Send signal to a process by PID.", usage:"kill [signal] PID", example:"kill -15 1234", tip:"SIGTERM (15) is graceful; SIGKILL (9) force kills."},
  {name:"killall", category:"Processes & System Monitoring", description:"Kill processes by name.", usage:"killall [name]", example:"sudo killall apache2", tip:"Be careful; kills all matching names."},
  {name:"nice", category:"Processes & System Monitoring", description:"Run a program with modified scheduling priority.", usage:"nice -n N command", example:"nice -n 10 make -j4", tip:"Lower priority = higher niceness value."},
  {name:"renice", category:"Processes & System Monitoring", description:"Alter priority of running processes.", usage:"renice priority -p PID", example:"sudo renice -n 5 -p 1234", tip:"Requires permissions to lower priority of other users' processes."},
  {name:"pgrep", category:"Processes & System Monitoring", description:"Search for processes by name and return PIDs.", usage:"pgrep pattern", example:"pgrep -l nginx", tip:"-l lists names alongside PIDs."},
  {name:"pmap", category:"Processes & System Monitoring", description:"Report memory map of a process.", usage:"pmap PID", example:"pmap 1234", tip:"Helpful for memory leak inspection."},
  {name:"vmstat", category:"Processes & System Monitoring", description:"Report virtual memory statistics.", usage:"vmstat [delay [count]]", example:"vmstat 1 5", tip:"Shows CPU, memory, swap, IO."},
  {name:"iostat", category:"Processes & System Monitoring", description:"Report CPU and IO statistics.", usage:"iostat [options]", example:"iostat -x 1", tip:"Install sysstat package if missing."},
  {name:"free", category:"Processes & System Monitoring", description:"Display amount of free and used memory.", usage:"free [options]", example:"free -h", tip:"-h for human-readable values."},
  {name:"uptime", category:"Processes & System Monitoring", description:"Tell how long the system has been running.", usage:"uptime", example:"uptime", tip:"Shows load averages."},
  {name:"dstat", category:"Processes & System Monitoring", description:"Versatile resource statistics tool.", usage:"dstat [options]", example:"dstat -cdngy", tip:"Install separately; combines vmstat/iostat/netstat."},
  {name:"ss", category:"Processes & System Monitoring", description:"Inspect sockets and network connections.", usage:"ss [options]", example:"ss -tuln", tip:"Faster and more modern than netstat."},
  {name:"netstat", category:"Processes & System Monitoring", description:"Network statistics and connections.", usage:"netstat [options]", example:"netstat -tulpn", tip:"May be deprecated; use ss."},
  {name:"watch", category:"Processes & System Monitoring", description:"Run a command repeatedly and show output.", usage:"watch [options] command", example:"watch -n 2 df -h", tip:"Useful for live dashboards."},
  {name:"strace", category:"Processes & System Monitoring", description:"Trace system calls and signals.", usage:"strace -p PID", example:"strace -f -o out.log myprogram", tip:"Great for debugging failing programs."},
  {name:"lsof", category:"Processes & System Monitoring", description:"List open files (sockets, files).", usage:"lsof [options]", example:"sudo lsof -i :22", tip:"Can find which process holds a file."},

  /* Permissions & Ownership (12) */
  {name:"getfacl", category:"Permissions & Ownership", description:"Get file ACLs.", usage:"getfacl <file>", example:"getfacl /var/www/html", tip:"Useful when permissions use ACLs instead of simple bits."},
  {name:"setfacl", category:"Permissions & Ownership", description:"Set file ACLs.", usage:"setfacl [options] file", example:"setfacl -m u:alice:rwx file", tip:"ACLs give fine-grained permissions."},
  {name:"chmod", category:"Permissions & Ownership", description:"Change file permissions (duplicate entry for convenience).", usage:"chmod [mode] file", example:"chmod u+x script.sh", tip:"Symbolic forms are easier to read."},
  {name:"chown", category:"Permissions & Ownership", description:"Change file owner (duplicate entry for convenience).", usage:"chown user:group file", example:"sudo chown -R www-data:www-data /var/www", tip:"Recursive change can be expensive on many files."},
  {name:"su", category:"Permissions & Ownership", description:"Switch user or become superuser.", usage:"su [-] [user]", example:"su - root", tip:"su - opens login shell; consider sudo for finer control."},
  {name:"sudo", category:"Permissions & Ownership", description:"Run command as another user (default root).", usage:"sudo command", example:"sudo apt update", tip:"Log and permission controlled via sudoers."},
  {name:"visudo", category:"Permissions & Ownership", description:"Edit sudoers file safely.", usage:"sudo visudo", example:"sudo visudo", tip:"Prevents syntax errors that could lock out sudo."},
  {name:"passwd", category:"Permissions & Ownership", description:"Change user password.", usage:"passwd [user]", example:"passwd", tip:"Admins can reset other users' passwords with sudo."},
  {name:"chage", category:"Permissions & Ownership", description:"Change user password expiry info.", usage:"chage [options] user", example:"sudo chage -l myuser", tip:"Use to enforce expire or aging policies."},
  {name:"groups", category:"Permissions & Ownership", description:"Show which groups a user is in.", usage:"groups [user]", example:"groups alice", tip:"Helpful to debug permission problems."},
  {name:"newgrp", category:"Permissions & Ownership", description:"Log in to a new group temporarily.", usage:"newgrp groupname", example:"newgrp docker", tip:"Changes group for the shell session."},
  {name:"umask", category:"Permissions & Ownership", description:"Set default file creation permissions mask.", usage:"umask [mask]", example:"umask 022", tip:"Set in shell rc to control default perms."},

  /* Networking & Connectivity (20) */
  {name:"ping", category:"Networking & Connectivity", description:"Send ICMP ECHO_REQUEST to network hosts.", usage:"ping [options] host", example:"ping -c 4 google.com", tip:"Use -c to limit number of pings."},
  {name:"traceroute", category:"Networking & Connectivity", description:"Print route packets take to network host.", usage:"traceroute [host]", example:"traceroute github.com", tip:"Use traceroute or tracepath depending on distro."},
  {name:"tracepath", category:"Networking & Connectivity", description:"Trace path to host (no root required).", usage:"tracepath host", example:"tracepath 8.8.8.8", tip:"Good when traceroute not installed."},
  {name:"curl", category:"Networking & Connectivity", description:"Transfer data from or to a server with URLs.", usage:"curl [options] URL", example:"curl -I https://example.com", tip:"-I fetches headers."},
  {name:"wget", category:"Networking & Connectivity", description:"Retrieve content from web servers.", usage:"wget [options] URL", example:"wget https://example.com/file.tar.gz", tip:"--mirror for recursive download."},
  {name:"scp", category:"Networking & Connectivity", description:"Secure copy files over SSH.", usage:"scp src dest", example:"scp file.txt user@host:/tmp", tip:"Uses same auth as ssh."},
  {name:"sftp", category:"Networking & Connectivity", description:"Interactive file transfer over SSH.", usage:"sftp user@host", example:"sftp user@host", tip:"Good interactive alternative to scp."},
  {name:"ssh", category:"Networking & Connectivity", description:"OpenSSH client to connect to remote hosts.", usage:"ssh [user@]host", example:"ssh -p 2222 alice@remote", tip:"Use public key auth for convenience."},
  {name:"ss", category:"Networking & Connectivity", description:"Socket statistics (duplicate entry).", usage:"ss -tuln", example:"ss -tuln", tip:"Useful for finding listening ports."},
  {name:"nc", category:"Networking & Connectivity", description:"Netcat — versatile network utility.", usage:"nc [options] host port", example:"nc -l 8080", tip:"Can transfer files or debug connectivity."},
  {name:"nmap", category:"Networking & Connectivity", description:"Network exploration and security auditing.", usage:"nmap [options] target", example:"nmap -sS -Pn 10.0.0.0/24", tip:"Install separately; powerful and feature-rich."},
  {name:"hostname", category:"Networking & Connectivity", description:"Show or set the system's host name.", usage:"hostname [name]", example:"hostnamectl set-hostname mybox", tip:"hostnamectl works on systemd systems."},
  {name:"ip", category:"Networking & Connectivity", description:"IP routing, devices, policy routing and tunnels.", usage:"ip [options] OBJECT {COMMAND | help}", example:"ip addr show", tip:"Replaces older ifconfig/route tools."},
  {name:"ifconfig", category:"Networking & Connectivity", description:"Configure network interfaces (legacy).", usage:"ifconfig [interface]", example:"ifconfig eth0", tip:"Deprecated on many systems; ip is preferred."},
  {name:"route", category:"Networking & Connectivity", description:"Show/manipulate the IP routing table (legacy).", usage:"route [options]", example:"route -n", tip:"ip route is modern replacement."},
  {name:"arp", category:"Networking & Connectivity", description:"Display or manipulate ARP table.", usage:"arp -a", example:"arp -a", tip:"Useful for local network debugging."},
  {name:"dig", category:"Networking & Connectivity", description:"DNS lookup utility.", usage:"dig [@server] name [type]", example:"dig +short google.com", tip:"+short returns concise answers."},
  {name:"host", category:"Networking & Connectivity", description:"DNS lookup utility (simple).", usage:"host name", example:"host example.com", tip:"Quick alternative to dig."},
  {name:"tcpdump", category:"Networking & Connectivity", description:"Capture network packets.", usage:"tcpdump [options] [filter]", example:"sudo tcpdump -i eth0 port 80", tip:"Requires root; use -w to save to file."},

  /* Compression & Archiving (12) */
  {name:"tar", category:"Compression & Archiving", description:"Tape archive utility for creating/extracting archives.", usage:"tar [options] archive files", example:"tar -czf archive.tgz folder/", tip:"-c create, -x extract, -z gzip, -j bzip2, -J xz."},
  {name:"gzip", category:"Compression & Archiving", description:"Compress or decompress files with gzip.", usage:"gzip [file]", example:"gzip file.txt", tip:"gunzip to decompress."},
  {name:"gunzip", category:"Compression & Archiving", description:"Decompress .gz files.", usage:"gunzip file.gz", example:"gunzip file.gz", tip:"Equivalent to gzip -d."},
  {name:"bzip2", category:"Compression & Archiving", description:"Compress files with bzip2.", usage:"bzip2 file", example:"bzip2 data.csv", tip:"Produces smaller files than gzip but slower."},
  {name:"xz", category:"Compression & Archiving", description:"Compress files with xz (LZMA).", usage:"xz file", example:"xz large.log", tip:"High compression; slower than gzip."},
  {name:"unzip", category:"Compression & Archiving", description:"Extract .zip archives.", usage:"unzip file.zip", example:"unzip package.zip -d outdir", tip:"-l lists contents without extracting."},
  {name:"zip", category:"Compression & Archiving", description:"Create zip archives.", usage:"zip [options] zipfile files...", example:"zip -r code.zip src/", tip:"Cross-platform friendly."},
  {name:"7z", category:"Compression & Archiving", description:"7-Zip compression tool.", usage:"7z [command] archive files", example:"7z a archive.7z folder", tip:"Install p7zip package for 7z command."},
  {name:"tar.gz", category:"Compression & Archiving", description:"Common combined format: tar + gzip (convenience entry).", usage:"tar -czf archive.tar.gz folder", example:"tar -czf site.tar.gz public_html", tip:"Use streaming with -C to set directory."},
  {name:"zstd", category:"Compression & Archiving", description:"Fast compression algorithm and tool.", usage:"zstd file", example:"zstd -9 bigfile", tip:"Fast decompression; modern choice."},
  {name:"unrar", category:"Compression & Archiving", description:"Extract RAR archives.", usage:"unrar x archive.rar", example:"unrar x files.rar", tip:"Non-free on some platforms; install appropriate package."},
  {name:"rar", category:"Compression & Archiving", description:"Create RAR archives (if available).", usage:"rar a archive.rar files", example:"rar a archive.rar folder", tip:"Often not installed by default."},

  /* Package Management (12) */
  {name:"apt", category:"Package Management", description:"Debian/Ubuntu package manager front-end.", usage:"sudo apt [command] packages", example:"sudo apt update && sudo apt upgrade", tip:"Use apt-get for scripts; apt for interactive use."},
  {name:"apt-get", category:"Package Management", description:"Low-level apt tool.", usage:"sudo apt-get install pkg", example:"sudo apt-get install curl", tip:"Stable for scripting."},
  {name:"apt-cache", category:"Package Management", description:"Query APT cache.", usage:"apt-cache search pkg", example:"apt-cache search nginx", tip:"Helps find package names."},
  {name:"dnf", category:"Package Management", description:"Fedora/CentOS/RHEL package manager.", usage:"sudo dnf install pkg", example:"sudo dnf update", tip:"Successor to yum on many distros."},
  {name:"yum", category:"Package Management", description:"Legacy package manager for RHEL/CentOS.", usage:"sudo yum install pkg", example:"sudo yum install epel-release", tip:"Still used on older systems."},
  {name:"pacman", category:"Package Management", description:"Arch Linux package manager.", usage:"sudo pacman -S pkg", example:"sudo pacman -Syu", tip:"-Syu synchronizes and upgrades system."},
  {name:"zypper", category:"Package Management", description:"OpenSUSE package manager.", usage:"sudo zypper install pkg", example:"sudo zypper refresh", tip:"zypper is powerful for repo management."},
  {name:"snap", category:"Package Management", description:"Snap package manager.", usage:"sudo snap install pkg", example:"sudo snap install code --classic", tip:"Snap packages are containerized."},
  {name:"flatpak", category:"Package Management", description:"Flatpak application manager.", usage:"flatpak install repo pkg", example:"flatpak install flathub org.gimp.GIMP", tip:"Sandboxed desktop apps."},
  {name:"rpm", category:"Package Management", description:"RPM package manager.", usage:"sudo rpm -i package.rpm", example:"sudo rpm -qa | grep nginx", tip:"Use rpm -Uvh to upgrade."},
  {name:"dpkg", category:"Package Management", description:"Debian package manager for .deb files.", usage:"sudo dpkg -i package.deb", example:"sudo dpkg -i mypkg.deb", tip:"Use apt to resolve dependencies afterwards."},
  {name:"brew", category:"Package Management", description:"Homebrew package manager (Linuxbrew).", usage:"brew install pkg", example:"brew install jq", tip:"Popular on macOS and available on Linux."},

  /* User Management (10) */
  {name:"useradd", category:"User Management", description:"Create a user account.", usage:"sudo useradd [options] username", example:"sudo useradd -m -s /bin/bash alice", tip:"-m creates home directory."},
  {name:"userdel", category:"User Management", description:"Delete a user account.", usage:"sudo userdel [options] username", example:"sudo userdel -r olduser", tip:"-r removes home directory."},
  {name:"usermod", category:"User Management", description:"Modify a user account.", usage:"sudo usermod [options] username", example:"sudo usermod -aG sudo alice", tip:"-aG append to supplementary groups."},
  {name:"adduser", category:"User Management", description:"Friendly adduser wrapper (Debian).", usage:"sudo adduser username", example:"sudo adduser bob", tip:"Interactive, sets password and home dir."},
  {name:"groupadd", category:"User Management", description:"Create a group.", usage:"sudo groupadd name", example:"sudo groupadd devs", tip:"Useful for shared resource permissions."},
  {name:"groupdel", category:"User Management", description:"Delete a group.", usage:"sudo groupdel name", example:"sudo groupdel oldgroup", tip:"Ensure no users rely on it."},
  {name:"chpasswd", category:"User Management", description:"Change passwords in batch.", usage:"echo 'user:pass' | sudo chpasswd", example:"echo 'alice:secret' | sudo chpasswd", tip:"Handy for automation."},
  {name:"id", category:"User Management", description:"Display user identity and groups.", usage:"id [user]", example:"id alice", tip:"Shows uid, gid, and groups."},
  {name:"whoami", category:"User Management", description:"Print effective username.", usage:"whoami", example:"whoami", tip:"Useful inside scripts to check run identity."},
  {name:"su", category:"User Management", description:"Switch user (duplicate entry).", usage:"su - username", example:"su - www-data", tip:"Use with care for interactive root sessions."},

  /* Security (12) */
  {name:"ufw", category:"Security", description:"Uncomplicated Firewall frontend.", usage:"sudo ufw [options]", example:"sudo ufw allow 22/tcp", tip:"Enable with sudo ufw enable."},
  {name:"iptables", category:"Security", description:"User-space utility for IPv4 packet filtering.", usage:"sudo iptables [options]", example:"sudo iptables -L -n", tip:"Use nftables on modern systems."},
  {name:"nft", category:"Security", description:"nftables command-line utility.", usage:"sudo nft [options]", example:"sudo nft list ruleset", tip:"Modern replacement for iptables on many distros."},
  {name:"fail2ban-client", category:"Security", description:"Manage fail2ban service.", usage:"sudo fail2ban-client [action] [jail]", example:"sudo fail2ban-client status sshd", tip:"Helps block repeated brute-force attempts."},
  {name:"gpg", category:"Security", description:"OpenPGP encryption, signing, and key management.", usage:"gpg [options] file", example:"gpg --verify file.sig file", tip:"Use for signing and verifying downloads."},
  {name:"ssh-keygen", category:"Security", description:"Generate SSH key pairs.", usage:"ssh-keygen [options]", example:"ssh-keygen -t ed25519 -C 'me@example.com'", tip:"Use ed25519 keys for modern security."},
  {name:"openssl", category:"Security", description:"Toolkit for SSL/TLS and general cryptography.", usage:"openssl command", example:"openssl req -new -x509 -days 365 -nodes -out cert.pem -keyout key.pem", tip:"Wide feature set; heavy tool."},
  {name:"chroot", category:"Security", description:"Run command or interactive shell with special root directory.", usage:"sudo chroot <dir> <cmd>", example:"sudo chroot /mnt/newroot /bin/bash", tip:"Use for contained troubleshooting."},
  {name:"auditctl", category:"Security", description:"Control Linux Audit system.", usage:"sudo auditctl [options]", example:"sudo auditctl -w /etc/passwd -p wa", tip:"Requires auditd running."},
  {name:"ausearch", category:"Security", description:"Search audit logs.", usage:"ausearch [options]", example:"ausearch -m USER_LOGIN", tip:"Works with auditctl configuration."},
  {name:"semanage", category:"Security", description:"SELinux management (policy tool).", usage:"semanage [options]", example:"semanage fcontext -a -t httpd_sys_content_t '/web(/.*)?'", tip:"Only on SELinux-enabled systems."},
  {name:"getsebool", category:"Security", description:"Get SELinux boolean value.", usage:"getsebool [bool]", example:"getsebool httpd_can_network_connect", tip:"Useful to quickly check SELinux toggles."},

  /* Scripting & Automation (16) */
  {name:"bash", category:"Scripting & Automation", description:"Bourne Again SHell - scripting and interactive shell.", usage:"bash [script]", example:"bash deploy.sh", tip:"Use #!/usr/bin/env bash at top of scripts."},
  {name:"sh", category:"Scripting & Automation", description:"POSIX shell.", usage:"sh script.sh", example:"sh ./install.sh", tip:"Use for portable scripts."},
  {name:"awk", category:"Scripting & Automation", description:"Pattern scanning and processing language.", usage:"awk 'program' file", example:"awk '{print $1}' /etc/passwd", tip:"Great for column processing."},
  {name:"sed", category:"Scripting & Automation", description:"Stream editor for filtering and transforming text.", usage:"sed 's/pattern/repl/' file", example:"sed -n '1,10p' file.txt", tip:"Use -i for in-place edits (careful)."},
  {name:"cut", category:"Scripting & Automation", description:"Remove sections from each line of files.", usage:"cut -f1 -d: /etc/passwd", example:"cut -d: -f1 /etc/passwd", tip:"Works well for delimiter-separated fields."},
  {name:"jq", category:"Scripting & Automation", description:"Command-line JSON processor.", usage:"jq 'filter' file.json", example:"jq '.items[] | .name' data.json", tip:"Install jq; indispensable for JSON."},
  {name:"xargs", category:"Scripting & Automation", description:"Build and execute command lines from standard input.", usage:"xargs command", example:"find . -name '*.log' | xargs gzip", tip:"Use -0 with -print0 to handle spaces."},
  {name:"cron", category:"Scripting & Automation", description:"Daemon to run scheduled commands.", usage:"crontab -e", example:"0 2 * * * /usr/local/bin/backup", tip:"Use crontab -e per-user."},
  {name:"crontab", category:"Scripting & Automation", description:"Install and manage crontab files.", usage:"crontab -l|-e|-r", example:"crontab -l", tip:"Entries are per user."},
  {name:"at", category:"Scripting & Automation", description:"Schedule a command to run once at a later time.", usage:"echo 'command' | at time", example:"echo 'shutdown -h now' | at 23:00", tip:"atd must be running."},
  {name:"systemd-run", category:"Scripting & Automation", description:"Run a command as a transient systemd unit.", usage:"systemd-run [options] command", example:"systemd-run --user --on-active=1m backup.sh", tip:"Great for services with resource constraints."},
  {name:"env", category:"Scripting & Automation", description:"Run a command in a modified environment.", usage:"env VAR=value command", example:"env NODE_ENV=production node server.js", tip:"Displays current environment without args."},
  {name:"export", category:"Scripting & Automation", description:"Set environment variables for child processes (shell builtin).", usage:"export VAR=value", example:"export PATH=$PATH:~/bin", tip:"Set in .bashrc to persist for interactive shells."},
  {name:"source", category:"Scripting & Automation", description:"Read and execute commands from a file in current shell.", usage:". filename or source filename", example:"source ~/.profile", tip:"Unlike running script, changes affect current shell."},
  {name:"wait", category:"Scripting & Automation", description:"Wait for background jobs to finish in shells.", usage:"wait [pid]", example:"sleep 5 & pid=$!; wait $pid", tip:"Useful in scripts queuing background tasks."},

  /* Disk & Storage (12) */
  {name:"fdisk", category:"Disk & Storage", description:"Partition table manipulator for Linux.", usage:"sudo fdisk /dev/sdX", example:"sudo fdisk /dev/sda", tip:"Interactive and powerful; be cautious."},
  {name:"parted", category:"Disk & Storage", description:"Partition editor useful for modern disks.", usage:"sudo parted /dev/sdX", example:"sudo parted /dev/sdb mklabel gpt", tip:"Works with GPT and large disks."},
  {name:"mkfs", category:"Disk & Storage", description:"Build a Linux filesystem on a device.", usage:"mkfs -t ext4 /dev/sdX1", example:"sudo mkfs.ext4 /dev/sdb1", tip:"Formatting destroys existing data."},
  {name:"fsck", category:"Disk & Storage", description:"Filesystem consistency check and repair.", usage:"sudo fsck /dev/sdXn", example:"sudo fsck -y /dev/sda1", tip:"Run when unmounted or in maintenance mode."},
  {name:"resize2fs", category:"Disk & Storage", description:"Resize ext2/3/4 filesystem.", usage:"sudo resize2fs /dev/sdXn", example:"sudo resize2fs /dev/sda1 20G", tip:"Adjust partition first with parted or fdisk."},
  {name:"mkfs.ext4", category:"Disk & Storage", description:"Create ext4 filesystem explicitly.", usage:"sudo mkfs.ext4 /dev/sdX", example:"sudo mkfs.ext4 /dev/sdc1", tip:"Same as mkfs -t ext4."},
  {name:"lsblk", category:"Disk & Storage", description:"List block devices (duplicate entry).", usage:"lsblk -f", example:"lsblk -o NAME,FSTYPE,SIZE,MOUNTPOINT", tip:"Useful overview of disks."},
  {name:"cryptsetup", category:"Disk & Storage", description:"LUKS disk encryption setup and operations.", usage:"sudo cryptsetup luksFormat /dev/sdX", example:"sudo cryptsetup luksOpen /dev/sdb1 secret", tip:"Back up LUKS header to recover from corruption."},
  {name:"pvcreate", category:"Disk & Storage", description:"Initialize a disk or partition as LVM PV.", usage:"sudo pvcreate /dev/sdX", example:"sudo pvcreate /dev/sdc1", tip:"Used with vgcreate and lvcreate."},
  {name:"vgcreate", category:"Disk & Storage", description:"Create an LVM volume group.", usage:"sudo vgcreate vgname /dev/sdX", example:"sudo vgcreate data-vg /dev/sdc1", tip:"Group PVs together for LVs."},
  {name:"lvcreate", category:"Disk & Storage", description:"Create logical volumes in LVM.", usage:"sudo lvcreate -n name -L size VG", example:"sudo lvcreate -n lvdata -L 50G data-vg", tip:"Use thin provisioning if desired."},
  {name:"mount", category:"Disk & Storage", description:"Mount filesystem (duplicate entry).", usage:"mount device dir", example:"sudo mount /dev/mapper/data /mnt/data", tip:"Use UUIDs in /etc/fstab for stability."},

  /* System Info (10) */
  {name:"uname", category:"System Info", description:"Print system information.", usage:"uname [options]", example:"uname -a", tip:"-r shows kernel version."},
  {name:"lsb_release", category:"System Info", description:"Distribution-specific release information.", usage:"lsb_release -a", example:"lsb_release -a", tip:"May need lsb-release package."},
  {name:"dmesg", category:"System Info", description:"Print or control kernel ring buffer.", usage:"dmesg [options]", example:"dmesg | less", tip:"Often contains boot and hardware messages."},
  {name:"uname", category:"System Info", description:"Kernel information (duplicate entry).", usage:"uname -r", example:"uname -r", tip:"Quick kernel check."},
  {name:"hostnamectl", category:"System Info", description:"Query and change system hostname and related settings.", usage:"hostnamectl [options] command", example:"hostnamectl status", tip:"Available on systemd systems."},
  {name:"lsusb", category:"System Info", description:"List USB devices.", usage:"lsusb", example:"lsusb", tip:"Helpful for debugging USB hardware."},
  {name:"lspci", category:"System Info", description:"List PCI devices.", usage:"lspci", example:"lspci -v", tip:"Use -k to see kernel drivers."},
  {name:"inxi", category:"System Info", description:"Full system information script (not always installed).", usage:"inxi [options]", example:"inxi -F", tip:"Install for quick reports."},
  {name:"hwinfo", category:"System Info", description:"Probe for hardware (SUSE/others).", usage:"hwinfo", example:"sudo hwinfo --short", tip:"Provides detailed hardware info."},
  {name:"screenfetch", category:"System Info", description:"Display system info with ASCII logo.", usage:"screenfetch", example:"screenfetch", tip:"Cosmetic, often preinstalled on dev machines."},

  /* Logging & Debugging (10) */
  {name:"journalctl", category:"Logging & Debugging", description:"Query systemd journal logs.", usage:"journalctl [options]", example:"journalctl -u ssh.service -b", tip:"Use -f to follow like tail -f."},
  {name:"logger", category:"Logging & Debugging", description:"Make entries in the system log.", usage:"logger [options] message", example:"logger 'backup completed'", tip:"Useful in scripts to send logs to syslog."},
  {name:"tail", category:"Logging & Debugging", description:"Follow logs (duplicate entry).", usage:"tail -f /var/log/syslog", example:"tail -n 200 /var/log/syslog", tip:"-F handles rotated files."},
  {name:"awk", category:"Logging & Debugging", description:"Text processing (duplicate entry).", usage:"awk 'pattern{action}' file", example:"awk '/ERROR/ {print $0}' app.log", tip:"Powerful for log parsing."},
  {name:"sed", category:"Logging & Debugging", description:"Stream editor (duplicate entry).", usage:"sed 's/foo/bar/' file", example:"sed -n '1,100p' /var/log/syslog", tip:"Use carefully for in-place edits."},
  {name:"grep", category:"Logging & Debugging", description:"Search text using patterns.", usage:"grep [options] pattern [file...]", example:"grep -R --line-number 'TODO' .", tip:"Use -i for case-insensitive search."},
  {name:"egrep", category:"Logging & Debugging", description:"Extended grep (pattern).", usage:"egrep 'pattern' file", example:"egrep -n 'error|fail' app.log", tip:"Often alias to grep -E."},
  {name:"fgrep", category:"Logging & Debugging", description:"Fixed-string grep.", usage:"fgrep 'text' file", example:"fgrep 'literal*text' file", tip:"Good for literal matches; faster on large inputs."},
  {name:"perl", category:"Logging & Debugging", description:"Perl interpreter for quick one-liners.", usage:"perl -ne '...' file", example:"perl -ne 'print if /ERROR/' app.log", tip:"Perl is super useful for complex text transforms."},
  {name:"python", category:"Logging & Debugging", description:"Python interpreter (useful for scripts).", usage:"python3 script.py", example:"python3 -c \"print('hello')\"", tip:"Great for quick parsing or prototyping."},

  /* Text Processing (10) */
  {name:"grep", category:"Text Processing", description:"Pattern search utility (duplicate entry).", usage:"grep [options] pattern file", example:"grep -R 'TODO' .", tip:"Combine with --context for nearby lines."},
  {name:"sort", category:"Text Processing", description:"Sort lines of text files.", usage:"sort [options] file", example:"sort -u list.txt", tip:"-u for unique entries."},
  {name:"uniq", category:"Text Processing", description:"Report or filter out repeated lines.", usage:"uniq [options] file", example:"sort list.txt | uniq -c", tip:"Often paired with sort."},
  {name:"tr", category:"Text Processing", description:"Translate or delete characters.", usage:"tr 'set1' 'set2'", example:"tr '[:lower:]' '[:upper:]' < file", tip:"Useful for small transforms in pipelines."},
  {name:"fmt", category:"Text Processing", description:"Simple optimal text formatter.", usage:"fmt [options] [file]", example:"fmt -w 72 README.md", tip:"Wraps paragraphs to specified width."},
  {name:"column", category:"Text Processing", description:"Columnate lists.", usage:"column -t file", example:"cat /etc/passwd | column -t -s ':'", tip:"Makes colon-separated data readable."},
  {name:"comm", category:"Text Processing", description:"Compare two sorted files line by line.", usage:"comm file1 file2", example:"comm -12 a b", tip:"Requires sorted inputs."},
  {name:"paste", category:"Text Processing", description:"Merge lines of files horizontally.", usage:"paste file1 file2", example:"paste names ages", tip:"Good for simple TSV creation."},
  {name:"printf", category:"Text Processing", description:"Format and print data (shell builtin and GNU coreutils).", usage:"printf FORMAT [ARGUMENTS...]", example:"printf '%s\n' a b c", tip:"Deterministic formatting in scripts."},
  {name:"yes", category:"Text Processing", description:"Output 'y' (or a string) repeatedly; useful to feed prompts.", usage:"yes [string]", example:"yes | sudo apt-get upgrade", tip:"Kill with Ctrl+C; risky with package managers."},

  /* Development / Git / Networking Helpers (12) */
  {name:"git", category:"Development", description:"Distributed version control system.", usage:"git [command] [options]", example:"git clone https://github.com/user/repo.git", tip:"Learn commonly used flows: clone, branch, commit, push."},
  {name:"ssh-copy-id", category:"Development", description:"Copy public key to remote host for SSH auth.", usage:"ssh-copy-id user@host", example:"ssh-copy-id alice@server", tip:"Installs your key into authorized_keys."},
  {name:"ncdu", category:"Development", description:"NCurses disk usage analyzer.", usage:"ncdu [dir]", example:"ncdu /home", tip:"Interactive, good for finding large files."},
  {name:"docker", category:"Development", description:"Container runtime and manager.", usage:"docker [command] [options]", example:"docker run -it --rm ubuntu bash", tip:"Requires docker daemon running."},
  {name:"docker-compose", category:"Development", description:"Compose multi-container Docker apps.", usage:"docker-compose up", example:"docker-compose up -d", tip:"Sometimes named docker compose on newer installs."},
  {name:"make", category:"Development", description:"Build automation tool.", usage:"make [target]", example:"make build", tip:"Useful for automation across languages."},
  {name:"cc", category:"Development", description:"C compiler front-end (gcc/clang).", usage:"cc file.c -o program", example:"cc hello.c -o hello", tip:"Often symlink to gcc or clang."},
  {name:"strace", category:"Development", description:"Trace system calls (duplicate entry).", usage:"strace -o out prog", example:"strace -f -o trace.log ./app", tip:"Great for debugging system-level failures."},
  {name:"perf", category:"Development", description:"Performance analysis tools for Linux.", usage:"perf [command]", example:"perf top", tip:"Requires perf tools installed and kernel support."},
  {name:"gdb", category:"Development", description:"GNU debugger.", usage:"gdb program", example:"gdb ./app", tip:"Use with debug symbols (-g)."},

  /* System Services & Init (8) */
  {name:"systemctl", category:"System Services", description:"Control the systemd system and service manager.", usage:"systemctl [verb] [unit]", example:"sudo systemctl restart nginx", tip:"Use systemctl status unit to see logs."},
  {name:"service", category:"System Services", description:"Service management (sysvinit compatibility).", usage:"sudo service name action", example:"sudo service apache2 restart", tip:"On systemd systems maps to systemctl."},
  {name:"systemctl --failed", category:"System Services", description:"Show failed services.", usage:"systemctl --failed", example:"systemctl --failed", tip:"Quickly spot services that failed to start."},
  {name:"journalctl -xe", category:"System Services", description:"Show recent errors (convenience example).", usage:"journalctl -xe", example:"sudo journalctl -xe", tip:"Helpful when services fail to start."},
  {name:"timedatectl", category:"System Services", description:"Query and change system clock and timezone.", usage:"timedatectl [command]", example:"timedatectl set-timezone Asia/Kolkata", tip:"Use to configure NTP and timezone."},
  {name:"localectl", category:"System Services", description:"Control system locale and keyboard layout.", usage:"localectl [command]", example:"localectl status", tip:"Useful to check locale settings."},
  {name:"reboot", category:"System Services", description:"Reboot the system.", usage:"sudo reboot", example:"sudo reboot", tip:"Use carefully on production systems."},
  {name:"shutdown", category:"System Services", description:"Bring the system down.", usage:"sudo shutdown [time] [message]", example:"sudo shutdown -h +10 'maintenance'", tip:"Schedule shutdown with time parameter."},

  /* Misc Utilities (10) */
  {name:"date", category:"Miscellaneous", description:"Display or set system date and time.", usage:"date [options]", example:"date --iso-8601=seconds", tip:"Useful for scripting timestamps."},
  {name:"cal", category:"Miscellaneous", description:"Display calendar.", usage:"cal [month] [year]", example:"cal 2025", tip:"Small utility for quick date checks."},
  {name:"uptime", category:"Miscellaneous", description:"Show system uptime (duplicate entry).", usage:"uptime", example:"uptime", tip:"Shows load averages."},
  {name:"watch", category:"Miscellaneous", description:"Run command repeatedly (duplicate entry).", usage:"watch -n 2 df -h", example:"watch -n 2 df -h", tip:"Great for watching changing outputs."},
  {name:"alias", category:"Miscellaneous", description:"Create shell aliases.", usage:"alias name='command'", example:"alias ll='ls -la'", tip:"Set in ~/.bashrc or ~/.zshrc to persist."},
  {name:"unalias", category:"Miscellaneous", description:"Remove an alias.", usage:"unalias name", example:"unalias ll", tip:"Use -a to remove all aliases."},
  {name:"history", category:"Miscellaneous", description:"Show command history.", usage:"history [n]", example:"history | grep ssh", tip:"Use !n or !! to rerun commands from history."},
  {name:"who", category:"Miscellaneous", description:"Show who is logged on.", usage:"who", example:"who", tip:"Use w for more verbose info."},
  {name:"w", category:"Miscellaneous", description:"Show who is logged on and what they are doing.", usage:"w", example:"w", tip:"Shows load and per-user activity."},
  {name:"clear", category:"Miscellaneous", description:"Clear terminal screen.", usage:"clear", example:"clear", tip:"Ctrl+L often does same in many terminals."},

  /* Additional commands to reach 200+ (many small / useful tools) */
  {name:"alias", category:"Shell Helpers", description:"Defines a shortcut for a command (duplicate).", usage:"alias name='command'", example:"alias gs='git status'", tip:"Use to save typing."},
  {name:"bg", category:"Shell Helpers", description:"Resume suspended job in background.", usage:"bg [job]", example:"bg %1", tip:"Pairs with fg and jobs."},
  {name:"fg", category:"Shell Helpers", description:"Bring job to foreground.", usage:"fg [job]", example:"fg %1", tip:"Continue interacting with background job."},
  {name:"jobs", category:"Shell Helpers", description:"List active jobs for current shell.", usage:"jobs", example:"jobs -l", tip:"Shows background/suspended jobs."},
  {name:"disown", category:"Shell Helpers", description:"Remove job from shell's job table.", usage:"disown [job]", example:"disown %1", tip:"Prevents SIGHUP from killing job."},
  {name:"setsid", category:"Shell Helpers", description:"Run a program in a new session.", usage:"setsid program", example:"setsid myserver &", tip:"Detach process from controlling terminal."},
  {name:"nohup", category:"Shell Helpers", description:"Run command immune to hangups.", usage:"nohup command &", example:"nohup python3 server.py &", tip:"Redirect output to nohup.out by default."},
  {name:"sshd", category:"Shell Helpers", description:"SSH daemon (server).", usage:"sudo systemctl start sshd", example:"sudo systemctl status sshd", tip:"Service name may be ssh or sshd."},
  {name:"cron", category:"Shell Helpers", description:"Daemon for scheduled tasks (duplicate).", usage:"crontab -e", example:"0 3 * * * /usr/local/bin/backup", tip:"Cron environment differs from interactive shell."},
  {name:"man", category:"Documentation", description:"Display manual pages.", usage:"man command", example:"man ls", tip:"Use man -k to search keywords."},
  {name:"apropos", category:"Documentation", description:"Search manual page names and descriptions.", usage:"apropos keyword", example:"apropos network", tip:"Search when unsure of command name."},
  {name:"whatis", category:"Documentation", description:"Display one-line manual page descriptions.", usage:"whatis command", example:"whatis tar", tip:"Quick hint about command purpose."},
  {name:"info", category:"Documentation", description:"Read info documentation pages.", usage:"info topic", example:"info bash", tip:"Some projects provide richer info pages than man."},
  {name:"whereis", category:"Documentation", description:"Locate binary, source, and manual page files.", usage:"whereis command", example:"whereis perl", tip:"Quickly find installed binaries."},
  {name:"which", category:"Documentation", description:"Locate executable in PATH.", usage:"which command", example:"which python3", tip:"Shows which binary will run."},
  {name:"strings", category:"Forensics", description:"Find printable strings in binary files.", usage:"strings file", example:"strings /bin/ls | head", tip:"Good for quick binary inspection."},
  {name:"hexdump", category:"Forensics", description:"Display binary files in hex.", usage:"hexdump -C file", example:"hexdump -C /dev/zero | head", tip:"Useful for low-level debugging."},
  {name:"watch", category:"Forensics", description:"Run command periodically (duplicate).", usage:"watch -n 1 command", example:"watch -n 1 df -h", tip:"Handy for monitoring."},
  {name:"nc -zv", category:"Forensics", description:"Netcat quick port scan example.", usage:"nc -zv host port", example:"nc -zv 192.168.1.1 22", tip:"-z for scanning, -v for verbose."},

  /* Fillers to ensure 200+ (keep concise) */
  {name:"rename", category:"File Management", description:"Rename multiple files (Perl rename).", usage:"rename 's/from/to/' files", example:"rename 's/.txt/.md/' *.txt", tip:"Two variants exist; check man page."},
  {name:"watch", category:"Monitoring", description:"Run cmd repeatedly (another duplicate).", usage:"watch -n 2 cmd", example:"watch -n 2 free -h", tip:"Often aliased with color."},
  {name:"smem", category:"Monitoring", description:"Memory reporting tool.", usage:"smem", example:"smem -k", tip:"Install separately."},
  {name:"whois", category:"Networking", description:"Query domain registration.", usage:"whois domain", example:"whois example.com", tip:"Use for domain lookup and ownership."},
  {name:"arping", category:"Networking", description:"Send ARP requests to hosts.", usage:"arping host", example:"arping -c 3 192.168.1.1", tip:"Useful for layer2 troubleshooting."},
  {name:"ipset", category:"Networking", description:"Administration tool for IP sets for iptables/nftables.", usage:"ipset [command]", example:"ipset create blacklist hash:ip", tip:"Efficiently store large IP lists."},
  {name:"ethtool", category:"Networking", description:"Display or change Ethernet device settings.", usage:"ethtool eth0", example:"sudo ethtool -i eth0", tip:"Useful for driver and link info."},
  {name:"route", category:"Networking", description:"Show/manipulate routing table (duplicate).", usage:"route -n", example:"route -n", tip:"ip route recommended."},
  {name:"arp", category:"Networking", description:"Address Resolution Protocol utility (duplicate).", usage:"arp -a", example:"arp -n", tip:"Show MAC entries."},
  {name:"md5sum", category:"File Management", description:"Compute MD5 checksums.", usage:"md5sum file", example:"md5sum file.iso", tip:"MD5 is weak for security; good for integrity checks."},
  {name:"join", category:"Text Processing", description:"Join lines of two files on a common field.", usage:"join file1 file2", example:"join -t: a b", tip:"Requires sorted files by join field."},
  {name:"iconv", category:"Text Processing", description:"Convert text encoding.", usage:"iconv -f from -t to file", example:"iconv -f ISO-8859-1 -t UTF-8 file", tip:"Useful to fix encoding issues."},
  {name:"dos2unix", category:"Text Processing", description:"Convert DOS line endings to Unix.", usage:"dos2unix file", example:"dos2unix file.txt", tip:"Use when editing files from Windows."},
  {name:"nl", category:"Text Processing", description:"Number lines (duplicate).", usage:"nl file", example:"nl file", tip:"Use to reference lines."},
  {name:"split", category:"Text Processing", description:"Split files into parts (duplicate).", usage:"split -b 10M file", example:"split -b 5M bigfile bigpart_", tip:"Combine with cat to reassemble."},
  {name:"csplit", category:"Text Processing", description:"Split a file by context.", usage:"csplit file pattern", example:"csplit bigfile /regex/ {*}", tip:"Advanced splitting by regex."},
  {name:"sz", category:"Transfer", description:"Zmodem send (legacy).", usage:"sz file", example:"sz file", tip:"Requires zmodem on both ends."},
  {name:"rz", category:"Transfer", description:"Zmodem receive (legacy).", usage:"rz", example:"rz", tip:"Useful with serial/terminal transfers."},

  /* Final batch to reach comfortable 200+ */
  {name:"arpwatch", category:"Monitoring", description:"Monitor ethernet/ip address pairings.", usage:"arpwatch [options]", example:"sudo arpwatch -i eth0", tip:"Logs ARP changes to detect spoofing."},
  {name:"sestatus", category:"Security", description:"Report SELinux status.", usage:"sestatus", example:"sestatus", tip:"Quick check whether SELinux is enabled."},
  {name:"getenforce", category:"Security", description:"Return SELinux mode.", usage:"getenforce", example:"getenforce", tip:"Enforcing/Permissive/Disabled."},
  {name:"setenforce", category:"Security", description:"Set SELinux mode.", usage:"sudo setenforce Enforcing|Permissive", example:"sudo setenforce 0", tip:"Temporary until reboot."},
  {name:"smbclient", category:"Networking", description:"SMB/CIFS client utilities.", usage:"smbclient //server/share -U user", example:"smbclient //host/share -U alice", tip:"Useful to access Windows shares."},
  {name:"mount.cifs", category:"Networking", description:"Mount a CIFS filesystem.", usage:"sudo mount -t cifs //server/share /mnt -o user=alice", example:"sudo mount -t cifs //10.0.0.5/share /mnt -o user=alice", tip:"Install cifs-utils."},
  {name:"rsync", category:"Transfer", description:"Fast, versatile file copy/sync tool.", usage:"rsync [options] src dest", example:"rsync -avz ~/site/ remote:/var/www/", tip:"--delete mirrors deletion from source to dest."},
  {name:"pv", category:"Transfer", description:"Monitor data through a pipe.", usage:"pv file | command", example:"pv big.iso | dd of=/dev/sdb", tip:"Shows progress, ETA and throughput."},
  {name:"dd", category:"Transfer", description:"Convert and copy a file at block level.", usage:"dd if=src of=dest [options]", example:"sudo dd if=/dev/sda of=/dev/sdb bs=64K conv=noerror,sync", tip:"Dangerous if used incorrectly; double-check targets."},
  {name:"sync", category:"Transfer", description:"Flush filesystem buffers.", usage:"sync", example:"sync", tip:"Helps ensure data is written to disk."},
  {name:"hdparm", category:"Disk", description:"Get/set SATA/ATA drive parameters.", usage:"sudo hdparm -I /dev/sda", example:"sudo hdparm -tT /dev/sda", tip:"Be careful with power management settings."},
  {name:"smartctl", category:"Disk", description:"Control and monitor SMART disks.", usage:"sudo smartctl -a /dev/sda", example:"sudo smartctl -H /dev/sda", tip:"Good for early signs of disk failure."},
  {name:"blkdiscard", category:"Disk", description:"Discard sectors on a block device.", usage:"sudo blkdiscard /dev/sdX", example:"sudo blkdiscard /dev/sdb", tip:"Used for SSD secure erase / zeroing."}
];

/* Ensure uniqueness by name if duplicates exist - not required but helpful */

/* --------------- App Logic --------------- */

const state = {
  commands: COMMANDS,
  filtered: COMMANDS,
  categories: [],
  theme: localStorage.getItem('lm_theme') || 'dark'
};

const el = {
  grid: document.getElementById('grid'),
  search: document.getElementById('search'),
  clearSearch: document.getElementById('clearSearch'),
  panel: document.getElementById('panel'),
  closePanel: document.getElementById('closePanel'),
  cmdName: document.getElementById('cmd-name'),
  cmdCategory: document.getElementById('cmd-category'),
  cmdDesc: document.getElementById('cmd-desc'),
  cmdUsage: document.getElementById('cmd-usage'),
  cmdExample: document.getElementById('cmd-example'),
  cmdTip: document.getElementById('cmd-tip'),
  copyExample: document.getElementById('copyExample'),
  themeToggle: document.getElementById('themeToggle'),
  randomBtn: document.getElementById('randomBtn'),
};

/* Build categories list from commands */
function buildCategories(){
  const map = {};
  state.commands.forEach(c => {
    if(!map[c.category]) map[c.category] = [];
    map[c.category].push(c);
  });
  state.categories = Object.keys(map).sort().map(k => ({name:k, items: map[k].sort((a,b)=>a.name.localeCompare(b.name))}));
}

/* Render grid */
function renderGrid(){
  el.grid.innerHTML = '';
  const searchTerm = el.search.value.trim().toLowerCase();

  state.categories.forEach(cat => {
    // Filter commands in category by current search
    const items = cat.items.filter(cmd => {
      if(!searchTerm) return true;
      return cmd.name.toLowerCase().includes(searchTerm)
          || cmd.category.toLowerCase().includes(searchTerm)
          || cmd.description.toLowerCase().includes(searchTerm)
          || cmd.usage.toLowerCase().includes(searchTerm)
          || cmd.example.toLowerCase().includes(searchTerm)
          || (cmd.tip && cmd.tip.toLowerCase().includes(searchTerm));
    });
    if(items.length === 0) return; // hide category if no matches

    const card = document.createElement('div');
    card.className = 'card';
    const h3 = document.createElement('h3');
    h3.innerHTML = `<span>${escapeHtml(cat.name)}</span><span class="count">${items.length}</span>`;

    card.appendChild(h3);

    const cmdsWrap = document.createElement('div');
    cmdsWrap.className = 'commands';
    items.forEach(cmd => {
      const c = document.createElement('div');
      c.className = 'cmd';
      c.dataset.name = cmd.name;

      // Highlight search matches in name and description
      const nameHtml = highlight(cmd.name, searchTerm);
      const metaHtml = highlight(cmd.description, searchTerm);

      c.innerHTML = `<div class="name">${nameHtml}</div><div class="meta">${metaHtml}</div>`;
      c.title = cmd.description || '';

      c.addEventListener('click', ()=>openPanel(cmd));
      cmdsWrap.appendChild(c);
    });

    // Toggle open on header click
    h3.style.cursor = 'pointer';
    h3.addEventListener('click', ()=>{
      const isOpen = card.classList.toggle('open');
      // ensure only height is adjusted by CSS transitions
    });

    card.appendChild(cmdsWrap);
    el.grid.appendChild(card);
  });
}

/* Helper: escape HTML */
function escapeHtml(str){
  return str.replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
}

/* Highlight search term inside text, return HTML */
function highlight(text, term){
  if(!term) return escapeHtml(text);
  const escapedTerm = escapeRegex(term);
  const re = new RegExp(`(${escapedTerm})`, 'ig');
  return escapeHtml(text).replace(re, '<span class="highlight">$1</span>');
}
function escapeRegex(s){return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');}

/* Open side panel with command detail */
function openPanel(cmd){
  el.cmdName.textContent = cmd.name;
  el.cmdCategory.textContent = cmd.category;
  el.cmdDesc.textContent = cmd.description || '';
  el.cmdUsage.textContent = cmd.usage || '';
  el.cmdExample.textContent = cmd.example || '';
  el.cmdTip.textContent = cmd.tip || '';
  el.panel.classList.add('open');
}

/* Close panel */
el.closePanel.addEventListener('click', ()=>el.panel.classList.remove('open'));

/* Copy example to clipboard */
el.copyExample.addEventListener('click', ()=>{
  const text = el.cmdExample.textContent || '';
  navigator.clipboard.writeText(text).then(()=>{
    el.copyExample.textContent = 'Copied ✓';
    setTimeout(()=> el.copyExample.textContent = 'Copy', 1500);
  }).catch(()=>{
    alert('Unable to copy — your browser may block clipboard access.');
  });
});

/* Search handling */
function handleSearch(){
  const q = el.search.value.trim().toLowerCase();
  if(q){
    el.clearSearch.style.visibility = 'visible';
  } else {
    el.clearSearch.style.visibility = 'hidden';
  }
  renderGrid();
}

/* Clear search */
el.clearSearch.addEventListener('click', ()=>{
  el.search.value = '';
  handleSearch();
});

/* Theme handling */
function applyTheme(){
  const root = document.documentElement;
  if(state.theme === 'light'){
    document.body.classList.add('light');
    el.themeToggle.textContent = '🌞';
  } else {
    document.body.classList.remove('light');
    el.themeToggle.textContent = '🌙';
  }
  localStorage.setItem('lm_theme', state.theme);
}
el.themeToggle.addEventListener('click', ()=>{
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  applyTheme();
});

/* Random command card */
el.randomBtn.addEventListener('click', ()=>{
  const arr = state.filtered.length ? state.filtered : state.commands;
  const random = arr[Math.floor(Math.random() * arr.length)];
  openPanel(random);
});

/* Live search event */
el.search.addEventListener('input', ()=> {
  handleSearch();
});

/* Show/hide clear icon initially */
el.clearSearch.style.visibility = el.search.value ? 'visible' : 'hidden';

/* Setup on load */
function init(){
  buildCategories();
  // initial filtered = all commands
  state.filtered = state.commands.slice();
  applyTheme();
  renderGrid();

  // Keyboard: press / to focus search
  window.addEventListener('keydown', (e)=>{
    if(e.key === '/' && document.activeElement !== el.search){
      e.preventDefault();
      el.search.focus();
      el.search.select();
    }
    if(e.key === 'Escape'){
      el.panel.classList.remove('open');
    }
  });

  // Make search also filter state.filtered for random selection
  el.search.addEventListener('input', ()=>{
    const term = el.search.value.trim().toLowerCase();
    state.filtered = state.commands.filter(cmd=>{
      if(!term) return true;
      return cmd.name.toLowerCase().includes(term)
          || cmd.category.toLowerCase().includes(term)
          || cmd.description.toLowerCase().includes(term)
          || cmd.usage.toLowerCase().includes(term)
          || (cmd.example && cmd.example.toLowerCase().includes(term))
          || (cmd.tip && cmd.tip.toLowerCase().includes(term));
    });
  });

  // Random "Command of the Day" tile appended to top left
  const randIndex = Math.floor(Math.random() * state.commands.length);
  const randCmd = state.commands[randIndex];
  const randCard = document.createElement('div');
  randCard.className = 'card';
  randCard.innerHTML = `<h3>Random Command <span class="count">1</span></h3>
    <div class="commands" style="opacity:1; max-height:200px; margin-top:8px;">
      <div class="cmd" title="Random command of the day">
        <div class="name">${escapeHtml(randCmd.name)}</div>
        <div class="meta">${escapeHtml(randCmd.description)}</div>
      </div>
      <div style="margin-top:8px; display:flex; gap:8px;">
        <button id="openRandom" class="copy-btn" style="background:var(--accent)">Open</button>
        <button id="copyRandom" class="copy-btn">Copy Example</button>
      </div>
    </div>`;
  el.grid.prepend(randCard);
  randCard.querySelector('.cmd').addEventListener('click', ()=>openPanel(randCmd));
  document.getElementById('openRandom').addEventListener('click', ()=>openPanel(randCmd));
  document.getElementById('copyRandom').addEventListener('click', ()=>{
    navigator.clipboard.writeText(randCmd.example || randCmd.usage || randCmd.name).then(()=> {
      document.getElementById('copyRandom').textContent = 'Copied ✓';
      setTimeout(()=> document.getElementById('copyRandom').textContent = 'Copy Example', 1400);
    });
  });
}

/* Initialize app */
init();
