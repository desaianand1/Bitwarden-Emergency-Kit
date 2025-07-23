# System Patterns and Architecture

## Core Security Architecture

### The Two-Threat Model

**Primary Pattern**: All security decisions must address both threats:

1. **Unauthorized Access Prevention**
   - Strong master passwords (4+ word passphrases)
   - 2FA with hardware keys (FIDO2) or TOTP apps
   - Encrypted storage and transmission
   - Device security and malware prevention

2. **Lockout Prevention**
   - Physical emergency sheets in multiple locations
   - Regular backup procedures
   - Recovery code documentation
   - Estate planning integration

### Single Point of Failure (SPOF) Elimination

**Pattern**: Every critical component must have redundancy

- Master password: Written in emergency sheet + memorized
- 2FA device: Hardware key + backup key + recovery codes
- Emergency sheet: Multiple physical copies in different locations
- Backups: Multiple USB drives with different manufacturers
- Encryption keys: Stored separately from encrypted data

## Data Classification and Storage Patterns

### What Goes Where

**Emergency Sheet (Physical, Multiple Locations)**:

- Master password
- Email credentials
- 2FA recovery codes
- Server URLs
- Authenticator app recovery keys

**Vault (Encrypted, Cloud)**:

- Website passwords
- Secure notes
- File attachments
- Personal information (licenses, SSNs, etc.)
- Device passwords and PINs

**Backup Archives (Encrypted, Offline)**:

- Complete vault exports
- TOTP app exports
- Recovery codes for all services
- File attachments
- Organization/Collection data

**Never Store Together**:

- Emergency sheet + backup encryption key
- All copies in same physical location
- Recovery dependencies in circular loops

## Backup Architecture Patterns

### Tiered Backup Strategy

**Tier 1: Essential Emergency Kit**

```
Physical Paper → Safe/Secure Location
├── Master password
├── Email credentials  
├── 2FA recovery codes
└── Basic instructions
```

**Tier 2: Basic Digital Backups**

```
Password-Protected JSON Export
├── Vault data
├── Simple storage (USB/cloud)
└── Regular update schedule
```

**Tier 3: Advanced Encrypted Backups**

```
VeraCrypt Container
├── Multiple vault exports
├── TOTP app exports
├── Recovery codes
├── File attachments
└── Distributed storage
```

**Tier 4: Comprehensive Disaster Recovery**

```
Complete System
├── Encrypted backups
├── Emergency sheets
├── Estate planning
├── Testing procedures
└── SPOF analysis
```

## Technology Stack Patterns

### SvelteKit Emergency Kit App

**Architecture**:

```
Static Site Generation
├── SvelteKit framework
├── Tailwind CSS (utility-first)
├── Lucide Svelte (icons)
├── Print-optimized CSS
└── Offline capability
```

**Component Structure**:

```
src/
├── routes/
│   └── +page.svelte (main form)
├── lib/
│   ├── components/
│   │   ├── FormSection.svelte
│   │   ├── InstructionBox.svelte
│   │   └── PrintHeader.svelte
│   └── styles/
│       └── print.css
└── app.html
```

### Documentation Architecture

**Markdown Structure**:

```
guides/
├── comprehensive-backup-guide.md
├── beginner-security-guide.md
└── emergency-kit-instructions.md

assets/
├── diagrams/
└── templates/
```

## Security Best Practices Patterns

### Password Generation

**Master Password Pattern**:

- 4+ word passphrases from Bitwarden generator
- Avoid special characters that cause autocorrect issues
- Use printable ASCII character set only
- Test across all devices before finalizing

**Backup Password Pattern**:

- 6+ word passphrases for backup encryption
- Store separately from encrypted data
- Include in emergency sheet
- Test decryption before relying on backup

### 2FA Implementation Patterns

**Preferred Hierarchy**:

1. **FIDO2 Hardware Keys** (YubiKey)
   - Multiple keys (personal, home, offsite)
   - PIN protection
   - Backup keys with trusted contacts

2. **TOTP Apps** (Ente Auth preferred)
   - Separate from password manager
   - Cloud backup with recovery key
   - Export capability essential

3. **SMS** (avoid when possible)
   - Vulnerable to SIM swapping
   - Use only as last resort

### Storage Distribution Patterns

**Physical Distribution**:

```
Location 1 (Home)
├── Emergency sheet copy 1
├── USB backup drives (2x different brands)
└── Hardware key (daily use)

Location 2 (Offsite - Family/Safe Deposit)
├── Emergency sheet copy 2
├── USB backup drives (2x different brands)
└── Hardware key (backup)

Location 3 (Trusted Contact)
├── Encryption key (puzzle format)
└── Estate planning documents
```

## Error Prevention Patterns

### Common Failure Modes

**Master Password Issues**:

- Autocorrect corruption → Use plain text editors
- Character encoding problems → Stick to ASCII
- Typos in emergency sheet → Double-check everything
- Memory failure → Never rely on memory alone

**2FA Problems**:

- Lost device → Always have backup method
- No recovery codes → Document everything
- Circular dependencies → Keep recovery info external

**Backup Failures**:

- Untested backups → Regular restore testing
- Single location storage → Multiple locations required
- Encryption key loss → Separate storage essential
- Format obsolescence → Include software installers

### Validation Patterns

**Emergency Sheet Validation**:

- Test login with sheet before storing
- Verify all information is legible
- Check for completeness
- Store in tamper-evident envelope

**Backup Validation**:

- Test restore procedure after creation
- Verify all data is present
- Check encryption/decryption works
- Document any special requirements

## Integration Patterns

### Estate Planning Integration

**Legal Document References**:

- Will mentions emergency sheet locations
- Executor has access instructions
- Power of attorney includes digital assets
- Trust documents reference backup procedures

### Family Communication Patterns

**Information Sharing**:

- Family members know emergency sheet exists
- Trusted contacts understand their role
- Instructions are clear for non-technical users
- Regular updates when information changes

## Maintenance Patterns

### Update Schedules

**Emergency Sheet**: Update immediately when:

- Master password changes
- Email password changes
- 2FA methods change
- Server regions change

**Backups**: Update regularly:

- Monthly for active users
- Quarterly minimum
- After major vault changes
- Before/after travel

**Testing**: Regular validation:

- Annual full restore test
- Semi-annual emergency sheet verification
- Quarterly backup integrity check
- Monthly family communication review
