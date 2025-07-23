u/aj0413 suggested that I make a revision of
[this post](https://www.reddit.com/r/Bitwarden/comments/y6d588/making_bitwarden_backups_one_approach). When I went back
to look at it, I decided it would be better if I just started over. Here's my updated version!

# Introduction

For new users of Bitwarden, we recommend creating
[an emergency sheet](https://github.com/djasonpenney/bitwarden_reddit/blob/main/emergency_kit.md). An emergency sheet is a disaster
recovery mitigation. It ensures that if you forget your master password, lose access to your TOTP datastore, or
otherwise get disconnected from the Bitwarden servers, that you can regain access.

A backup goes one step beyond that. It ensures that if the Bitwarden servers disappear or corrupt your datastore, a recent copy of your data is  still recoverable.

# What's in a backup?

A backup needs the following pieces:

## The Emergency Sheet

To my mind, a full backup is a proper superset of an [emergency sheet](https://github.com/djasonpenney/bitwarden_reddit/blob/main/emergency_kit.md). It is a single concise file that will
allow you to regain access to your Bitwarden vault as well as your TOTP datastore.

## Bitwarden Vault Export

This needs to be a [JSON export](https://bitwarden.com/help/export-your-data/). The
"CSV" format is useful but not necessary unless you want to leave the Bitwarden ecosystem. The CSV format is also
an incomplete representation of your vault. For technical reasons, you should create the "password protected" version
of the JSON export. DO NOT USE the "account restricted" export format.

## TOTP datastore

Your "authenticator app" generates those six-digit numerals via the current time of day plus
a secret that you share with the server. You are best served by keeping an export of that app's secrets as well.

## Recovery Codes

Just like Bitwarden has a [2FA recovery code](https://bitwarden.com/help/two-step-recovery-code/), most websites that support strong
authentication also have a recovery workflow. For best security, you don't want to save these in your vault, but it
is definitely best to have these available  for disaster recovery.

## Bitwarden Organization exports

The data in shared Collections must be [exported separately](https://bitwarden.com/help/export-your-data/#export-an-organization-vault). Again, use the
"password protected" version of the JSON export.

## File attachments

Vaults with a premium subscription can have arbitrary files attached to vault entries. If you choose the "encrypted ZIP
format" for your backup, Bitwarden will include these in your export.

If you unwisely choose to eschew the encrypted Zip format, you will need to
download these, by hand, one at a time. In addition, you need to make a text file that explains which file
attachments belong to which vault entry. (More on that last point later.)

## Emergency Sheet

A good Bitwarden backup should also have a top-level `emergency_sheet.txt` for each backup. This is exactly
your [emergency sheet](https://github.com/djasonpenney/bitwarden_reddit/blob/main/emergency_kit.md).

# Creating Your Backup

In the previous version of this guide, I recommended using [VeraCrypt](https://veracrypt.fr/en/Home.html) to create
and maintain the backup. I had painfully detailed instructions on how to use it. I still prefer it. It is like an
encrypted zip archive that you can dynamically read and update. You can set it up so that a decrypted version of your
files is never written to your disk.

However, I think that with a certain amount of aggravation, you can get away with something like
[7-Zip](https://www.7-zip.org/) or [Picocrypt](https://github.com/Picocrypt/Picocrypt). The devil will be in how to
create a new archive without allowing decrypted secrets to ever be written to your hard disk. If you care. But
for the remainder of this guide, I will assume you are using VeraCrypt.

# Backup Organization

In this section I outline a very general format. It allows you to perform backups for yourself as well as other
family members.

## Top Level

The overall image on your USB drive will contain an outermost `AAAREADME.txt` and then the encrypted archive.
The archive might reasonably be called `backup.hc`. You will also save some installers for VeraCrypt.

`AAAREADME.txt` has more information about the backup itself.
You want to explain how this is a VeraCrypt backup and include installers for the app (like VeraCrypt).
`AAAREADME.txt` has no secrets in it. It is a 4-1-1 for the contents of the backup. Its contents should be simple,
like:

```
This is a Bitwarden backup for my family. The backup is encrypted via VeraCrypt. (Hopefully) compatible
installers are enclosed.

You should already have the encryption key to open this backup.
```

`installers/` should be a folder that has the appropriate installation apps for VeraCrypt, on the architectures you
are likely to need.

## Inside `backup.hc`

This an encrypted archive (like with VeraCrypt).

For each vault or Organization collection, create a folder. Inside each folder:

### `emergency_sheet.txt`

This is the full emergency sheet for that vault.

### `bitwarden_export.json` (or similar obvious name)

This is the export of the vault or organization Collection. Be sure to add the
password you chose when you created the export to `emergency_sheet.txt`.

### `recovery_codes.txt`

When you enable strong 2FA, good websites give you a recovery workflow in case you lose
your Yubikey or TOTP app. I know, with everything else you're doing here, this should not be important. But when
it comes to backups, redundancy is a very good thing. [Google](https://support.google.com/accounts/answer/1187538?hl=en&co=GENIE.Platform%3DDesktop), [Microsoft](https://support.microsoft.com/en-us/account-billing/microsoft-account-recovery-code-2acc2f88-e37b-4b44-99d4-b4419f610013),
[Bitwarden](https://bitwarden.com/help/two-step-recovery-code/), and others typically use a one-time code or set of
one-time codes.

There is little point storing these recovery codes in your vault. If you have your Yubikey and your Ente Auth login, the vault storage is not needed. Some
will even argue that having the recovery codes inside your vault is like storing
your TOTP codes in the vault, which to them is anathema.

So what to do? I recommend that this full backup is the right place for this. Make
a text file that properly names each site and gives the list of recovery codes
for each one. For instance,

```text
Hotmail https://outlook.live.com/owa/

recovery code: 1234-5678-9012-3456-7890

-----
Best Buy https://www.bestbuy.com

1234 5678
2345 6789
3456 7890
4567 8901
5678 9012

-----
Docker Hub https://hub.docker.com/

Recovery code: 1234567890abc
```

# Backup Organization

At the outermost level of your USB, you should see something like,

```text
    AAAREADME.txt
    VeraCrypt/
      VeraCrypt Setup 1.26.15.exe
      VeraCrypt_1.26.14.dmg
    backup.hc
```

When you open the encrypted archive, you will see something like,

    mom/
      emergency_sheet.txt
      vault.json
      ente_auth.json
      recovery_codes.txt
    dad/
      emergency_sheet.txt
      vault.json
      ente_auth.json
      recovery_codes.txt
    family_organization/
      family_organization.json

# Storing Your Backup

There are two parts to your backup: the archive file itself, and the encryption password
(the VeraCrypt "volume password"). The security of your backup comes from ensuring
that only authorized parties have access to _both_ parts.

_What about online backups?_

Online backups entail extra steps and create extra risk. You are trusting the online service. There are also a myriad
of extra secrets that must STILL be held outside the cloud: the URL for the archive file, the username, the password,
the 2FA secrets, and the 2FA recovery code. And of course there is still the encryption password, which also must be
stored outside the cloud.

Finally, it's not like your backup is going to be very large. My backup, which includes me, my wife, my brother-in-law,
and a niece, totals to less than 80 megabytes. This is tiny! Amazon will sell you a 10-pack of 1Gb thumb drives
for less than $20.

Don't bother with online backups.  Invest instead in physical copies, offline, in secure locations.

_Offline Storage_

I recommend storing the archive file itself air gapped offline old school: multiple USB thumb drives, in multiple
locations. You want the thumb drives to be in a climate controlled location (not in the glove box of your car). You
don't want them to be tossed around or vibrated, like on your keychain. You want to find a quiet calm corner of
your house.

I like to have pairs of thumb drives, ideally by different manufacturers, in each location. This reduces the risk
that any single design or production defect in the thumb drives will affect all your backups. I put them on a keyring,
and there is a registered Yubikey on each keyring with the thumb drives.

You definitely want to have another pair of thumb drives offsite. If there is a fire, flood, earthquake, or if the
gubbermint comes and takes all your files, you want another backup somewhere else.

# What about that encryption key?

Like I said earlier, the trick here is to ensure that an attacker does not gain access to BOTH your archive file
AND its encryption key. There is no single correct answer. It depends on your exact situation.

_Safe deposit box_ -- If the government is not a threat surface and you have access to a safe deposit box, you
might dispense with encryption entirely and just save the thumb drives there. Not sure if that will appeal to a lot
of people, but it's a thought. Hey, it's climate controlled, fireproof, and burglarproof.

_What I do_ -- My wife has a copy of the encryption key in her Bitwarden vault. If I die first, she will be able to
grab the thumb drives plus Yubikey and open it. Our son, who is the legal executor estate, also has the thumb drives
and Yubikey at his house, and a copy of the encryption key in his vault. If we are out of town and get locked out of
our vault, he can do the needful to get our replacement phones reprovisioned and logged back in. After my wife and I
die, this will give him access to my vault. I also have a copy of the encryption key in my own vault: this doesn't
help with disaster recovery, but it allows me to open my own archive and to update it on a periodic basis.

_One smart Redditor_ -- has a copy of the encryption key next to each set of thumb drives! The trick is that it is in
the form of a puzzle, and only family members know enough to solve the puzzle. Like my solution, this ensures that he,
his spouse, his brothers, or even his parents know enough to open the backup when necessary.

_Trust No One_ -- I almost hate to bring it up, but you should know about
[Shamir's Secret Sharing](https://en.wikipedia.org/wiki/Shamir%27s_secret_sharing). The secret cannot be revealed
unless a quorum of a select group acts together to pool their knowledge." You decide how many parts to split the
secret into, and how many parts of need to be brought together to reconstruct the secret. By the way, there is a
really nice [web implementation](https://simon-frey.com/s4/) of this. Just make sure your browser is offline before
you start assembling the parts.

I say I "almost hate to bring it up", because the operational complexity of this last approach is challenging. Each
member of the group must hold their part carefully. They must know about each other in order to come together, and
you must trust them enough not to collude inappropriately, but enough to be able to cooperate when necessary.
