When people talk about password managers, they always think of storing passwords for websites.  That's an important use, but there are plenty of other things you should consider as well.

I am going to talk about things you should NOT store in your password manager, things that you MIGHT want to store in a password manager (but perhaps not), and try to give you some ideas of things to store in your password manager that you may not have thought of.

In the last section I will also talk about some ideas about HOW to fill out a password vault entry. Sure, you can do it any way you want, but perhaps I can give you some ideas on how to improve your vault organization

# But first, a review of risk management and your password manager

At the highest level, there are *two* threats to your credential storage. The first one, the risk that an unauthorized party might gain access to your secrets, is the one everyone thinks of. Steps to prevent that include good encryption, a good master password, and keeping your devices free of malware.

The second threat is also important. You do not want to get locked out of your password manager! The Bitwarden master password plus your 2FA are your "keys" to unlocking your credential storage. If you lose those, your secrets can be lost forever.

The basis of thoughtful risk management is to identify your risks, prioritize their likelihood, and assign resources to mitigate those threats. When considering your credential storage, you want to ensure that no one can read it without your permission, yet it is available when you need it.

A good example of how *not* to do this are those people who do not write down their master password at all. If they have chosen a random, complex, and unique master password, they are at risk of forgetting it entirely. This is not a theoretical risk; people post about this a couple times a month on Reddit, and they are looking for a super duper sneaky back door to get back into the vault. The bad news, of course, is that if your password manager has a back door, the bad guys will know about it as well.

So when it comes to the contents of your credential storage, you analyze the threats to it and decide how to manage those threats. This ends up being a subjective assessment. What are the most likely threats? What is at risk? What are you willing to do to mitigate those risks? What price are you willing to pay if the threat is carried out?

One example here is that perhaps you are willing to simply run the recovery workflows for every website if you lose access to your vault. There are a lot of problems with that: where do you get the list of websites? The "recovery questions" can be a threat if you are sharing the same answers with multiple websites. And you have (or should have) secrets such as the combination lock on your gym locker that involve a locksmith and a service fee.  Are you really willing to deal with all that?

The bottom line here is you may decide there are things that you may not feel comfortable placing in your password manager. There are arguments (not necessarily convincing) for these things. But again, this will be a subjective decision.

# What NOT to store in your password manager

This section is obviously per my personal opinion. Feel free to take exception.

# Your Bitwarden Recovery Information

You can lose access to your vault. You can forget the master password. Your TOTP ("Authenticator App") might fail and leave you high and dry.  If only you had the username, master password, and 2FA recovery code!

