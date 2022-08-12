import * as vscode from 'vscode';
import * as child_process from 'child_process';

export function activate(context: vscode.ExtensionContext) {
	let outputChannel: vscode.OutputChannel;
	let process: child_process.ChildProcess | null;

	const setupOutputChannel = () => {
		if (outputChannel)
			return;

		outputChannel = vscode.window.createOutputChannel('Make Results');
		outputChannel.clear();
	}

	const cancel = async () => {
		if (!process)
			return;

		setupOutputChannel();

		if (!process.kill() && !process.kill('SIGKILL')) {
			const message = `Cannot kill PID: ${process.pid}`;

			outputChannel.show(false);
			outputChannel.appendLine(message);
			vscode.window.showErrorMessage(`Makefile: ${message}`);
		} else {
			outputChannel.show(true);
			outputChannel.appendLine(`Killed PID: ${process.pid}`);
		}
	};

	const run = (cmd: string) => async () => {
		if (process)
			cancel();

		setupOutputChannel();
		outputChannel.clear();

		const dir = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
		await vscode.commands.executeCommand('workbench.action.files.saveAll');

		process = child_process.exec(cmd,
			{
				cwd: dir,
			},
			(_error, stdout, stderr) => {
				outputChannel.show(true);
				if (stdout)
					outputChannel.append(stdout);
				if (stderr)
					outputChannel.append(stderr);
				process = null;
			});
	};



	context.subscriptions.push(
		vscode.commands.registerCommand('jlw-makefile.build', run('make')),
		vscode.commands.registerCommand('jlw-makefile.rebuild', run('make clean && make')),
		vscode.commands.registerCommand('jlw-makefile.cancel', cancel),
	);
}

export function deactivate() { }
