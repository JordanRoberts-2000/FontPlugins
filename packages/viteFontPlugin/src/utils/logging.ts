import chalk from "chalk";

class PluginLog {
  static error(message: string): void {
    console.error(chalk.bgRed.white(`[@strawr/vite-font-plugin] - ${message}`));
  }

  static warn(message: string): void {
    console.warn(chalk.yellow(`[@strawr/vite-font-plugin] - ${message}`));
  }

  static info(message: string): void {
    console.log(`[@strawr/vite-font-plugin] - ${message}`);
  }
}

export default PluginLog;
