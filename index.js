#!/usr/bin/env node

import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import { execSync } from 'child_process';
import ora from 'ora';
import boxen from 'boxen';
// import figlet from 'figlet';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Display ASCII art
console.log("Need to install the following packages:");
console.log("@atul.dev/create-new-project");
console.log("");



// Main function
(async () => {
  try {
    // Collect project information
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'project',
        message: 'Select project type:',
        choices: [
          { name: 'Create Express Api', value: 'create-express-api' },
          { name: 'Coming Soon...', value: 'coming-soon' }
        ],
        default: 'create-express-api'
      },
      {
        type: 'input',
        name: 'projectName',
        message: 'Project name:',
        default: 'my-express-api',
        validate: input => input.trim() !== '' ? true : 'Project name is required'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Project description:',
        default: 'A modern Express.js API'
      },
      // {
      //   type: 'list',
      //   name: 'database',
      //   message: 'Select database:',
      //   choices: [
      //     { name: 'MongoDB', value: 'mongodb' },
      //     { name: 'None (add later)', value: 'none' }
      //   ],
      //   default: 'mongodb'
      // },
      // {
      //   type: 'confirm',
      //   name: 'authentication',
      //   message: 'Include authentication?',
      //   default: true
      // },

      {
        type: 'list',
        name: 'packageManager',
        message: 'Select package manager:',
        choices: ['npm', 'yarn'],
        default: 'npm'
      }
    ]);

    const { project, projectName, description, packageManager } = answers;
    const targetPath = path.join(process.cwd(), projectName);

    // Check if directory already exists
    if (fs.existsSync(targetPath)) {
      const { overwrite } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'overwrite',
          message: `Directory ${projectName} already exists. Overwrite?`,
          default: false
        }
      ]);

      if (!overwrite) {
        console.log(chalk.yellow('\nOperation cancelled.'));
        return;
      }

      fs.removeSync(targetPath);
    }

    // Create project directory
    fs.ensureDirSync(targetPath);

    const spinner = ora('Creating project files...').start();

    //! Create Express Api  
    if (project === 'create-express-api') {
      // Copy create-express-api
      await fs.copy(path.join(__dirname, 'template/create-express-api'), targetPath);

      // Update package.json with project info
      const packageJsonPath = path.join(targetPath, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      packageJson.name = projectName;
      packageJson.description = description;

      // Write updated package.json
      fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(packageJson, null, 2)
      );

      // Create .env file from example
      fs.copyFileSync(
        path.join(targetPath, '.env.example'),
        path.join(targetPath, '.env')
      );
    } //! Coming Soon 
    else if (project === 'coming-soon') {
      const soonSpinner = ora('Coming Soon...').start();
      soonSpinner.succeed('Coming Soon!');
      process.exit(0);
    }

    spinner.succeed('Project files created');

    // Install dependencies
    const installSpinner = ora('Installing dependencies... This may take a few minutes').start();
    try {
      const installCmd = packageManager === 'npm' ? 'npm install' : 'yarn install';
      execSync(installCmd, { cwd: targetPath, stdio: 'pipe' });
      installSpinner.succeed('Dependencies installed');
    } catch (error) {
      installSpinner.fail('Failed to install dependencies');
      console.error(chalk.red(`\nError: ${error.message}`));
      console.log(chalk.yellow(`\nYou can try installing dependencies manually:\n\ncd ${projectName} && ${packageManager === 'npm' ? 'npm install' : 'yarn'}`));
    }

    // Success message
    console.log(
      boxen(
        chalk.green('🎉 Success! Your project is ready.') +
        '\n\n' +
        chalk.bold('Next steps:') +
        '\n\n' +
        chalk.cyan(`  cd ${projectName}`) +
        '\n' +
        chalk.cyan(`  ${packageManager === 'npm' ? 'npm run dev' : 'yarn dev'}`) +
        '\n\n' +
        chalk.bold('Available scripts:') +
        '\n\n' +
        chalk.cyan(`  ${packageManager === 'npm' ? 'npm run dev' : 'yarn dev'}`) + '       - Start development server' +
        '\n' +
        chalk.cyan(`  ${packageManager === 'npm' ? 'npm start' : 'yarn start'}`) + '     - Start production server' +
        '\n' +
        chalk.cyan(`  ${packageManager === 'npm' ? 'npm test' : 'yarn test'}`) + '      - Run tests' +
        '\n' +
        chalk.cyan(`  ${packageManager === 'npm' ? 'npm run lint' : 'yarn lint'}`) + '     - Run linter',
        {
          padding: 1,
          margin: 1,
          borderStyle: 'round',
          borderColor: 'green'
        }
      )
    );
  } catch (error) {
    console.error(chalk.red(`\nError: ${error.message}`));
    process.exit(1);
  }
})();
