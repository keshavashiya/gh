# GitHub Activity CLI

This CLI tool allows users to fetch and display recent GitHub activity for a specified user. It supports various event types such as pushes, issues, stars, forks, and pull requests. The tool is built using Node.js and leverages the GitHub API to fetch user activity. https://roadmap.sh/projects/github-user-activity.

You can run the CLI tool directly using `npx` without installing it globally:

```sh
npx @keshavashiya/gh <username>
```

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/keshavashiya/gh.git
   cd gh
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Make the CLI executable globally:
   ```sh
   npm link
   ```

## Usage

To fetch and display recent GitHub activity for a user, run the following command:

```sh
gh-cli <username>
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
