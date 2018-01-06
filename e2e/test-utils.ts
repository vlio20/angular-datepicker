import * as fs from 'fs';
import {browser} from 'protractor';


export class TestUtils {
  static async takeScreenshot(filename) {
    const png = await browser.takeScreenshot();
    TestUtils.writeScreenShot(png, 'screens/' + filename + '.png');
  }

  private static writeScreenShot(data: string, filename: string) {
    const stream = fs.createWriteStream(filename);
    stream.write(new Buffer(data, 'base64'));
    stream.end();
  }
}
