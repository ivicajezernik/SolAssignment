import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class OnboardPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get btnNewWallet () {
        return $('button[data-testid="btn-need-new-wallet"]');
    }

    public get header () {
        return $('h1');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    public async getWallet () {
        await this.btnNewWallet.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    public open () {
        return super.open('onboard');
    }
}

export default new OnboardPage();
