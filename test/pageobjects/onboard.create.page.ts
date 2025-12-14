import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class OnboardCreatePage extends Page {
    /**
     * define selectors using getter methods
     */
    public get btnCopy () {
        return $('button[data-testid="btn-copy"]');
    }

    public get btnSaved () {
        return $('button[data-testid="btn-saved-my-recovery-phrase"]');
    }

    public get btnContinue () {
        return $('button[data-testid="btn-continue"]');
    }

    public get header () {
        return $('h1');
    }
    
    
    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    public async copyPhrase () {
        await this.btnCopy.click();
    }

    public async phraseSaved () {
        await this.btnSaved.click();
    }

    public async Continue () {
        await this.btnContinue.click();
    }

    public async getRecoveryPhrase () {
        const recoveryPhrase: string[] = []

        for (let i = 1; i <= 12; i++) {
            let input = 'input[data-testid="input-recovery-phrase-' + i + '"]'
            let word = await $(input).getValue()
            recoveryPhrase.push(word)
        }

        return recoveryPhrase
    }

    public async enterRecoveryPhrase (recoveryPhrase: string[]) {

        for (let i = 1; i <= 12; i++) {
            let input = 'input[data-testid="input-recovery-phrase-' + i + '"]'
            await $(input).setValue(recoveryPhrase[i-1])
        }

        return
    }

    public async enterPassword (password: string) {

        let newPass = 'input[data-testid="input-new-password"]'
        await $(newPass).setValue(password)

        let repeatPass = 'input[data-testid="input-repeat-password"]'
        await $(repeatPass).setValue(password)      

        return
    }


}

export default new OnboardCreatePage();
