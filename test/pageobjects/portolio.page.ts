import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class PortfolioPage extends Page {
    /**
     * define selectors using getter methods
     */
    public get divWalletMgmt () {
        return $('div[data-testid="icon-section-wallet-picker-arrow-right"]');
    }
    
    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    public async openWallets () {
        await this.divWalletMgmt.click();
    }

}

export default new PortfolioPage();
