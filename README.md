
# Setup
Api Keys are stored in **Shared-MyoMunchee** folder in LastPass
Now using node version v16.20.2 seems to be the most stable for stencil
1. Run `npm install -g @bigcommerce/stencil-cli@6.1.1` 
2. Run `npm install`
3. Run `stencil init` to setup config
   * Store homepage url: https://myomunchee.com/
   * Access Token: See LastPass **'Myo Stencil API Key'**
   * Port 3000 
4. Run `stencil start` to start project 

# Deployment
The easiest way to deploy changes is via the 'stencil push' command 
* Saving and updating in the ‘page builder’ web app will update the site
* Updating widgets in the widget builder or the widget API will update the live site
* Pushing the theme via the Stencil CLI will update the site theme
* ‘Edit Theme Files’ in Big Commerce will update the site theme

| Command  | Description                                                                                                                                                                                          |
|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| init     | Interactively creates a `.stencil` file or `secrets.stencil.json` and `config.stencil.json` files (if using Stencil V3.1 release or later), which configures how to run a BigCommerce store locally. |
| start    | Starts up the BigCommerce storefront local development environment, using theme files in the current directory and data from the live store.                                                         |
| bundle   | Bundles up the theme into a structured `.zip` file, which can be uploaded to BigCommerce.                                                                                                            |
| pull     | Pulls the configuration from the active theme on your live store and updates your local configuration.                                                                                               |
| download | Downloads the theme files from the active theme on your live store, overwriting local files if desired.                                                                                              |
| push     | Bundles the theme into a `.zip` file; then directly uploads the `.zip` to BigCommerce.                                                                                                               |
| release  | Creates a new release in a theme's GitHub repository.                                                                                                                                                |
| help     | Displays help and returns all the options available to use for the specified command.                                                                                                                |

# Additional Information 
Most of the page is built using widgets. Widgets populate regions on the page.

* [Widget Builder](https://developer.bigcommerce.com/api-docs/store-management/widgets/widget-builder) for building widgets locally and update/creating new widgets
* [Widgets API](https://developer.bigcommerce.com/api-docs/store-management/widgets/widgets-overview) for getting existing widgets
* [Widgets Bitbucket Repo](https://bitbucket.org/mudbath/myo-munchee-widgets/src/master/)

**Correct Node version TBD** - Currently errors in console. Node 14 seems to be stable

# Cornerstone
[![Build Status](https://travis-ci.org/bigcommerce/cornerstone.svg?branch=master)](https://travis-ci.org/bigcommerce/cornerstone)

Stencil's Cornerstone theme is the building block for BigCommerce theme developers to get started quickly developing premium quality themes on the BigCommerce platform.

### Stencil Utils
[Stencil-utils](https://github.com/bigcommerce/stencil-utils) is our supporting library for our events and remote interactions.

## JS API
When writing theme JavaScript (JS) there is an API in place for running JS on a per page basis. To properly write JS for your theme, the following page types are available to you:

* "pages/account/addresses"
* "pages/account/add-address"
* "pages/account/add-return"
* "pages/account/add-wishlist"
* "pages/account/recent-items"
* "pages/account/download-item"
* "pages/account/edit"
* "pages/account/return-saved"
* "pages/account/returns"
* "pages/account/payment-methods"
* "pages/auth/login"
* "pages/auth/account-created"
* "pages/auth/create-account"
* "pages/auth/new-password"
* "pages/blog"
* "pages/blog-post"
* "pages/brand"
* "pages/brands"
* "pages/cart"
* "pages/category"
* "pages/compare"
* "pages/errors"
* "pages/gift-certificate/purchase"
* "pages/gift-certificate/balance"
* "pages/gift-certificate/redeem"
* "global"
* "pages/home"
* "pages/order-complete"
* "pages/page"
* "pages/product"
* "pages/search"
* "pages/sitemap"
* "pages/subscribed"
* "pages/account/wishlist-details"
* "pages/account/wishlists"

These page types will correspond to the pages within your theme. Each one of these page types map to an ES6 module that extends the base `PageManager` abstract class.

```javascript
    export default class Auth extends PageManager {
        constructor() {
            // Set up code goes here; attach to internals and use internals as you would 'this'
        }
    }
```

### JS Template Context Injection
Occasionally you may need to use dynamic data from the template context within your client-side theme application code.

Two helpers are provided to help achieve this.

The inject helper allows you to compose a JSON object with a subset of the template context to be sent to the browser.

```
{{inject "stringBasedKey" contextValue}}
```

To retrieve the parsable JSON object, just call `{{jsContext}}` after all of the `{{@inject}}` calls.

For example, to setup the product name in your client-side app, you can do the following if you're in the context of a product:

```html
{{inject "myProductName" product.title}}

<script>
// Note the lack of quotes around the jsContext handlebars helper, it becomes a string automatically.
var jsContext = JSON.parse({{jsContext}}); // jsContext would output "{\"myProductName\": \"Sample Product\"}" which can feed directly into your JavaScript

console.log(jsContext.myProductName); // Will output: Sample Product
</script>
```

You can compose your JSON object across multiple pages to create a different set of client-side data depending on the currently loaded template context.

The stencil theme makes the jsContext available on both the active page scoped and global PageManager objects as `this.context`.

## Polyfilling via Feature Detection
Cornerstone implements [this strategy](https://philipwalton.com/articles/loading-polyfills-only-when-needed/) for polyfilling.

In `templates/components/common/polyfill-script.html` there is a simple feature detection script which can be extended to detect any recent JS features you intend to use in your theme code.

If any one of the conditions is not met, an additional blocking JS bundle configured in `assets/js/polyfills.js` will be loaded to polyfill modern JS features before the main bundle executes. 

This intentionally prioritizes the experience of the 90%+ of shoppers who are on modern browsers in terms of performance, while maintaining compatibility (at the expense of additional JS download+parse for the polyfills) for users on legacy browsers.

## Static assets
Some static assets in the Stencil theme are handled with Grunt if required. This
means you have some dependencies on grunt and npm. To get started:

First make sure you have Grunt installed globally on your machine:

```
npm install -g grunt-cli
```

and run:

```
npm install
```

Note: package-lock.json file was generated by Node version 10 and npm version 6.11.3. The app supports Node 10 as well as multiple versions of npm, but we should always use those versions when updating package-lock.json, unless it is decided to upgrade those, and in this case the readme should be updated as well. If using a different version for node OR npm, please delete the package-lock.json file prior to installing node packages and also prior to pushing to github.

If updating or adding a dependency, please double check that you are working on Node version 10 and npm version 6.11.3 and run ```npm update <package_name>```  or ```npm install <package_name>``` (avoid running npm install for updating a package). After updating the package, please make sure that the changes in the package-lock.json reflect only the updated/new package prior to pushing the changes to github.


### Icons
Icons are delivered via a single SVG sprite, which is embedded on the page in
`templates/layout/base.html`. It is generated via a grunt task `grunt svgstore`.

The task takes individual SVG files for each icon in `assets/icons` and bundles
them together, to be inlined on the top of the theme, via an ajax call managed
by svg-injector. Each icon can then be called in a similar way to an inline image via:

```
<svg><use xlink:href="#icon-svgFileName" /></svg>
```

The ID of the SVG icon you are calling is based on the filename of the icon you want,
with `icon-` prepended. e.g. `xlink:href="#icon-facebook"`.

Simply add your new icon SVG file to the icons folder, and run `grunt svgstore`,
or just `grunt`.

#### License

(The MIT License)
Copyright (C) 2015-present BigCommerce Inc.
All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
