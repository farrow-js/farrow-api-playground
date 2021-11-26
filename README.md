# farrow-api-playground

Playground for farrow-api.

## Contributing Guide

### Developing

To develop locally:

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your
   own GitHub account and then
   [clone](https://help.github.com/articles/cloning-a-repository/) it to your
   local.
2. Create a new branch:

   ```zsh
   git checkout -b MY_BRANCH_NAME
   ```

3. Install pnpm:

   ```zsh
   npm install -g pnpm
   ```

4. Install the dependencies with:

   ```zsh
   pnpm install
   ```

5. Go into package which you want to contribute.

   ```zsh
   cd ./packages/*
   ```

6. Start developing.

  If you want to develop `farrow-api-playground-react`, you can build at `farrow-api-playground-react` with watch mode. And run `pnpm run dev` at `farrow-api-playground-html`. So you can develop both of them.
