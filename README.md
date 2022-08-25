# Convert a React App into a Progressive Web App (PWA)

In addition to behave as a Web App, A Progressive Web App (PWA) can also be accessed offline after the first access with network connection, which would make it cached in your device. You may add it to the home screen of your device as a launch icon (this is called PWA installation that makes its access similar to installed native mobile app).

You may convert an existing React Web App into a PWA through the following steps (lets take the [TicTacToe Web app](https://github.com/wadehonda/tictactoe/tree/master) as an example):

1. Create a React App with a PWA Template:

`npx create-react-app tictactoe-pwa --template cra-template-pwa`

2. Register a Service Worker

   The React app created with the above mentioned template has a `service-worker.js` in the root directory. You can register the service worker by changing the statement of `serviceWorker.unregister()` to `serviceWorker.register()` in the `index.js` file in the root directory.

3. Configure the Web Application Manifest

   In the `public` directory, there is a `manifect.json` file, we may modify it with our own app name and our needed configurations, e.g.,

   ```
    {
      "short_name": "tictactoe-pwa",
      "name": "tictactoe-pwa",
      "icons": [
        {
          "src": "favicon.ico",
          "sizes": "64x64 32x32 24x24 16x16",
          "type": "image/x-icon"
        },
      ],
      "start_url": ".",
      "display": "fullscreen",
      "theme_color": "#000000",
      "background_color": "#ffffff"
    }
   ```

   The `fullscreen` value of the `display` property makes the app running in fullscreen mode with a native app look-and-feel, without the browser UI elements like an address bar.

4. Copy the Code of an Existing App into this New App

   In this case, you may paste the tictactoe code into the `App.js` file; and paste the `CSS` style code of the game into `index.css`. As the game code used two react icons, you need to add this library into the project dependency:

   `npm install react-icons --save`

5. Now, You Can Build the PWA:

   `npm run build`

   The build folder is now ready to be deployed.

6. You may Test the PWA App with a Static Server:

   `serve -s build`

   You may try the PWA app at [https://wadehonda.github.io/tictactoe-pwa/](https://wadehonda.github.io/tictactoe-pwa/)

7. You may Analyse the PWA App using Chrome DevTools

   You may analyse the performance, accessibility, best practices, SEO, and PWA aspects of your app using the Chrome DevTools by selecting the `Inspect` option from the right-click menu, and then selecting the `Lighthouse` tab (more tabs in the Inspect window can be found by clicking on `>>` tab), selecting the `Navigation` mode and `Mobile` device, making all the categories in Lighthouse window ticked, and then clicking `Analyze page load` button. A report with scores on all the checked categories will be displayed. You may modify your app based on the feedback to improve it in multiple refinement and analysis cycles.

   To learn more, visit [https://cra.link/PWA](https://cra.link/PWA)
