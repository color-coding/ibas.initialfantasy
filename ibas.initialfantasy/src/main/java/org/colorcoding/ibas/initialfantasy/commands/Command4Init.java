package org.colorcoding.ibas.initialfantasy.commands;

import org.colorcoding.ibas.bobas.commands.Argument;
import org.colorcoding.ibas.bobas.commands.Command;
import org.colorcoding.ibas.bobas.commands.Prompt;

/**
 * 初始化命令
 * 
 * @author Niuren.Zhu
 *
 */
@Prompt(Command4Init.COMMAND_PROMPT)
public class Command4Init extends Command<Command4Init> {

	/**
	 * 命令符
	 */
	public final static String COMMAND_PROMPT = "init";

	/**
	 * 返回值，200，转换错误
	 */
	public static final int RETURN_VALUE_TRANSFORM_FAILD = 200;

	public Command4Init() {
		this.setName(COMMAND_PROMPT);
		this.setDescription("根据模型创建数据结构。");
	}

	@Override
	protected Argument[] createArguments() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	protected boolean isRequiredArguments() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	protected int run(Argument[] arguments) {
		// TODO Auto-generated method stub
		return 0;
	}

}
