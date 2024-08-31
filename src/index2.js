import { PlaywrightCrawler, Dataset, RequestQueue } from "crawlee";
import { appendFile } from "fs/promises";
import { join } from "path";
import { chromium } from "playwright"; //EXAMPLE 3

// Start the web server first (or include this in your main script)
import http from "http";
import fs from "fs";
import path from "path";
import repl from "repl";

const server = http.createServer((req, res) => {
  fs.readFile(path.join(path.resolve(), "home.html"), (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("Error loading page");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
});

server.listen(8080, () => {
  console.log("Server running at http://localhost:8080/");
});

// PlaywrightCrawler crawls the web using a headless
// browser controlled by the Playwright library.
// const crawler = new PlaywrightCrawler({
//   // Use the requestHandler to process each of the crawled pages.
//   async requestHandler({ request, page, enqueueLinks, log }) {
//     const title = await page.title();
//     log.info(`Title of ${request.loadedUrl} is '${title}'`);

//     // Save results as JSON to ./storage/datasets/default
//     await Dataset.pushData({ title, url: request.loadedUrl });

//     // Extract links from the current page
//     // and add them to the crawling queue.
//     await enqueueLinks();
//   },
//   // Uncomment this option to see the browser window.
//   headless: false,
// });

//// EXAMPLE 2
// const crawler = new PlaywrightCrawler({
//   launchContext: {
//     launchOptions: {
//       headless: false, // Show the browser window
//     },
//   },
//   async requestHandler({ page }) {
//     await page.exposeFunction("runScript1", async () => {
//       console.log("Running Script 1");
//       // Your script 1 logic here
//     });

//     await page.exposeFunction("runScript2", async () => {
//       console.log("Running Script 2");
//       // Your script 2 logic here
//     });

//     await page.goto("http://localhost:8080", { waitUntil: "networkidle" });
//   },
// });

// async function logger(message) {
//   // Define the file path in the /tmp directory
//   const filePath = join("/tmp", "mylog.txt");

//   try {
//     // Append the message to the file, creating it if it doesn't exist
//     await appendFile(filePath, message + "\n");
//     console.log("Content successfully appended to file");
//   } catch (err) {
//     console.error("Error writing to file:", err);
//   }
// }

// (async () => {
//   const current_time = new Date().toISOString();
//   await logger("Starting the script index2" + current_time + "\n");
// })();

// crawler.run([{ url: "http://localhost:8080" }]);

// // Keep the script alive
// setInterval(() => {
//   console.log("Keeping the process alive...");
// }, 10000); // Logs a message every 10 seconds

//// EXAMPLE 3 -- stay alive
(async () => {
  let crawler;
  let queue;

  // Function to initialize or reset the request queue
  const initializeQueue = async () => {
    try {
      queue = new RequestQueue();
      await queue.empty();
    } catch (error) {
      console.error("Error initializing request queue:", error);
    }
  };

  // Function to start or restart the crawler
  const startCrawler = async (url) => {
    if (crawler) {
      console.log("Closing existing crawler...");
      await crawler.close();
    }

    await initializeQueue(); // Initialize or reset the request queue

    crawler = new PlaywrightCrawler({
      requestQueue: queue,
      requestHandler: async ({ page, request }) => {
        console.log(`Crawling URL: ${request.url}`);
        await page.goto(request.url, { waitUntil: "networkidle" });

        const links = await page.$$eval(
          'a[class="x1i10hfl xjbqb8w x1ejq31n xd10rxx x1sy0etr x17r0tee x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xt0psk2 xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz _a6hd"]',
          (els) => els.map((el) => el.getAttribute("href"))
        );

        links.forEach((el, i) => {
          if (i >= 1 && i < 12) {
            console.log(`CATEGORY_${i + 1}:`);
            console.log(el);
          }
        });

        // Optionally keep the browser open for further manual interaction
        const replServer = repl.start({ prompt: "> " });
        replServer.context.page = page;

        replServer.on("exit", () => {
          console.log("Exiting REPL and closing the browser.");
          process.exit();
        });

        await new Promise(() => {}); // Keeps the script running indefinitely
      },
      launchContext: {
        launchOptions: {
          headless: false, // Ensure the browser is not headless
        },
      },
    });

    // Start the crawler with the provided URL
    console.log(`Starting crawler with URL: ${url}`);
    await crawler.run([{ url }]);
  };

  // Launch the browser manually
  const browser = await chromium.launch({
    headless: false, // Open the browser in non-headless mode
    args: [
      "--window-size=1100,800", // Set the window size (width x height)
      "--auto-open-devtools-for-tabs", // Automatically open the console
      "--disable-infobars", // Disable the "Chrome is being controlled by automated software" message
    ],
  });

  // Create a new page in the browser with the desired viewport size
  const page = await browser.newPage({
    viewport: { width: 800, height: 800 },
  });

  // Expose functions to the browser context
  await page.exposeFunction("runScript1", async () => {
    console.log("Running Script 1");
    await startCrawler("https://www.instagram.com/selenagomez/?hl=en");
  });

  // Expose another function if needed (e.g., runScript2)
  await page.exposeFunction("runScript2", async () => {
    console.log("Running Script 2");
    // Add logic for another script or action here
  });

  // Navigate to the local page that allows interaction with the exposed functions
  console.log("Navigating to local page...");
  await page.goto("http://localhost:8080", { waitUntil: "networkidle" });

  // Keep the browser open by entering an infinite loop or waiting state
  await new Promise(() => {}); // Keeps the script running indefinitely
})();
