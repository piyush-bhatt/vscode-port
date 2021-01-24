<p align="center">
  <img src="https://raw.githubusercontent.com/piyush-bhatt/vscode-port/main/media/icon/icon.png" alt="Port Logo" /></a>
</p>

> [Port](https://marketplace.visualstudio.com/items?itemName=piyush-bhatt.port) helps you **check availability** of a port, get an **available port**, or **kill running process** on a port from Visual Studio Code itself.

# Features

### Check Availability

Check if a port is available or free. If the port is occupied or no port number is provided in input, a random available port is returned based on the _Base Port_ and _Highest Port_ set in the `Settings`.

### Kill Process

Kill a running process on a port.

# Settings

Following settings are available for the extension to get a port within a desirable range,

- **Base Port:** Base Port to search an available port from. Defaults to `1024`
- **Highest Port:** Highest Port to search an available port till. Defaults to `65535`

# Usage

Here's an example for checking availability of port 4000 and killing the process running on it to make it available.

<p align="center">
  <img src="https://raw.githubusercontent.com/piyush-bhatt/vscode-port/main/media/readme/Check_And_Kill_Port.gif" alt="Check And Kill Port" />
</p>

# Acknowledgement

Logo created at [LogoMakr](https://my.logomakr.com).

# License

[MIT](https://raw.githubusercontent.com/piyush-bhatt/vscode-port/main/LICENSE) licensed.
