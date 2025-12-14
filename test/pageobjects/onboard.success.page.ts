import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class OnboardSuccessPage extends Page {
    /**
     * define selectors using getter methods
     */
    public get btnFollow () {
        return $('button[data-testid="btn-follow-us"]');
    }

    public get btnExplore () {
        return $('button[data-testid="btn-explore"]');
    }

    
    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    public async followUs () {
        await this.btnFollow.click();
    }


    public async letsGo () {
        await this.btnExplore.click();
    }

}

export default new OnboardSuccessPage();
