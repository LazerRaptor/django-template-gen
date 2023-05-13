## Django template generator

Create Django template files in a node.js environment.

Create a `homepage.js` file in the `src/pages/` directory and a `button.js` file in the `src/components` directory:
![image](https://github.com/LazerRaptor/django-template-gen/assets/45490518/f52ff9dd-4d97-4f63-9a85-54001cc3aba9)

Running `pnpm dev` will create a js bundle and a Django template called `homepage.html` in your `TEMPLATE_DIR`.

This is what you'll see in the browser:
![image](https://github.com/LazerRaptor/django-template-gen/assets/45490518/4b7dab0a-9202-430d-b82b-590f2d9d28de)

| :exclamation:  This is work in progress and not suitable for use in real projects  |
|------------------------------------------------------------------------------------|

### Installation
1. Clone the repo: `git clone https://github.com/LazerRaptor/django-template-gen.git` 
2. Go to the root dir and install python dependencies: `pip install -r requirements.txt`
3. Go to the /static dir and install node dependencies: `pnpm install`


### Available scripts
- Run `pnpm dev` to start Rollup.js bundler in the watch mode.
- Run `pnpm tailwind` to scan your CSS in the watch mode.
