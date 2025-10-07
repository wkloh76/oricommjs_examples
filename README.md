# OriCommJS_Examples

![Static Badge](https://img.shields.io/badge/License-MIT-_)
![Static Badge](https://img.shields.io/badge/Framework-OriCommJS_1.2.3-_)
![Static Badge](https://img.shields.io/badge/Framework-OriCommJS_v2_1.0.6-_)
![GitHub Release](https://img.shields.io/github/v/release/wkloh76/oricommjs_components)

This code examples for oricommjs components which will work close with oricommjs engine, utils and atomic modules. 

## Objective

- The project splitly from oricommjs_components and here will keep updating for teach how to purpose apply oricommjs frame into your project repository.

## Startup

### Setup

1. Download the project and copy to your which already have oricommjs framework and oricommjs_components project folders structure.
2. Rename the project and add prefix show as below:

   - `app_` for non-GUI application.
   - `web_` for web application.
   - `desktop_` for desktop application.

3. For web server design,copy [web.toml.example][coresetting-web] file and rename to `coresetting.toml`.

4. For desktop application design,copy [desktop.toml.example][coresetting-desktop] file and rename to `coresetting.toml`.

### Start coding

1. Web server and desktop coding, please start your into startup,common,api,gui,rules folders.
   - startup - Initialize such as db connection,data import/export,backend service.
   - common/models - The code in here allow to directlly apply from gui,api and rules.
   - api - Handle all web api request and will render data in text,json and etc.
   - gui - Handle browser request and will render html statement if success.
   - rules - Define for pre and post process for api and gui.

# Notice

- All url name will start from components naming,second from folder naming (inside gui and api folder) and continue with controller naming. Example: gui/testapi/index.js the url should be `/oricommjs_components/testapi/test`.

# Status

- Web server -- tested with webnodejs.
- Desktop Application -- done

# License

OriCommJS_Components is freely distributable under the terms of the [MIT][license-url].

[license-url]: LICENSE
[coresetting-web]: web.toml.example
[coresetting-desktop]: desktop.toml.example
