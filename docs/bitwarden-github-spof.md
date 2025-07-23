
This is a ramble about the notion of a "single point of failure". It's a critical concept in modern
data management, and it directly applies to how your care and feeding of your password database.

## ACID Transactions

When I graduated with my advanced college degree and started working as a software developer, I had a lot of radical ideas and vision. Just a few years in, I ended up working in a most fascinating area, where we were challenged to devise a radical new approach to managing databases.

I was very fortunate to have an excellent mentor (Alan) who was also very patient, as he worked me through the basics of database reliability.
The concept is actually rather simple.  Suppose Alice pays Bob $10 for a latte. From the viewpoint of a database operation, exactly
one of the following things should happen:

1. Alice ends up $10 poorer, and Bob ends up $10 richer -- this is the happy path.
2. The payment does not succeed. Alice's balance does not change. Bob's balance does not change.

Some things that should NEVER happen:

* Alice keeps her $10, Bob doesn't get paid, but Alice gets her latte.
* Alice gets charged $20 but only gets one latte.
* Bob gets paid $20 for only selling one latte.

Furthermore, Cindy may be watching the transactions. At any point, she should only see $10 in flight. Nobody
is counterfeiting money, there's only $10 in process.

...and so on. In more recent years, this concept has been formalized as an [ACID property](https://en.wikipedia.org/wiki/ACID)
of database transactions:

_Atomicity_: A transaction is treated as a single, indivisible unit. Either all operations within the transaction are successfully completed and committed, or none of them are. If any part of the transaction fails, the entire transaction is rolled back to its previous state, preventing partial updates.

_Consistency_: A transaction must bring the database from one valid state to another valid state. It ensures that all data integrity constraints (e.g., primary key constraints, foreign key constraints) are maintained before and after the transaction.

_Isolation_: Concurrent transactions are isolated from each other, meaning that the intermediate results of one transaction are not visible to other concurrent transactions. This prevents interference and ensures that each transaction operates as if it were the only one running.

_Durability_: Once a transaction is committed, its changes are permanently stored and will survive system failures or crashes. This is typically achieved by writing the changes to non-volatile storage.

Every morning I would come into Alan's office with a fresh cup of coffee, and we would discuss how to make our database
ACID. For weeks, he was so supportive: "That's great, Jason! But what happens if...", my tail would sink between my legs,
and I would go back to my desk to answer a new wrinkle or corner case.

_Spoiler: it took most of a month or two, but we figured it out._

## Single Point of Failure (SPOF)

This led to the next problem. Man, that guy was so patient with me. What happens if...

* A computer crashes in the middle of an update.
* A network connection severs during an update.
* A disk crashes during an update?

* Multiple computers crash during an update?
* Multiple disks crash during an update?
* Heck, what if an entire datacenter goes offline?

Based on ACID, the user expects to lose _at most_ a single update. They should get a clear message that this one update
failed (or succeeded). Either Bob got paid or he didn't.  If Alice paid Bob, she should get her latte. If her payment
did not go through, Bob will know and won't give her the latte.

## SPOF in a Password Manager

All of this directly applies to your password datastore. How, exactly?

_Your client machine_

In the Bitwarden architecture, your phone or browser is _not_ a SPOF. It merely holds a cached copy of your vault.

When you edit a vault entry, the changes are _only_ on your machine. When you click "Save", the update is atomically
saved to the Bitwarden servers. There is at worst a window of uncertainty of whether the change was accepted by the server
(such as if your network connection goes down immediately after sending the request).  But even that is ameliorated by
an "idempotent" request framework...but I digress.

_The Bitwarden Server_

So your client machine is not a SPOF. What about the server machine? Your Bitwarden server most assuredly uses a database
with ACID properties, including  MSSQL, PostgreSQL, MySQL, or SQLite. This means that if the server crashes and restarts,
it will lose at most the very last transaction that was sent.

_The Bitwarden Disks_

Your Bitwarden server runs in an Azure datacenter. What if an entire disk fails? In this case,
Azure itself has [disk redundancy options](https://learn.microsoft.com/en-us/azure/virtual-machines/disks-redundancy) for
managing your data. [The details](https://bitwarden.com/help/data-storage/) are a bit vague. It's always a good
idea for you to [have your own backups](https://github.com/djasonpenney/bitwarden_reddit/blob/main/backups.md)
as well as relying on Bitwarden.

_The Azure Data Center_

What if the entire datacenter crashes? This is exactly the same question as the disks. You should make full backups from time to time.

## SPOF in your use of a Password Manager

This gets much more interesting. Preventing a SPOF in your credential datastore is a function of your own behavior.

* _Your Master Password_ -- About once a month, someone in /r/Bitwarden posts in a panic, looking for a super
sneaky back door because they've forgotten their master password. Your brain is a single point of failure! The master password is not optional, and your
memory is not reliable. You need a recovery workflow to regain the master password. In its simplest form,
you need an [emergency sheet](https://github.com/djasonpenney/bitwarden_reddit/blob/main/emergency_kit.md).
* _Your 2FA_ -- if your phone dies, you could lose TOTP for one or more sites, even for Bitwarden itself. If your
drunk uncle sits on your jacket, he could destroy your Yubikey.
* _Your emergency sheet_ -- if you have only one copy of the emergency sheet, it could be destroyed by natural (or unnatural)
disaster.
* _Your backup_ -- if you only have one copy of the backup itself, it could become unreadable; digital media is unreliable.
If your copies of the backup are only in one place, a house fire could destroy all the copies -- essentially a single point
of failure again.
* _Assets to read your backup or emergency sheet_ -- the login to Google Drive where you've stored the backup, the
encryption password for the backup, or possibly even the cloud service itself can all be a SPOF. That's why I
go Old School and just save multiple USB thumb drives in multiple locations. Plus the encryption key for the
backup is similarly distributed -- _in different places from the USB_.
* _Your death_ -- We all part from this mortal coil at some point. When that happens, someone else will need to
pick up the pieces. A court order will not necessarily regain the login to your NAS with all your photographs on it.
A court order may not help them salvage your assets (new roof after that house fire, anyone?). Yes, your death can
potentially be a SPOF.

## Challenge for You

Do you have a single point of failure in your password manager? Are you still vulnerable to risks that are at
least plausible? I mean, I'm not talking about a hundred megaton fusion bomb, but a house fire is not
beyond the realm of possibility.

Think about the way you manage your risk here. An emergency sheet, full backup, and possibly some encryption are
all reasonable answers. It depends on your risk model.
