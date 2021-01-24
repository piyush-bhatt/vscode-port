import * as vscode from 'vscode';
import { Server } from 'net';
const exec = require('child_process').execSync;

export const getAvailablePort = (port: string): Promise<number> => {
  return new Promise(async (resolve) => {
    if (port == '') {
      resolve(randomAvailablePort());
    } else {
      if (await isPortAvailable(parseInt(port))) {
        resolve(parseInt(port));
      } else {
        resolve(randomAvailablePort());
      }
    }
  });
};

export const killProcessOnPort = async (port: number): Promise<boolean> => {
  const os = process.platform;
  if (os == 'win32') {
    handleKillPortWindows(port);
  } else {
    handleKillPort(port);
  }
  await sleep(10);
  return isPortAvailable(port);
};

const isPortAvailable = async (port: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const server = new Server();
    server.once('error', function (err: any) {
      if (err.code === 'EADDRINUSE') {
        resolve(false);
      }
    });
    server.once('listening', function () {
      server.close();
      resolve(true);
    });
    server.listen(port);
  });
};

const randomAvailablePort = (): number => {
  const basePort = getBasePort();
  const highestPort = getHighestPort();
  const randomPort = random(basePort, highestPort);
  if (isPortAvailable(randomPort)) {
    return randomPort;
  } else {
    return randomAvailablePort();
  }
};

const handleKillPortWindows = async (port: number) => {
  const pid = getPIDWindows(port);
  if (pid !== null) {
    killPIDWindows(pid);
  }
};

const getPIDWindows = (port: number): number | null => {
  const output = exec(`netstat -ano | findstr :${port}`);
  const lines = output.split('\n');
  const lineWithLocalPortRegEx = new RegExp(`^ *TCP *[^ ]*:${port}`, 'gm');
  const linesWithLocalPort = lines.filter((line: string) => line.match(lineWithLocalPortRegEx));
  let pid = linesWithLocalPort[0].trim().split(/[\s, ]+/)[3];
  return pid ? parseInt(pid) : null;
};

const killPIDWindows = (pid: number) => {
  exec(`taskkill /PID ${pid} /F`);
};

const handleKillPort = (port: number) => {
  exec(`lsof -nti:${port} | xargs kill -9`);
};

const random = (min: number, max: number): number => {
  return Math.round(Math.random() * (max - min)) + min;
};

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const getBasePort = () => vscode.workspace.getConfiguration('port').get('basePort', 1024);

const getHighestPort = () => vscode.workspace.getConfiguration('port').get('highestPort', 65535);
