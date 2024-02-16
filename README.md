# Webian Shell

A graphical shell for the web (touch version).

- [UI mockups](https://docs.google.com/presentation/d/e/2PACX-1vRW31WOIOGXZ97ni0-k_PAYwrkZbEam00LzKKF6eBtQHurT0HsIS8JF-ipRKqUPCwhjdbjBs9Wc7VtS/pub?start=false&loop=false&delayms=3000)


## Building & Running

To get started hacking on Webian Shell first make sure that you have [Git](https://git-scm.com/) installed.

Clone the repository from GitHub:

```
$ git clone https://github.com/webianproject/shell-touch.git
$ cd shell-touch
```

### Build for Linux desktop

To build for Linux desktop, first make sure that you have [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed.

We recommend using nvm to install the version of Node.js and npm listed in the .nvmrc file of this repository:

```
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
$ . ~/.bashrc
$ nvm install
$ nvm use
```

Install dependencies:
```
$ npm install
```

Start the application:
```
$ npm start
```

The shell should start up full screen.

## Packaging

### Package snap for current architecture

Make sure you have [snapcraft](https://snapcraft.io/snapcraft) installed.

```
$ snapcraft
```

### Package snap for other architectures
```
$ snapcraft remote-build
```

## Installing

### Install on Ubuntu Desktop

To install a self-built snap package on Ubuntu Desktop for testing:

- Install the ubuntu-frame and frame-it snaps to enable the application to access the display:

```
$ sudo snap install ubuntu-frame --channel=22
$ sudo snap install frame-it --classic
```

- Install the self-built Webian Shell Touch snap locally:

```
$ sudo snap install --dangerous webian-shell-touch_0.1.0_amd64.snap
```

- Configure the snap (needed to connect plugs whilst in development):

```
$ /snap/webian-shell-touch/current/bin/setup.sh
```

- Run the snap using frame-it:

```
$ frame-it webian-shell-touch
```

### Install on Ubuntu Core

To install a self-built snap package on Ubuntu Core:
- Follow the [instructions](https://ubuntu.com/download/raspberry-pi-core) to download, flash and configure Ubuntu Core on a Raspberry Pi and connect a display to the Pi
- Copy the built .snap package to the Raspberry Pi then SSH into it, using the IP address displayed on the screen and the username you assigned to your Ubuntu SSO account e.g.

```
$ scp webian-shell-touch_0.1.0_armhf.snap joebloggs@192.168.1.123:~/
$ ssh joebloggs@192.168.1.123
```

- Install the ubuntu-frame and avahi snaps on the device to enable access to the display and mDNS lookups:

```
$ snap install ubuntu-frame ubuntu-frame-osk avahi
```

- Install the webian-shell-touch snap:

```
$ snap install --dangerous webian-shell-touch_0.1.0_armhf.snap
```

- Run the snap:

```
$ sudo webian-shell-touch
```

The application should then start up full screen and load a https://webian.org if accessible.

## License

Webian Shell Touch is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Webian Shell is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Webian Shell in the LICENSE file. If not, see
<http://www.gnu.org/licenses/>.
