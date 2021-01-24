import * as vscode from 'vscode';
import { getAvailablePort, killProcessOnPort } from './util';

export function activate(context: vscode.ExtensionContext) {
  const disposables: vscode.Disposable[] = [];
  disposables.push(
    vscode.commands.registerCommand('port.availablePort', async () => {
      const portNumber = await vscode.window.showInputBox({
        prompt: 'Enter a port number to check availability or get a random available port',
        validateInput: (value: string) => {
          if (value !== '') {
            return parseInt(value) >= 0 && parseInt(value) <= 65535 ? '' : 'Enter a valid number between 0 - 65535';
          } else {
            return '';
          }
        },
      });
      const availablePort = await getAvailablePort(portNumber!);
      if (portNumber !== undefined) {
        let message;
        if (portNumber === '') {
          message = `Available Port: ${availablePort}`;
        } else {
          const port = parseInt(portNumber!);
          if (port == availablePort) {
            message = `Port ${port} is available`;
          } else {
            message = `Port ${port} is unavailable. Available Port: ${availablePort}`;
          }
        }
        vscode.window.showInformationMessage(message);
      }
    }),
  );
  disposables.push(
    vscode.commands.registerCommand('port.killPort', async () => {
      const portNumber = await vscode.window.showInputBox({
        prompt: 'Enter a port number to kill process on',
        validateInput: (value: string) => {
          return parseInt(value) >= 0 && parseInt(value) <= 65535 ? '' : 'Enter a valid number between 0 - 65535';
        },
      });
      if (portNumber !== undefined) {
        const isKilledSuccessfully = await killProcessOnPort(parseInt(portNumber));
        const message = isKilledSuccessfully
          ? `Process killed on Port ${portNumber}`
          : `Unable to kill process on Port ${portNumber}`;
        vscode.window.showInformationMessage(message);
      }
    }),
  );
  context.subscriptions.push(...disposables);
}

export function deactivate() {}
