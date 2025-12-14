import { expect } from '@wdio/globals'

import OnboardPage from '../pageobjects/onboard.page.js'
import OnboardCreatePage from '../pageobjects/onboard.create.page.js'

describe('My first test', () => {
    it('should copy new wallet recovery phrase', async () => {
        //debugger
        await OnboardPage.open()
        //await expect (OnboardPage.btnNewWallet).toHaveText(expect.stringContaining('I need a new wallet'))
        await OnboardPage.getWallet()
        //await expect (OnboardCreatePage.header).toHaveText(expect.stringContaining('Keys to Your Kingdom'))
        await OnboardCreatePage.copyPhrase()
        
        // set clipboard permissions
        await browser.setPermissions({ name: 'clipboard-read' }, 'granted');
        // now you can read the clipboard via, e.g.
        const clipboardText = await browser.execute(() => navigator.clipboard.readText());
        const clipboardList = clipboardText.split(' ')
        //console.log('Copied list: ' + clipboardList)

        const recoveryPhrase = await OnboardCreatePage.getRecoveryPhrase()
        //console.log('Recovery phrase: ' + recoveryPhrase)

        await expect (clipboardList).toEqual(recoveryPhrase)
        
        //await browser.debug()
    })
})

