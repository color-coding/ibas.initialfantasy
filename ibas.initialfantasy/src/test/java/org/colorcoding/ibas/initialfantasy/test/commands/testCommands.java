package org.colorcoding.ibas.initialfantasy.test.commands;

import java.io.File;
import java.util.ArrayList;

import org.colorcoding.ibas.initialfantasy.Console;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;
import org.colorcoding.ibas.initialfantasy.commands.Command4Init;

import junit.framework.TestCase;

public class testCommands extends TestCase {

	public void testInit() {
		ArrayList<String> args = new ArrayList<>();
		args.add(String.format(Command4Init.COMMAND_PROMPT)); // 命令
		args.add(String.format("-config=%s", MyConfiguration.getWorkFolder() + File.separator + "app.xml"));
		Console.main(args.toArray(new String[] {}));
	}
}
