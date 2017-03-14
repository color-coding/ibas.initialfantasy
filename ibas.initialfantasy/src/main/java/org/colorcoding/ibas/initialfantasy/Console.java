package org.colorcoding.ibas.initialfantasy;

import org.colorcoding.ibas.bobas.commands.CommandsManager;
import org.colorcoding.ibas.initialfantasy.commands.Command4Init;

/**
 * 命令控制台
 * 
 * @author Niuren.Zhu
 *
 */
public class Console {
	private volatile static CommandsManager commandsManager;

	protected synchronized static CommandsManager getCommandsManager() {
		if (commandsManager == null) {
			synchronized (Console.class) {
				if (commandsManager == null) {
					commandsManager = new CommandsManager();
					// 注册发布的命令
					commandsManager.register(Command4Init.class);
				}
			}
		}
		return commandsManager;
	}

	public static void main(String[] args) {
		getCommandsManager().run(args);
	}
}
