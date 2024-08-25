import { PlaywrightCrawler, Dataset } from "crawlee";
import { appendFile } from "fs/promises";
import { join } from "path";

// PlaywrightCrawler crawls the web using a headless
// browser controlled by the Playwright library.
const crawler = new PlaywrightCrawler({
  // Use the requestHandler to process each of the crawled pages.
  async requestHandler({ request, page, enqueueLinks, log }) {
    const title = await page.title();
    log.info(`Title of ${request.loadedUrl} is '${title}'`);

    // Save results as JSON to ./storage/datasets/default
    await Dataset.pushData({ title, url: request.loadedUrl });

    // Extract links from the current page
    // and add them to the crawling queue.
    await enqueueLinks();
  },
  // Uncomment this option to see the browser window.
  headless: false,
});

async function logger(message) {
  // Define the file path in the /tmp directory
  const filePath = join("/tmp", "mylog.txt");

  try {
    // Append the message to the file, creating it if it doesn't exist
    await appendFile(filePath, message + "\n");
    console.log("Content successfully appended to file");
  } catch (err) {
    console.error("Error writing to file:", err);
  }
}

(async () => {
  const current_time = new Date().toISOString();
  await logger("Starting the script " + current_time + "\n");
})();

// Add first URL to the queue and start the crawl.
await crawler.run(["https://crawlee.dev"]);
