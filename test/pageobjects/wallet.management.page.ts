import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class WalletManagementPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get walletList () {
        return $$('div[data-testid="list-item-m-title"]');
    }
    
    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */

    public async getWallets () {
        
        return this.walletList

    }

}

export default new WalletManagementPage();
