import path from 'path';

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames.map((f) => path.relative(process.cwd(), f)).join(' ')}`;

export default {
  '*.{js,jsx,ts,tsx}': (filenames) => [
    buildEslintCommand(filenames),
    `prettier --write ${filenames.join(' ')}`,
  ],
  '*.{css,scss,md}': ['prettier --write'],
};
