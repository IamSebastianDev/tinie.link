<!-- @format -->

# Get started with the development

Great that you want to contribute! Nice to have you onboard. 🚀 To get started, follow this contributing guideline to set up the project and work with us!

## Necessary Software & Tools

The following tools and software are necessary to develop this application:

| Name   | Version              | Link                                         |
| ------ | -------------------- | -------------------------------------------- |
| Bun    | Latest (recommended) | [Bun](https://bun.sh)                        |
| Docker | Latest               | [Docker](https://www.docker.com/get-started) |

After installing the necessary tools, you can run the commands below to start developing.

## Development - Setting Up The Repository

-   Clone the repository by running `git clone https://github.com/IamSebastianDev/tinie.link.git` in your terminal to clone the repo into the current directory.
-   Run `bun install` to install the dependencies.
-   Run `bun run setup`. This will install the necessary Husky scripts.

## Development - CLI Commands

-   `bun run preci`: Removes all files inside the node_modules folder. Is part of the repository setup.
-   `bun install --frozen-lockfile`: Installs all dependencies without generating a lockfile and throws an error if an update is needed.
-   `bun run setup`: Installs Husky and the hooks.
-   `bun run dev`: Build and start the library in development mode, watching for changes.
-   Each microservice (client, server, worker) can be started with its respective `start` command as defined in `package.json`.
-   `bun run docker:build`: Builds the Docker image for the web server.
-   Database migrations can be run locally or within Docker using the `db:migrate:local` and `db:migrate:docker` commands, respectively.
-   Docker services can be managed with the `db:up`, `db:down`, `system:up`, and `system:down` commands.
-   `bun run lint`: Runs [alex](https://alexjs.com) as linter.
-   Tests should be written in TypeScript and are run with `bun test`.

## Development - Enforcing Code Standards

This project uses multiple tools to enforce code quality:

### Conventional commits

The project uses [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) to ensure a certain commit message style.

-   `feat`: Used when adding features to the application.
-   `fix`: Used when fixing a bug or issue.
-   `refactor`: Used when changing or improving code that is not a new feature or bug.
-   `chore`: Used when updating non application related code.

### Formatting

The project uses prettier to format the code to conform to a certain style. Formatting is enforced using [pretty-quick](https://www.npmjs.com/package/pretty-quick) as a pre-commit hook.

## Development - Git Structure

To develop a feature, checkout a new Branch from `development` and prefix it with the correct branch type. The project currently differentiates between two branch types, `feat` and `fix`. For example, a branch to fix a bug would be created like this:

```bash
$ git checkout development
# checkout development as basis for development
$ git checkout -b bugfix/bug-to-fix
# creates a new branch with the correct branch type prefixed
```

## Development - Github Actions

-   Publish: A set of automatic actions that is triggered when merging into the `main` branch. This will publish and deploy the worker to Cloudflare and the server to Render.com.