The problem is the circularity. You cannot look inside your vault to find these things if you are locked out of the vault. What you want instead is an [emergency sheet](https://www.reddit.com/r/Bitwarden/comments/1fknnbo/emergency_kit_20/).

# 2FA recovery codes for other websites

Most websites have a recovery workflow. It could be as simple as an email address that you control, or as complex as a list of one-time passwords. I strongly urge you to be aware of these workflows and to make a record of them. When it comes to disaster recovery, redundancy is a very good thing.

But if you can open your password manager and have access to your 2FA, you do not need any 2FA recovery codes. If you have lost access to your password manager, you need your emergency sheet. If you have lost access to your 2FA (such as your Yubikey or TOTP app), you need a [full backup](https://www.reddit.com/r/Bitwarden/comments/1f995wl/making_bitwarden_backups_version_20/). Neither the existing vault nor an emergency sheet will solve your problem.

If for some reason someone were to gain access to your vault, these recovery codes could arguably be a risk. Even if you use a Yubikey or a TOTP app, having these recovery codes inside your credential storage means that someone no longer needs your Yubikey to gain access.

In either event, storing recovery codes in your credential storage is somewhere between pointless and conceivably an unnecessary threat surface.

# Security questions and their answers

Some websites still use a list of "security questions" as their recovery workflow. These are answers like, "the name of your first boyfriend" and "the name of the first school you attended". At one level, this is just like the 2FA recovery codes. You definitely want to record these questions and the answers you gave. If you have access to your vault, you don't need these answers. And anyone who knows these answers might conceivably gain unauthorized access to the website.

Side note: you do *not* want to give truthful consistent answers to these questions. Someone who is targeting you (like the meth crazed ex brother-in-law) might be able to leverage their personal knowledge against you. Or if one website that stores your answers gets breached, the attackers may be able to leverage your answers on other websites. The bottom line is, you do need a record of these questions and the unique lies you give each website.

# Crypto Seeds

Cryptocurrency accounts are not normal financial accounts.  Credit cards, debit cards, and bank loans all have special checks and balances.  It's quite possible for someone to forge a check and steal from you. But the rest of the picture is that banks are VERY GOOD at getting the money BACK. The chain of accountability will lead to the thief, your funds will be returned, and the thief will ultimately have a Very Bad Day.

Cryptocurrency is different. These interlocks do not exist. If you have control of the account, you have complete, unfettered, and unchecked control over the funds.

For this reason, the best practice is to keep the crypto seeds offline. You can have it written on a piece of paper in a safe place. You can even have a copy of it in two places in case of fire. But most experts will advise you do not ever leave it online. There are just too many ways you can get robbed, and you will have no recourse.

# Things that MIGHT be okay in your password manager?

This section is obviously per my personal opinion. Feel free to take exception.

# TOTP Keys

[TOTP](https://en.wikipedia.org/wiki/Time-based_one-time_password) is a pretty good 2FA mechanism. It works by combining a secret shared between you and the website (the TOTP key) together with the current datetime to produce a "token" that changes over time. That's usually a six-digit numeral that changes every 30 seconds.

In this manner no secrets are exposed during the 2FA authentication protocol. There is indeed a small risk from an "attacker in the middle", where you are misled to a "Trojan Horse" website and mistakenly enter your password and the current TOTP token. An attacker can use this information to immediately log into your website and harvest your browser session cookies among other secrets. But only a FIDO2 hardware token or a passkey is stronger. Overall, it's a decent form of 2FA.

The concern is that if an attacker were to "somehow" gain access to your credential storage, they would gain both your password AND your TOTP key. From the viewpoint of separation of concern, it is arguably stronger to place your TOTP keys...elsewhere; not in your password vault.

*Why it might be okay*

You might reason that a direct compromise of your password vault is unlikely; other attacks on your websites are more likely. As an analogy, are you better protected by keeping a loaded shotgun under your bed or by improving the locks and burglar alarm on your house?

Some reason that your risk mitigation is better served in other ways. Don't forget that the integrity and safety of the datastore in your external TOTP app becomes another concern. And in any event, if you are using TOTP to secure Bitwarden itself, you might conclude that--since you already need that external app--you may as well keep all your TOTP keys there.

(This is a frequent topic of discussion on this subreddit: whether it's okay to use the internal TOTP function in Bitwarden. There is no consensus on this. You will have to decide whether there is a significant improvement in security, or whether the convenience of the builtin function outweighs any possible reduction in security.)

# Your Bitwarden Master Password

Maybe?

The thought here is that if you have a lapse in operational security, someone manages to get to your unlocked device, and then gets to your unlocked vault, *then* they would learn your master password. That might be a significant leg up for an attacker to acquire your passwords at a later date.

*Why it might be okay*

Obviously if you are looking at the vault entry for your Bitwarden vault, you used the master password. At least, recently. And if someone is perusing the contents of your vault, the master password is no longer serving its purpose.

And although this vault entry would not help you regain access to your vault, your emergency sheet or full backup would do that. So perhaps there is an added convenience here, without a significant loss of security.

# Your Yubikey FIDO2 PIN (et cetera)

Similar to the TOTP keys in your vault, if someone has stolen your Yubikey but they don't know your PIN, they cannot employ the Yubikey to pass the 2FA check on your websites.

*Why it might be okay*

For many of us, physical incursion is not a high probability risk. My main Yubikey is on my keychain and not available to attackers. My spare Yubikeys are locked away, and only my spouse and our alternate executor knows their locations.

A Yubikey will clear all its secrets if you enter the wrong PIN too many times. There is some peace of mind knowing there is a backup of those PINs that I can use if I forget it.

# "Important" Logins

Some people partition their web logins into two categories: ones that they feel have a higher risk from attackers--like bank accounts--versus ones that are less vulnerable, like ButtBook and SickSuck. They only store the less critical secrets in their password manager, and use an alternate method for the rest.

*Why it might be okay*

The big issue is that "alternate method". If they are using a second password manager, how is that one less vulnerable, and why aren't you using it for everything? Or else, are you using weak or reused passwords for those "important" accounts? That's obviously a nonstarter. And in any event, you've doubled the complexity of your emergency sheet or full backup.

Also, let's talk about what you call an "important" login.  Instagram comments have been used to publish links to child pornography on the Dark Web. You don't want to find out your IG account was compromised when a pair of grim FBI agents come knocking on your door. Bottom line, perhaps ALL your logins are important.

# Things you really SHOULD store in your password manager

This section is just a grab bag of things you may or may not have thought of.

* *Website Logins* -- This is the one everyone thinks of first. It is an important use case. Every single one of your logins should have unique, complex, and randomly generated passwords. There are other things to consider here as well. We will talk about that later.
* *Store warranty and serial numbers* -- Having the serial numbers for your important devices (like the service number of your Dell laptop) can be useful.
* *Software license keys* -- Those pesky software license keys...they don't seem to be as common now as they were ten years ago, but I still have a few. What kind of secure stable storage can I use for those? Oh wait! My password manager is a good place for this.
* *Passwords for other people* -- My wife is a really great person: intelligent, funny, but not particularly computer literate. I manage the backups and effectively operate as her system administrator. As such, I keep a few key secrets in my own vault, including her master password, PIN to her debit card, and a few other items for use in emergencies.

My brother-in-law is similar. He is much more technically minded, but he is a medical professional; computers are only a passing part of his scope of knowledge. I manage all his backups and security.

On another side of the family, I have a dear niece who...well, she struggles. After she lost her phone (and the blankity-blank useless Google Authenticator datastore), I stepped in and helped her upgrade her security. I am her fallback, and I manage her backups.

* *Gate Passwords* -- My brother-in-law lives in a gated community; I store the gate password there. I have the door alarm code for a dear friend so that I can go in his house, collect his mail when he is on vacation, and the like.
* Gym Locker -- That cheap MasterLock I use at the gym: it may not help me get my clothes back if I've been working out, but the vault entry will save me from having to pay someone to destroy the lock in order to get my wallet and phone back.

If you take inventory, I would bet that you too have a number of these kinds of secrets as well.

* *Driver's License(s)* --  I have my driver's license information in a vault entry, together with the license number and its expiration date.  (Pro tip: create a reminder in your calendar app to renew your license for about sixty days before it expires.) If your password manager supports file attachments, save an image of it as well. The image may not be legal for driving, but you would be surprised how often it may be useful. If applicable, save copies for your partner and the children.

*Motor vehicle information*

For each vehicle,

* the VIN
* license plate number
* license expiration date

I also like to add in the notes for the vehicle a full description of the item as might be in Kelly Blue Book, such as,

>2021 Toyota Venza LE, 4D Sport Utility, 2.5L 4-Cylinder DOHC 16V, Continuously Variable (ECVT), AWD, Ruby Flare Pearl, Boulder w/Fabric Seat Trim, 6 Speakers, ABS brakes, Active Cruise Control, Air Conditioning, AM/FM radio: SiriusXM, Apple CarPlay/Android Auto, Auto High-beam Headlights, Automatic temperature control, Electronic Stability Control, Exterior Parking Camera Rear, Fabric Seat Trim, Four wheel independent suspension, Front Bucket Seats, Front dual zone A/C, Fully automatic headlights, Illuminated entry, Leather Shift Knob, Leather steering wheel, Low tire pressure warning, Power door mirrors, Power driver seat, Power Liftgate, Power windows, Rear window defroster, Rear window wiper, Remote keyless entry, Speed-sensing steering, Split folding rear seat, Steering wheel mounted audio controls, Traction control, Turn signal indicator mirrors, Variably intermittent wipers, Wheels: 7 x 18 Alloy.

* *Vehicle Insurance* -- In my state, the image produced by the mobile app on my phone is actually legal documentation during a stop. But hey, an extra copy is useful. And in any event, the details (contact information, account number) can be useful in an accident.
* *Vehicle Registration* -- In a similar vein, the details of your vehicle registration (tag number, registration ID, expiration) should be in your vault. Oh, and again, put a reminder in your calendar app to remind you to update your tags.
* *Health insurance* -- No comments about the nucking futs craziness of the US health insurance system, please.  But the details (front and back) as well as images of your medical and dental insurance cards are all that your providers really need. You want one for each family member. (Man, that can be a lot of plastic that you don't need to carry any more.)
* *Passports* -- Those passport numbers and the expiration of each passport as well a copy of the passport page are valuable.
* *Social security numbers* (if not the entire card as a photo): you end up needing this surprisingly often. (And, if the family member is older, you have the dang Medicare number as well.)
* *Medication and vaccination list* -- When I have my annual physical examination, my doctor asks for my list of medications. It's surprising how many you might have: that medicated hand cream, those allergy meds, vitamin supplements, etc.: they all add up. And of course, the doctor wants to know the dosage as well. I just ended up creating a vault entry that lists all these things: it takes the guesswork out of it, and it's more accurate. Of course create one for each family member. What if your husband is unconscious in the emergency room?
* *Don't forget the pets* -- We love our cat, but let's face it: he requires a lot of work. His RFID chip id (and the contact information for the vendor) is in our vault. We have another entry that has his vaccination record (necessary for when we board him). When he gets older, we might even have a record of his medications.

*Non-account passwords*

* PIN for my mobile phone
* PIN for my wife's mobile phone
* login password to my desktop (and other machines in my house)
* login password to my wife's desktop
* login to my NAS; note that the TOTP key is part of this as well
* encryption key my Bitwarden backup: it won't help during disaster recovery, but it helps me when I need to refresh the backup.
* credit cards: not just the card number, expiration and CVV: you want the customer service phone numbers in case it is lost.
* checking account: debit card number/expiration/CVV, PIN, routing number, account number
* Voice mail password for my mobile phone (remember when voice mail was all the rage?)
* Bitlocker drive encryption key -- my wife has a great Windows laptop, and it is secured with Bitlocker. Once I fired it up and the CMOS battery had run down, so I had to enter the key to boot up. My employer assigned me a rockin' Mac laptop. It has secure password that I need before the thing even boots.

*WiFi Passwords*

I know, lots of people just rely on KeyChain on their iPhone for this, but I argue it's not enough. What if you are using a replacement Android device? What if your Apple account has been deactivated (it happens)? In the interest of fault tolerance, make a record of the your WiFi passwords: at least, the important ones; I don't bother with the one for my coffeeshop or my alehouse.

*Router login information*

I have had to replace our router more often than I would have ever imagined. And of course, the old router is typically dead when I need to do this. There is a lot of things you need to enter into the new router:

* admin username
* admin password
* website (usually [192.168.0.1](http://192.168.0.1), but...)
* PPoE username, password
* DHCP configuration
* WiFi configuration details, such as chosen channels
* default gateways, etc.

I also assign static IPs to the non-mobile devices in my house, such as my smart thermostat. I have a Secure Note that lists those devices and their permanently assigned IP addresses.

*Employee number* -- contact information, etc.  If you are in a larger company, you may find you need this information surprisingly often.

# Thoughts on filling out a Bitwarden vault entry

*Why you created this entry*

Sometimes it was for a specific purpose like a McDonald's giveaway. It can help to remind whether the login (still) has value, and whether it might makes sense to try to cancel the login and delete it from your vault.

*Why you do NOT use a website*

Sometimes we create a web login, and then something happens. Perhaps it's a bad customer experience. Perhaps you found a better alternative. In any event, making a note about why you have the entry but chose not to use it might help save you from a headache.

*When you created an account*

*Not* when you added it to your password manager -- doesn't happen often, but customer service reps have been known to ask this.

*Notes*

Which email address? You might have several. And the username may not necessarily reflect the email address that is used by the website.

*2FA type* -- I like to record what kind of 2FA is in use.

* If it's SMS, which phone number is in use? I employ a VoIP number for certain logins. Note that adding the phone number in the note also makes that phone number searchable.
* If it's FIDO2/WebAuthn, which hardware tokens are registered with this site? Some people mark each token with a drop of colored nail polish. I used a Dymo labeler.  But in any event recording which key knows about which website is valuable.

>Pro-tip: a separate vault entry for each key can be helpful too. You can make notes about which tokens, stored offsite, need to be updated when they become accessible.

Here's a trick I like to use for 2FA: at the end of the *Name*

* 🗝 uses a simple password;
* ⏰ uses a TOTP key
* 📞 uses SMS
* 🔒 uses a FIDE2/WebAuthn hardware security key
* ❓️has those dreadful "security questions" as a recovery workflow
* ✉ uses email 2FA (wtf!)

>I don't work with passkeys yet, but when I do, I'll add a 🩻 (skeleton) to represent it.

Go ahead and be creative. With this system I can search for the emoji itself or search for the normal name of the item.
