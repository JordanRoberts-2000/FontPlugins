import chalk from "chalk";
import { LOGGER_PREFIX } from "../constants.js";

class PluginLogger {
  static fatal(message: string): void {
    throw new Error(`${LOGGER_PREFIX}${message}`);
  }

  static error(message: string): void {
    console.error(chalk.bgRed.white(`${LOGGER_PREFIX}${message}`));
  }

  static warn(message: string): void {
    console.warn(chalk.yellow(`${LOGGER_PREFIX}${message}`));
  }

  static info(message: string): void {
    console.log(`${LOGGER_PREFIX}${message}`);
  }
}

export default PluginLogger;
