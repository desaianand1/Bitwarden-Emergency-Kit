_The most recent version of this document is
[on GitHub](https://github.com/djasonpenney/bitwarden_reddit/blob/main/cannot_login.md)_.

If you wish to make improvements or corrections, please consider
[creating a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

# Contents

TBD

# Introduction

Oh no! You can't log into your vault. What could be the problem?

First, the bad news: you are going to have to run some experiments to find out what the problem is. There are
numerous possibilities, and it's going to require some research to decide what happened.

Even worse, there is a chance that you have entirely lost the contents of your vault. If you have not made
preparations in advance, you may be forced to
[delete your vault](https://bitwarden.com/help/forgot-master-password/) and
[start over](https://github.com/djasonpenney/bitwarden_reddit/blob/main/getting_started.md).

If you are reading this, and you still have access, please create an
[emergency sheet](https://github.com/djasonpenney/bitwarden_reddit/blob/main/emergency_kit.md).
You can go further and actually create a
[full backup](https://github.com/djasonpenney/bitwarden_reddit/blob/main/backups.md).
That is more work; if you are overwhelmed, please do at least create the emergency sheet.

# Make A Backup

> Where are we going, and why I am I in this handbasket?

Some of the things you are going to try are potentially destructive. For this reason--if at all possible--you
should have a backup before you do anything.

An [Emergency Sheet](https://github.com/djasonpenney/bitwarden_reddit/blob/main/emergency_kit.md)
is your rescue in a number of simple situations:

* You forget your master password (that's right; you cannot trust your brain to remember _anything_);
* Your vault is secured via [TOTP](https://en.wikipedia.org/wiki/Time-based_one-time_password), the
TOTP app is on your phone, and your phone slipped and fell under the wheels of a passing bus;
* Your vault is secured via a FIDO2 security key, but your security key is lost or broken.
* You _are DEAD_, and your husband needs to get into your vault to pay the electric bill

...and so forth. An emergency sheet presumes that your credential datastore is intact, but you cannot open it
and use it.

A [full backup](https://github.com/djasonpenney/bitwarden_reddit/blob/main/backups.md)
goes one step further: what if the cloud copy of your credential datastore is lost or corrupted?
How could that happen?

* You fumble-finger an update to a vault entry, damaging or deleting it, and you don't notice until months have passed;
* A malicious ex or teenager gains momentary access to the Bitwarden backing email and explicitly
  [deletes your vault](https://bitwarden.com/help/forgot-master-password/).
  (A lot of people are astonished to hear that the security of this backing email leaves this minor Achilles heel.
  This in addition to the critical messages from Bitwarden such as unusual activity on your account.)
* The Earth opens up and swallows the Bitwarden datacenters, so there is literally no copy on any cloud server.

If you cannot log into your Bitwarden vault, and you do not already have a backup, _you are in disaster recovery_.
Your first priority should be to recover and save as much data as possible.

In the next section, we will outline how to do that.
This is your first priority, and the rest of this document will assume you have made as much of a backup
as you can.

## Making an Export (if you can)

Bitwarden has an
[export function](https://bitwarden.com/help/export-your-data/).
This is an important part of making a backup.
There are some things you should be cognizant about exports in general:

* A Bitwarden export requires that you are still logged into Bitwarden in at least one client.

* A Bitwarden export requires that you know the master password.
If your login problems include
an issue with your master password, you won’t be able to use the export function. Again, you
need to export everything manually.

* A Bitwarden export does not contain [Sends](https://bitwarden.com/products/send/) or any items in the trash.

Bitwarden exports are either in CSV or JSON format.

* CSV exports do not contain file attachments, cards, identities and passkeys. They are best for if/when
you choose to leave the Bitwarden ecosystem. They are not as complete as a JSON export.

* JSON exports are the most complete.
  If possible, use the encrypted password-protected ones. _Do not use the
  "restricted" export format._
  "Unencrypted JSON" exports are acceptable in this situation, since you are already in disaster recovery.

* If you use an organization and have Collections, you have to export those separately via the
  [admin console](https://bitwarden.com/help/export-your-data/#export-an-organization-vault) in the web vault.

## Doing it the Hard Way

If you cannot use the Bitwarden export function, _but you still have access to an unlocked Bitwarden client_:

* _Unplug that device from the network_.
  If it is a mobile device, put it in "Airplane Mode".
  If it is a desktop, unplug your Ethernet cable or otherwise disconnect it from the rest of the world.
  The risk is that a Bitwarden client may act strangely when it talks to the server and log you out.

* Grab pen and paper. In a quiet private place, go through each and every entry in your unlocked vault.
* Copy every single entry onto your paper.
* Write neatly.
* Pay close attention to the differences between "0" (zero) and "O" (capital oh), "1" (one), and "l" (small ell),
  "5" (five), and "S" (capital ess) and so forth.
* Take your time! Double-check your work.
* You will not be able to hand copy [passkeys](https://bitwarden.com/passwordless-passkeys/).
* There are a number of items that will require extra work.
  These include file attachments,
  [custom URI match detection](https://bitwarden.com/help/uri-match-detection/), and any organization vaults.

After you have tried copying everything, go back and try to ensure your exported copy is complete.

For the rest of this guide, we assume that you have made a backup, if you can.

# A Primer: Logged Out, Logged In, and Locked

Your Bitwarden vault is always in one of _three_ status:

* _Logged Out_ -- no access.
  From here, all you can do is try to log in. This requires your username,
  master password, and your 2FA. It may also require passing a
  [new device verification](https://bitwarden.com/help/new-device-verification/).
* _Logged In_ -- your vault is open. From here your can explicitly log out. It is also possible to "lock"
  the vault, usually due to a timeout. The details are contralled by the options in your Bitwarden client.
* _Locked_ -- your vault has passed authentication by the Bitwarden server, but there is no local access.
  Unlocking your vault entails a PIN, biometrics, or possibly even re-entering the master password.
  These options are controlled by the options in your Bitwarden client.

More on all this [here](https://bitwarden.com/help/unlock-with-pin/#understanding-unlock-vs-log-in).

_Unlocking Problems_

If you are merely "locked", you need to unlock your current Bitwarden client.
The server is not involved; it is a local problem with your Bitwarden client..
There are four common possibilities here:

* [Unlock with PIN](https://bitwarden.com/help/unlock-with-pin/) -- you must have set this up in advance;
* [Unlock with Biometrics](https://bitwarden.com/help/biometrics/) -- you must have set this up in advance;
* Unlock with your master password -- this is always allowed.
* You may also have access via a [passkey](https://bitwarden.com/help/login-with-passkeys/).

Look closely; is your client asking for your _master password_,
or for your _PIN_ (only applicable when unlocking)?
These are not interchangeable; the PIN won’t work when
you’re asked for your master password (and vice versa), and you cannot _ever_ log in with your PIN alone.

If unlocking with your master password does not work, either your Bitwarden client has gone sideways (not
common, but possible), or (horror of horrors!) you have forgotten your master password.

# First Steps: Test the "web vault"

⚠️ Have you made a [backup](#make-a-backup)?

So what's going on here? Let's start from the top: eliminate your Bitwarden client entirely.
Inside your browser, navigate to the vault web page
(either [the US server](https://vault.bitwarden.com), the [EU server](https://vault.bitwaden.eu),
or possibly a self-hosted instance).

If the web page _does not load_, you either have a networking problem on your computer, or there is a server error.

* If you aren't sure which server your account is on, try both. The servers are _not interchangeable_.
* Try to log in with _different browsers_.
* Try using a _private/incognito browser session_.
* Try _deleting the browser cache_.

️️️⚠️ Only  delete the cached browser content.
  _Do not delete your browser cookies_.
  Losing your browser cookies at this point could case Bitwarden to "forget" your device as a "known device", which
  might lead to you needing [new device verification](https://bitwarden.com/help/new-device-verification/)
  or 2FA on your account.

️⚠️ When trying to log in “too often”: the Bitwarden servers
[will require CAPTCHA verification](https://bitwarden.com/help/security-faqs/#q-how-can-i-protect-my-bitwarden-account-from-brute-force-attacks)
after 9 failed login attempts from an unknown device, so be careful with your attempts.

If at least one of these experiments succeeds, you know that it isn't a server problem, and you can focus
on the functioning of your Bitwarden client(s).

# Cannot Connect to the Bitwarden server

⚠️ Have you made a [backup](#make-a-backup)?

Did you try [connecting to the web vault](#first-steps-test-the-web-vault) and had issues?
It could be the server itself or your connection:

* Try to log in via _other devices and other networks_ (that is, Wi-Fi versus cellular).

* On mobile devices: Try _turning off Wi-Fi temporarily_, i.e. changing to cellular.
  Or vice versa.
  This might “solve” some network and/or IP address problems.

* For all devices in your local network: power off the router, wait 30 seconds, and then turn it back on.
  This might resolve some network addressing issues.

* If you use a VPN, turn it off (or on), (at least temporarily).

If you cannot seem to connect to the Bitwarden server (but other sites seem to connect correctly):

* Start by looking at the [Bitwarden status page](https://status.bitwarden.com).
  Perhaps this is a known issue or a planned outage.
* Are _the Bitwarden (US/EU) servers are temporarily down_?
  [Downdetector](https://downdetector.com/status/bitwarden/) is a good crosscheck to see if other users
  are also having a problem.

* _If you’re self-hosting_, verify your own server _is functioning correctly_.  It is possible your
login problems due to local errors misconfigurations of your self-hosted Bitwarden server.
These issues are out of the scope of this guide). But please do verify you have the _latest server version_
installed. “New” client versions may have trouble communicating with
“old” server versions.

If your Bitwarden server is down, there is not much more for you to do -- except again, to make a
backup if you haven't already.

If you can log in via the web vault, but not using your local Bitwarden client (or browser extension), you
have a Bitwarden client problem.

If you cannot log in via the web vault, you may have a username/password problem.

# Bitwarden Client Problems

If you can successfully log in via the web vault, but are having trouble via your Bitwarden client, start with
the good news: your credential datastore is not lost!

The question remains, however, whether your problem is with a single Bitwarden client, single host machine, or
perhaps even a particular network.

⚠️ Have you made a [backup](#make-a-backup)?

* Try _uninstalling the Bitwarden client and installing a fresh version_.
  There seem to be multiple situations where
  an existing Bitwarden client can get confused after an upgrade. If you are currently logged with that client,
  _do not uninstall the client until you have [made a backup](#make-a-backup)_.

* Try to log in via [other Bitwarden clients](https://bitwarden.com/download/).

* Try to use a Bitwarden client on a different device.
  This may indicate whether there is an OS problem,
conflicting browser extension, or other environmental factors.

* Again, if at all possible, try a different network.
Take your laptop to a coffee shop.
Turn Wi-Fi off (or on) so that you are using a different connection to the Internet.
Enable or disable your VPN.
Try a different exit node for your VPN.

The point behind these experiments is to ascertain the broken link in the chain and to direct your research
more closely.

## KDF Issues

⚠️ Have you made a [backup](#make-a-backup)?

Bitwarden now recommends that you modify your
[KDF settings](https://bitwarden.com/help/kdf-algorithms/) to be different from
the default settings you got when you first created your
vault.
It is possible some Bitwarden clients will behave badly when you make this change.
If you can log in via the web vault, but one
or more Bitwarden clients are not working,

* _Completely_ log your client out and then back in again.
* Consider temporarily switching your KDF settings back to the default, and try again.

> Especially on iOS, the Argon2 settings can be “too high”: change them to the default values (at least for
> “memory”).
> According to Bitwarden: “iOS limits app memory for autofill. Increasing memory from the default 64 MB may result in errors while unlocking the vault with autofill.”

## Application hangs or crashes, or otherwise acts inexplicably

If a Bitwarden client consistently crashes or has other inexplicable behavior, consider doing a full
uninstall and reinstall.

⚠️ Beware that uninstalling the Bitwarden mobile app, desktop app and browser extension will make those apps
“unknown devices” for Bitwarden again, requiring the email login verification code due to the
[new device verification](https://bitwarden.com/help/new-device-verification/) and login protection.
This is critical if you have failed to enable 2FA on your
vault; make sure you have access to your email account, where you will get the email verification codes.

1. Uninstall the app. Do not worry if you cannot "log out" before doing the uninstall.
2. Delete the local storage of the app--make sure the uninstall did not leave traces of the app on your system.
   Do not trust the uninstaller; see if there is other [local storage](https://bitwarden.com/help/data-storage/) that
   the uninstaller may have missed.
3. Reboot your device,
4. Reinstall the app from a fresh download.
5. Try to log in again.

If this particular Bitwarden client continues to misbehave, but you have ruled out a username/passwordr issue,
you can create a new post to get further help. Try to describe the problem as detailed as possible,
what exact error message you get (ideally with a screenshot, but make sure to blur any personal and
sensitive data), maybe what you already tried (and didn’t work) etc.

You can also contact [Bitwarden support](https://bitwarden.com/contact/) and create a new trouble ticket.

If you believe you have found a bug--you have “other” or “weird” error messages--you can report it on
GitHub ([here](https://github.com/bitwarden/clients/issues) for the browser extension, desktop app,
web vault and CLI, [here](https://github.com/bitwarden/android/issues) for the Android mobile app and
Android Authenticator app, and [here](https://github.com/bitwarden/ios/issues) for the iOS mobile app and
iOS Authenticator app…)

## Email and/or Master Password

But what if the web vault _seems_ to be functioning properly, yet you cannot log in there (or anywhere else)?
What next?
At this point, you must suspect a problem with your username, your master password, or both.

️⚠️ When trying to log in “too often”: the Bitwarden servers
[will require CAPTCHA verification](https://bitwarden.com/help/security-faqs/#q-how-can-i-protect-my-bitwarden-account-from-brute-force-attacks)
after 9 failed login attempts from an unknown device, so be careful with your attempts.

* Are you on the wrong web vault, [US vault](https://vault.bitwarden.com) versus [EU vault](https://vault.bitwarden.eu))?
These are _not interchangeable_.
If you haven't tried this already, go ahead and try to log in via the other web server.

_Check your email._

* _Do you actually have an account?_
  [Go to Bitwarden](https://bitwarden.com/pricing/) and try to create a new account.
  If you _already_ have an account, you _will not_ receive a message in your inbox.
  If you _do_ receive an email message, you either remembered the email incorrectly, or someone (a malicious
  family member?) has deleted it.
  If you inadvertently created a new vault, please consider [deleting it](https://bitwarden.com/help/forgot-master-password/) now.)

> For the email address, Bitwarden doesn't care whether you use lower case letters or upper-case letters,
> so whether you try to login with <example@example.com> or <EXAMPLE@EXAMPLE.COM> – both should work exactly the
> same. This is not true for the master password!

_Check your master password_

* _Verify your email address and master password_
  by referring to your [emergency sheet](https://github.com/djasonpenney/bitwarden_reddit/blob/main/emergency_kit.md).
* Did you set a "master password hint"? If so, it's time to [request it](https://vault.bitwarden.com/#/hint).

> Pro tip: many people use the master password hint to remind them where they stored their emergency sheet.

* Perhaps _you recently changed your email address and/or master password_?
  And worse, didn’t update your emergency sheet?
  Step back, relax, take a walk, get a cup of coffee.
  Perhaps it will come back to you in a moment.

_Look for typos_

* _Look for any typos in your email address and/or master password_, especially silly typos or more obvious
  ones like _0 (zero) versus O (capital letter “oh”)_, _l (small “L”) versus I (capital letter “i”)_,
  or _| (special character “vertical bar”)_.
* _Look for added or missing spaces_: trailing spaces, leading spaces or double spaces within your master
  password. Whitespace in a password is critical!
  The discrepancy could be either when you were typing it in or when you created the
  master password.

_"Special" Characters_

Do you have _problematic special characters_ in your master password?
Non-ASCII, Unicode, or Emoji characters may work on one system but not on other systems.
Your master password should only use the "safe" 95-character
[printable ASCII character set](https://commons.wikimedia.org/wiki/File:ASCII-Table-wide.svg)

Even if your master password _currently_ works, a system upgrade could cause it to fail at a future date!

A strong sign you may have a character set problem is if you can
log in via your web vault or some Bitwarden clients, but not others.
In this case, consider changing your master password,
but, again, start by [making a backup](#make-a-backup)!

Many people think a password is "safer" if it has weird characters in it. In terms of security, a weird
character does help as much as some might hope: `MyDögHàŝFlèaß` does not add nearly as much
security ("randomness" or "entropy") as
simply using a slightly longer but much more tractable [passphrase](https://xkcd.com/936/), such as
`polka-fame-curled-either-passover` or `WinnerPlasmaKabobSinuous`.

To add insult to injury, punctuation and
special characters make the master password harder to memorize and harder to type.

If you choose to update your master password, use a 4-word passphrase, generated by Bitwarden itself.
If you want extra security, have
Bitwarden add another word (or even two words) to the passphrase.

Getting back to problematic special characters, the "safest" characters, the "printable ASCII character set",
the only ones you should use in a master password, consist of:

* capital letters A-Z
* small letters a-z
* numerals 0-9
* the space character
* ! (exclamation point)
* " (double quote)
* \# (octothorpe, a.k.a. "pound", "hashtag", or "sharp")
* $ (dollar-sign)
* % (percent)
* & (ampersand)
* ' (apostrophe)
* ( (left parenthesis)
* ) (right parenthesis)
* \* (asterisk, a.k.a. "star" or "splat")
* \+ (plus)
* , (comma)
* \- (dash)
* . (period, or "dot")
* / (slash)
* : (colon)
* ; (semicolon)
* < ("less than")
* = (equal)
* \> ("greater than")
* ? (question mark)
* @ (at-sign)
* ^ (carat)
* _ (underscore)
* \` (back tick)
* ~ (tilde)

> Note that even though all these characters are acceptable in a Bitwarden master password, be aware
> that other websites may have trouble with some of them.

_Autocorrect Issues_

It's possible that your master password will be mangled by your keyboard, device, or even the client (browser)
itself. That is, this could be an autocorrect problem.
You may not easily spot this, especially since password input is often obscured.
Even with the aforementioned safe characters,
some characters may get autocorrected by your keyboard, client, or device:

* Some systems will replace straight-quotes (`'` or `"`) with curly-quotes
  (i.e., “smart-quotes”, such as "&ldquo;", "&rdquo;",
  "&lsquo;" and "&rsquo;"). MacOS is especially notorious for this.
* You may have inserted a "." (period/full stop) and/or invisible spaces after pressing the “space-bar”.
* Some systems will automatically change a
  input lower-case letter into an upper-case letter or vice versa.
* On iOS: _deactivate smart punctuation_, since that can “autocorrect” characters you type in.
  Look under Settings->General->Keyboard, and set _Smart Punctuation_ off.
* In general, all kinds of apostrophes and quotation marks (', ", `, ´, ‘, ’, ‛, “, ”, ‟) may be
  autocorrected into a different form preferred by the device or app you are using.

What can you try to find the correct password you entered or to type in the correct password on your system?

* _Turn off autocorrect_, if possible.
  In iOS, go to Settings->General->Keyboard, and disable both _Auto-Capitalization_ and _Auto-Correction_.
* Try to _change your (virtual or physical) keyboard_.
* Make your _keyboard input visible_ if possible.
* Type it more carefully (look at your hands!).
* Use the _on-screen visible keyboard_ such as the [Character Map](https://support.microsoft.com/en-us/topic/how-to-use-special-characters-in-windows-documents-ec1a4e84-706e-67a5-e52b-e3ebab90313f) in Windows.
* Consider composing the password in a text editor such as `Notepad` or `TextEdit` and then pasting it into your
  login form.

## Lost Password or Lost 2FA

> None of this is working! The web vault is there, but it won't let me log in.

If you have truly lost your password, then--unfortunately--there is no super-duper sneaky secret back door
to get back into your vault.
Bitwarden can neither reset your master password nor “circumvent” it in any way.
The Bitwarden master password does more than “authenticate” you; it is also a
major factor in the encryption of your vault.
_Your master password is a necessary input to decrypt your vault, and
your master password never leaves your device._

This is for your protection. It means that even if the Bitwarden server were to be seized by malefactors, they would not
have the necessary secret to decrypt your vault. This is also why, as long as your master password isn’t available, it
cannot be reset or changed by anyone else.

⚠️ If at all possible, do you have a [backup](#make-a-backup)?

Your only remaining hope is if you can remember the master password or even “guess it”.
If you believe there is a chance of remembering it, then take your
time--even a few days--and perhaps you will remember it.
Sometimes it is good to sit down and focus on it.
Or perhaps it is good to stop thinking about it for a few days…

⚠️ When  you try to log in “too often”: Be aware, that the Bitwarden servers
“will require CAPTCHA verification after 9 failed login attempts from an unknown device”.
Be careful and as accurate as possible" with your attempts.
Otherwise you will start facing additional CAPTCHA
challenges before each password guess.

_If you have truly lost your Bitwarden account_,
[you can delete your Bitwarden account](https://bitwarden.com/help/forgot-master-password/) as long as
you have access to the email address you used.

Account deletion is not reversible!
Again, do you have a [backup](#make-a-backup)?
Next, you can [create a new account](https://github.com/djasonpenney/bitwarden_reddit/blob/main/getting_started.md)
and ideally import/restore your most recent backup/export.

## Was I "hacked"?

Sometimes when someone cannot log into their password manager, they believe they "must have been hacked".
I believe this is naive:

I assume you have a strong master password (unique, complex, and
randomly generated) as well as good 2FA on your vault (a FIDO2 hardware security token or a TOTP app).
I assume that you do not download malware on your device: no "hacks", "cracks", or "cheats"; your device has
current OS patches (and you don't use it if it does not have current patches or cannot be updated); you do not
allow anyone else to have access to the keyboard or even the USB ports, and so forth.

In this case the overwhelming odds are that you _did this to yourself_. Yes, there are exotic attacks out there that you
might be helpless against, but they are extremely rare. One report indicates that the entities that deploy
these sophisticated attacks charge $250,000 _per person_.

If you really have malware, the overwhelming odds are _you downloaded and installed it_. This could be
downloading (or side loading) a bad app, intentionally downloading a "hack" or "cracked" game, or perhaps
incautiously opening a strange or unexpected email attachment.

_Why the password manager?_

If an attacker wanted to plunder your bank accounts and other assets, they would make sure it took you as long as
possible to discover the breach. They want as much time as possible to do
their nefarious work.
Modifying the login for your password
manager is close to the bottom of the list of things they would do.

Of course, there are exceptions. A bad actor might co-opt your Amazon account, for instance, to deliver merchandise
to a drop location or initiate a [brushing scam](https://www.uspis.gov/news/scam-article/brushing-scam).

They might modify the login to a social media account in order to publish illegal content (and delay you
removing the illicit content).

The one exception to this might be a spiteful ex-spouse
or rebellious teenager who is looking to cause you grief _by denying your
access to your own secrets_. Outside a real corner case like this, an attacker modifying your vault is not a
likely scenario.

## An Ounce of Prevention

> Barn door? Needs to be closed?

Not specifically on-topic, here are some additional thoughts to try to prevent this from happening again.

_The Emergency Sheet_

An [emergency sheet](https://github.com/djasonpenney/bitwarden_reddit/blob/main/emergency_kit.md) is a minimal
prophylaxis that every use should consider.

_Backups_

_Perform regular [backups](https://github.com/djasonpenney/bitwarden_reddit/blob/main/backups.md) of your vault.

In my mind, a backup is a proper superset of the emergency sheet. The emergency sheet assumes you online
credential datastore is intact. The backup goes beyond that and creates a full copy of your datastore that you
can use elsewhere: [self-hosting](https://bitwarden.com/help/self-host-an-organization/) or even moving to a
different password manager.

A backup won’t prevent a “lockout scenario” _per se_, but it provides another fallback.
If you lose access to your Bitwarden vault, then you will still have most or all of your
important data, and be able to restore that data to a new vault.

Backups need to be periodically updated. Consider creating a recurring calendar reminder for every three, six, or even
twelve months to make backups of your vault.
I make my backup once a year and use it as another excuse to go visit my family in the next town over, to exchange
the pair of encrypted USB thumb drives with a fresh copy.

_Set up Two-Factor Authentication now._

In addition to being a smart cybersecurity measure, if you set up 2FA it will bypass potential problems with
the Bitwarden "new device verification", which can cause a "circular lockout" problem. Just make sure to
include your 2FA recovery information in your full backup.

_Emergency Access_

Bitwarden [Emergency Access](https://bitwarden.com/help/emergency-access/) may also help.
Note this requires
a paying Bitwarden subscription, and there is a mandatory waiting period before someone will have access
to your vault.

_Login With Passkey_

You can add a backup login method for the Bitwarden account via
“login-with-passkey”-passkeys, ideally “with encryption.
This makes it possible to login without entering
the master password and without your 2FA or “new device verification” code.
These login-passkeys with encryption depend on a PRF capable browser, the “passkey-wallet”
(i.e. where you store that passkey) and the OS must support their creation.
Currently, “login-with-passkey” is still in Beta and only possible for login to the web vault.

⚠️ But, as nice as additional login-passkeys to your Bitwarden account/vault are: currently, those
Bitwarden-login-passkeys don’t replace your master password. Some critical actions still need a
master password confirmation (like changing the master password and exporting the vault). Do not rely
solely on Bitwarden-login-passkeys (for now).

## Acknowledgments

This guide is based on <https://community.bitwarden.com/t/guide-i-cant-login-some-tips-for-login-problems-issues/82188/4>.

That version is in turn based on
[another older post](https://community.bitwarden.com/t/how-to-master-password-problems-and-best-practices/43282).

Thanks to [@grb](https://community.bitwarden.com/u/grb), [@DenBesten](https://community.bitwarden.com/u/denbesten),
[@Neuron5569](https://community.bitwarden.com/u/neuron5569) and [@dh024](https://community.bitwarden.com/u/dh024),
whose contributions on the
[Community Forum](https://community.bitwarden.com/t/guide-i-cant-login-some-tips-for-login-problems-issues/82188)
have served as inspirations for this post!

Kudos to [Nail1684](https://community.bitwarden.com/u/Nail1684/summary); any mistakes are doubtless mine, not his.
