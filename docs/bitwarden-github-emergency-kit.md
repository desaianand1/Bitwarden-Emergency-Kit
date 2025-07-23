About a year ago I made a post describing the why and how of creating an [emergency kit](https://www.reddit.com/r/Bitwarden/comments/143zktj/you_need_an_emergency_kit/). Recently I got a suggestion for an improvement to that old post from u/DozySquirrel.  Looking at my original post, I realized that it's time to clean it up.

# The second threat to your vault

When we think about our password manager, the first thing we think about is protecting our secrets from unauthorized disclosure. We don't want that meth crazed ex brother-in-law to drain our bank accounts. We don't want the overseas cyber criminal to steal our credit card and national identification numbers. And you're right! This is of paramount importance.

But there is another risk. You could get locked out of your vault.

>I forgot my master password!

>My phone crashed and I lost my 2FA!

>My grandmother died and I'm supposed to close her accounts and sell her house!

(We'll talk about all these scenarios later.)

My immediate point is that if you have taken all the reasonable precautions to protect your vault from unauthorized access, there is still this second risk.

>So what? I can just go to each website and reset my passwords.

The surprising answer is that no, you can't. The first and most obvious issue is, *where do you get the list of websites*? It's 2024. When was the last time you got a paper statement for your credit card? How often do you get an email from <https://toothpicks-r-us.com>?

But wait: it gets worse. You have secrets that don't have an obvious recovery workflow. The PIN on your iPhone may be one example. The login password to your Windows 11 desktop is another.

And then there are the items that may simply be difficult or time consuming to replace...if you can remember them.  In this category are things like,

* the VIN and license plate for your car,
* the social security numbers for your spouse and children,
* the WiFi passwords for your friends,
* drivers license numbers for your spouse and children, or
* software license keys.

Those bank statements you are getting by email? They don't have account numbers in them, for security purposes, so you'll have to visit the bank to regain those. How about the gate code to enter the gated community of your wealthy in-laws? And of course there is the locker combination for your gym locker; yeah, I guess you could pay someone to saw the lock off...

My unscientific estimation is that if you have done your due diligence to protect your vault from unwanted disclosure (good master password, 2FA, good operational security), you are about a hundred times MORE likely to lose your secrets due to this second threat. I see two to four posts a month on various subreddits from people who are looking for a super duper sneaky back door to get back into their vault. I got news for you: if there was such a workaround, bad guys would know about it, and you would be yelling that Bitwarden was not secure.

>I can handle this! I'll just memorize my master password!

Um.

First, experimental psychologists have known for 50 years that human memory is not reliable. You can recall a fact, daily, multiple times a day, for years, and then one morning >POOF< it's gone. Your memory is not a reliable system of record.

Second, the above notwithstanding, there is a risk of traumatic brain injury or stroke. Neither of these are age dependent. And don't scoff and say you'll be a vegetable if you have such a somatic injury. It's quite likely you will recover...mostly. But your vault could be permanently lost.

Third, there's one mishap that you won't recover from, and you are at 100% risk: your own death. I truly hope you live a long and happy life, but all of us eventually perish; it's built right into the design of our bodies. One day SOMEONE ELSE will have to settle your last affairs. Don't be selfish and callously argue "it's not my problem". If you don't prepare for this day, you are leaving an undue burden on someone who likely is grieving your death and needs that data in your vault. I would say I see this sad plight about twice a year on Reddit. It's a real problem!

# What is an Emergency Kit?

Most simply, it's a way of out of this predicament. It is a permanent record (NOT your brain) that will allow you to regain access to your vault. The assumption is that your credential storage is intact and online, but you have lost access to it. Some possibilities:

* You forgot your master password.  Yes, that happens.
* Your phone crashes or is lost. And for whatever reason, you don't have a backup of the storage of your TOTP (Authenticator) app.
* You forget the PIN to your mobile phone. Or you use use TouchId and have a nasty cut on your finger, so you're back to the phone PIN.
* You're dead, and your grieving spouse needs the password to be able to pay the electric bill.

An emergency kit should give you everything necessary to bootstrap you back into your vault. It will have things like,

* The correct Bitwarden URL (bitwarden.com versus bitwarden.eu)
* The registered email for your vault. Keep in mind that you might use an email alias or "plus addressing" for the vault login, so this might not be obvious!
* Your master password
* Your [Bitwarden 2FA recovery code](https://bitwarden.com/help/two-step-recovery-code/)
* If you "pepper" your passwords, a complete description of the peppering algorithm

In addition, the backing email for your vault should be regarded as precious. Not quite as necessary, but still worth calling out:

* The correct URL to your email service
* The email mailbox (email address)
* Your email password
* Your email 2FA recovery code

If you are using TOTP (the authenticator app) for your Bitwarden 2FA, you may have a further dependency. Some people don't like to store any information about their TOTP app inside their vault. Well, OK. But if you do that, you need to have EVERYTHING necessary to regain access to that datastore elsewhere.

For instance, if you are using Ente Auth, you should save

* The Ente username
* The Ente password
* The Ente recovery key

If you are still using Authy (yuck!), you might need:

* The registered phone number for Authy
* The "equipment freeze" PIN from your mobile provider to regain access to your mobile phone number
* The Authy encryption password

# An Emergency Kit versus a Backup

An implicit assumption with an Emergency Kit is that your online credential storage is intact.

>What? The cloud isn't perfect?

Yeah, right. I've been in this business for 50 years (wtf!), and I got news for you. It ain't. We all do our best, but s--- happens.  My favorite example is how the primary Azure datacenter is located near Microsoft, in western Washington. When the [Cascadia Subduction Zone](https://en.wikipedia.org/wiki/Cascadia_subduction_zone) goes, odds are anything in the vicinity of Redmond will be rubble. And maybe, just for fun Mt. Rainier might turn Redmond into a modern day Pompeii.

Or perhaps (horror of horrors!) a software bug completely corrupts your vault as it is stored on the Bitwarden servers. Note: there is still a glass jaw when you [rotate your account encryption key](https://bitwarden.com/help/account-encryption-key). Yes, it's possible to create a problem.

As another example, you could shoot yourself in the foot and lose a secret, or store a bad value for a secret. Bitwarden has a "password history" feature, but that may not necessarily cover all the secrets in your vault.  What if you inadvertently erased something in a secure note?

And of course, most people have asked at one time, "What if Bitwarden were to go away?" Oddly enough, this is one of the less likely risks. In particular, Bitwarden wouldn't go away overnight. You would receive an email months in advance, which you give you plenty of advance warning to prepare.

But in any event, this is what backups are about. A good backup should do everything that your emergency sheet does, but it goes further by copying the entire contents of your credential datastore:

* An export of your vault, including secure file attachments and organization vaults;
* An export of the datastore of your TOTP app
* All the 2FA recovery codes for ALL of your websites

A backup is much more involved than an emergency kit. It's definitely not for a beginner, but I encourage everyone to eventually start making backups. [Here](https://github.com/djasonpenney/bitwarden_reddit/blob/main/backups.md) is one I wrote recently.

# How do I make an emergency kit?

Put most simply, *write all this on a piece of paper*.  What have I suggested so far?

* Your Bitwarden server URL (<https://vault.bitwarden.com> versus <https://vault.bitwarden.eu>)
* You Bitwarden login username
* Your Bitwarden master password
* Your Bitwarden 2FA "recovery code" -- note that this *does not* replace the master password
* The email address that Bitwarden sends notifications to
* The password for that email address
* The 2FA recovery code for that email address
* The PIN for your FIDO2 hardware security token
* The email address for your Ente Auth account
* The password for your Ente Auth account
* The Ente Auth "recovery key"
* If you "pepper" your passwords, a complete description of the peppering algorithm once you open your vault.

Is there more than this? It depends on your exact circumstance. Remember, one day *someone else* is going to have to
read this sheet and use it to settle your last affairs after you die.

Write legibly! And preferably  make a second copy of this paper and have a trusted friend or associate store it
offsite, in case of fire or other disaster.

# Final thoughts

Passwordbits has a [great article](https://passwordbits.com/password-manager-emergency-sheet/) on making and storing an emergency kit. It's not Bitwarden specific, but the
article is completely relevant.

[Here](https://community.bitwarden.com/t/i-created-a-bitwarden-emergency-kit/69523) is a second take from the Community pages that might be interesting.

Passwordbits also has some good suggestions on how to store it when you are done. One thing I do not think they
emphasize enough is that *you want more than one copy*. If there is a fire or flood -- if you are moving your
house and a box goes missing -- you want a backup of your backup.
