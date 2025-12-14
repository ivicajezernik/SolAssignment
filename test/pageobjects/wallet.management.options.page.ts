import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class WalletManagementOptionsPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get buttonList () {
        return $$('div[data-testid="title"]');
    }

    public get btnSave () {
        return $('button[data-testid="btn-save"]');
    }

    public get walletList () {
        return $$('button[data-testid*="tgl-li-wallets"]');
    }
    
    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */

    public async walletManagement () {
        
        return this.buttonList

    }

    public async getWallets () {
        
        return this.walletList

    }

    public async saveButton () {
        
        return this.btnSave

    }

}

export default new WalletManagementOptionsPage();
