import { expect } from '@wdio/globals'

import OnboardPage from '../pageobjects/onboard.page.js'
import OnboardCreatePage from '../pageobjects/onboard.create.page.js'
import OnboardSuccessPage from '../pageobjects/onboard.success.page.js'
import PortolioPage from '../pageobjects/portolio.page.js'
import WalletManagementPage from '../pageobjects/wallet.management.page.js'
import WalletManagementOptionsPage from '../pageobjects/wallet.management.options.page.js'

describe('My third test', () => {
    it('should create new wallet and manage wallets', async () => {
        //debugger
        await OnboardPage.open()
        //await expect (OnboardPage.btnNewWallet).toHaveText(expect.stringContaining('I need a new wallet'))
        await OnboardPage.getWallet()
        //await expect (OnboardCreatePage.header).toHaveText(expect.stringContaining('Keys to Your Kingdom'))

        const recoveryPhrase = await OnboardCreatePage.getRecoveryPhrase()
        console.log('Recovery phrase: ' + recoveryPhrase)

        await OnboardCreatePage.phraseSaved()

        await OnboardCreatePage.enterRecoveryPhrase(recoveryPhrase)

        await OnboardCreatePage.Continue()

        let password = 'test123'
        await OnboardCreatePage.enterPassword(password)
        await OnboardCreatePage.Continue()

        await OnboardSuccessPage.letsGo()
        
        await PortolioPage.openWallets()

        let wallets = await WalletManagementPage.getWallets()

        //console.log (wallets.length)
        //console.log (await wallets[0].getText())

        let main = 'Main Wallet'
        let numWallets = await wallets.length
        let mainExists = false

        for (let i = 0; i < numWallets; i++) {
            let text = await wallets[i].getText()
            await wallets[i].waitUntil(async function () {
                return (await wallets[i].getText()) !== ''
            }, {
                timeout: 5000,
                timeoutMsg: 'expected text to be different after 5s'
            })
            if (text === ''){
                text = await wallets[i].getText()
            }
            if (text === main) {
                mainExists = true
                break
            }
        }

        await expect(mainExists).toEqual(true);

        await wallets[numWallets-1].click()

        let walletOptions = await WalletManagementOptionsPage.walletManagement()

        await walletOptions[1].click()

        let walletAddresses = await WalletManagementOptionsPage.getWallets()

        await walletAddresses[0].waitUntil(async function () {
                walletAddresses = await WalletManagementOptionsPage.getWallets()
                return (await walletAddresses.length) !== 1
            }, {
                timeout: 5000,
                timeoutMsg: 'expected more wallets after 5s'
        })

        walletAddresses = await WalletManagementOptionsPage.getWallets()
        await expect (walletAddresses[0]).toBeDisabled()
        let isChecked = await walletAddresses[0].getAttribute("data-state")
        await expect (isChecked).toEqual('checked')

        await walletAddresses[2].click()
        await walletAddresses[3].click() 

        let saveButton = await WalletManagementOptionsPage.saveButton()
        await saveButton.click()


        let oldWalletsNum = await wallets.length

        wallets = await WalletManagementPage.getWallets()
        await browser.waitUntil(async function () {
                wallets = await WalletManagementPage.getWallets()
                return (await wallets.length) !== 0
            }, {
                timeout: 5000,
                timeoutMsg: 'expected more wallets after 5s'
            })

        let newWalletsNum = wallets.length

        await expect(newWalletsNum).toEqual(oldWalletsNum + 2)

        //await browser.debug()
    })
})

