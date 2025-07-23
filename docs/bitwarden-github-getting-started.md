Shamelessly copied and adapted from [/u/cryoprof](https://www.reddit.com/user/cryoprof/)'s _Guide for Getting Started on the Right Foot in Bitwarden™ (Version 3.0)_, published [here](https://www.reddit.com/r/Bitwarden/s/nIwfXH9Sr7):

# PICK YOUR SERVER

Decide whether you want your Bitwarden account hosted on the cloud server [bitwarden.com](https://vault.bitwarden.com) or on bitwarden.eu; if you're unsure, choose bitwarden.com (until recently, this was the only available server option).

# PICK YOUR EMAIL ADDRESS

Choose the email address you will use as your Bitwarden username. You should use a unique email address: one that is not used anywhere else.

Many mail servers (like Gmail and ProtonMail) support a "plus" address, like <myname+randomstring@domain.com>. Be sure to test this feature before you use it, by sending yourself a test message.

# START YOUR EMERGENCY SHEET

Get a piece of paper and write "Emergency Sheet" at the top. Then write down the Bitwarden cloud server that you plan to use (bitwarden.com or bitwarden.eu), as well as the email address that you will use for your Bitwarden login. If you're paranoid or like to play secret agent, make sure that you write with the paper placed on a hard surface (not a notepad or magazine), and that you are alone in a closed room with all curtains drawn.

# PICK YOUR MASTER PASSWORD

Click [this link](https://passhelp.github.io/generator/#phrase:4) once, and copy down the displayed phrase on your piece of paper.

This will be your _master password_. Unless you have a medical condition you will be able to memorize it with some practice (you were able to memorize your mailing address, telephone number, names of friends and relatives, and similar information; memorizing your master password is not much harder — but  that it will take a bit of practice).

If you're concerned about the security of online password generators, then start by saving the linked passphrase generator webpage as a local .html file, disconnect your device from the internet, and thereafter open the locally saved .html file for generating your passphrase.

# REGISTER YOUR NEW ACCOUNT

[Register your Bitwarden account](https://bitwarden.com/help/create-bitwarden-account/) either on the [bitwarden.com server](https://vault.bitwarden.com) or on the [bitwarden.eu](https://vault.bitwarden.eu) server. Use a fake name if you wish, and leave the Password Hint blank for now.

Note that Bitwarden will require that you confirm your email address as part of the registration process.

 At this point consider [upgrading your subscription](https://bitwarden.com/go/start-premium/) to Premium if you wish to use Premium features.

# TWO-FACTOR AUTHENTICATION AND ENCRYPTION

Still in the Web Vault app, go to the ["Two-Step Login" section](https://vault.bitwarden.com/#/settings/security/two-factor) of Security settings, and enable a 2FA method for your Bitwarden account.

## Hardware Security Key (FIDO2)

The best choice is a hardware security key such as a [Yubikey Security Key NFC)[https://www.yubico.com/product/security-key-nfc-by-yubico-black/.  To set this up in Bitwarden, click "Manage" for the Passkey provider, and register your Yubikeys there (not under "Yubico OTP Security Key"). Personally, I have three security keys; I keep one on my person, one at home, and one safely stored at a relative's house.

## TOTP (The "Authenticator app")

If you aren't willing or ready to use a hardware security key, enable TOTP now:

* Download [Ente Auth](https://ente.io/auth/).
* Create an account. Like the email for Bitwarden, consider using an email address. Write it on your emergency sheet.
* Click [this link](https://passhelp.github.io/generator/#phrase:4) once, and copy down the displayed phrase on your piece of paper as your Ente Auth password.
* Still in the "Two-Step Login" section on the Bitwarden web page, enable follow the instructions to enable 2FA on your Bitwarden account.

## Clean-Up

_IMPORTANT: Before leaving the "Two-Step Login" section, click the "View recovery code" link. Accurately transcribe this code onto your "Emergency Sheet"_

In the "Keys" tab of Security settings, change your KDF algorithm to Argon2id. Keep the default settings unless you use iOS devices, in which case you should decrease the "memory" setting to 48 MB and increase "iterations" to 4.

# ADD YOUR PASSWORDS

Populate your vault by [importing passwords](https://bitwarden.com/help/import-data/) that had been stored elsewhere, or by creating new vault items from scratch.

# INSTALL BITWARDEN CLIENTS (finally!)

Download and install the Bitwarden client apps ([browser](https://bitwarden.com/help/getting-started-browserext/) and [mobile](https://bitwarden.com/help/getting-started-mobile/)) that you wish to use. Note that on desktop the browser extension improves both security and convenience. The [desktop app](https://bitwarden.com/help/getting-started-desktop/) is also useful.

Configure the settings in each. I recommend setting the _Vault Timeout Action_ to "Lock" instead of "Log out", and you should use a relatively short _Timeout Period_. Also enable the option that clears the system clipboard after a short delay.

In the Windows desktop app (if you are using it), go to Settings and check the setting "Disable screenshots".

# SOME CLEANUP

* Make your first backup, by creating a vault export from one of the non-mobile Bitwarden apps (i.e., Web Vault app, Desktop app, or browser extension), being sure to select the [encrypted .json file format with the "Password Protected"](https://bitwarden.com/help/encrypted-export/#create-an-encrypted-export) option for the export type. Use the same method as before to create a strong password for your backup file, but this time, make it a [6-word passphrase](https://passhelp.github.io/generator/#phrase:6); write down the backup file password on your "Emergency Sheet" paper. In addition, create an entry in your Bitwarden vault to save the backup file password (which will make it easier to use the password when you create future backups).

* Use your Emergency Sheet as a "cheat sheet" for typing in your master password when logging in or unlocking your vault, until you have acquired to muscle memory to type it by heart (approximately one week, give or take). _DO NOT_ use cheats like a PIN or FaceId for that first week: force yourself to type the master password at least once a day.

* Seal your Emergency Sheet in a security envelope (which you can purchase or [make yourself](https://passwordbits.com/emergency-sheet-envelope/)), and store it in a secure location.

* You should eventually make one or more redundant copies of the Emergency Sheet, and store at least one away from your house, in case of fire.

* Optionally, update your Password Hint to contain a clue about where your Emergency Sheet is hidden. To change your Password Hint, log in to the Web Vault and use the password change form, but type in your __existing_ master password into the new password field (so that the master password is not changed), and _do not_ check the option for rotating your account encryption key.

* If you use Bitwarden on a desktop, you _should_ [use the browser extension](https://bitwarden.com/help/getting-started-browserext/). Pin the extension icon to the top of your browser window and disable the browser's built-in password manager (also disable any 3rd-party password managers that you may have installed prior to switching to Bitwarden).

Optionally, make the following changes to the browser extension settings:

(a) Enable the Account Security option "Unlock with PIN" (but _do not disable_ "Lock with master password on browser restart"), defining the PIN to be a short passphrase or password that is easier to type than your master password.

(b) Turn off the Auto-Fill option to "Show auto-fill menu on form fields" (there are five other ways to auto-fill, the best of which is the Ctrl+Shift+L keyboard shortcut — or Cmd+Shift+L on macOS).

(c) Disable the Notification options "Ask to add login" and "Ask to update existing login" (it is better to add logins by first creating the account credentials directly in the browser extension, and the using auto-fill to transfer the credentials into the account registration form).

(d) Disable the Notification option "Ask to save and use passkeys" unless you are sure that you want to store passkeys in your Bitwarden vault (passkeys are a "bleeding-edge" technology that may need some additional time to mature before the user experience is optimized).

(e) If privacy concerns are important to you and don't mind the slightly degraded UI visuals, disable the Appearance option "Show website icons".

# FINAL THOUGHTS

There are myriad additional options and advanced functions in Bitwarden, but the above covers all of the basics! Update your backup export on a regular basis using the method from Step 12. Don't use your master password or backup password anywhere else, and do not let anyone know what these passwords are. Keep your devices secure, and malware free, and you should be good to go.
