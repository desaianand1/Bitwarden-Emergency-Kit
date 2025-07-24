# Bitwarden Emergency Kit

[![Emergency Kit App](https://img.shields.io/badge/Emergency%20Kit-View%20App-175DDC?logo=bitwarden&logoColor=white)](https://your-hosted-site.com)     [![Offline Capable](https://img.shields.io/badge/Offline-Available-feca57?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS13aWZpLW9mZi1pY29uIGx1Y2lkZS13aWZpLW9mZiI+PHBhdGggZD0iTTEyIDIwaC4wMSIvPjxwYXRoIGQ9Ik04LjUgMTYuNDI5YTUgNSAwIDAgMSA3IDAiLz48cGF0aCBkPSJNNSAxMi44NTlhMTAgMTAgMCAwIDEgNS4xNy0yLjY5Ii8+PHBhdGggZD0iTTE5IDEyLjg1OWExMCAxMCAwIDAgMC0yLjAwNy0xLjUyMyIvPjxwYXRoIGQ9Ik0yIDguODJhMTUgMTUgMCAwIDEgNC4xNzctMi42NDMiLz48cGF0aCBkPSJNMjIgOC44MmExNSAxNSAwIDAgMC0xMS4yODgtMy43NjQiLz48cGF0aCBkPSJtMiAyIDIwIDIwIi8+PC9zdmc+)](https://github.com/desaianand1/Bitwarden-Emergency-Kit)     [![Print Optimized](https://img.shields.io/badge/Print-Optimized-1dd1a1?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1wcmludGVyLWNoZWNrLWljb24gbHVjaWRlLXByaW50ZXItY2hlY2siPjxwYXRoIGQ9Ik0xMy41IDIySDdhMSAxIDAgMCAxLTEtMXYtNmExIDEgMCAwIDEgMS0xaDEwYTEgMSAwIDAgMSAxIDF2LjUiLz48cGF0aCBkPSJtMTYgMTkgMiAyIDQtNCIvPjxwYXRoIGQ9Ik02IDE4SDRhMiAyIDAgMCAxLTItMnYtNWEyIDIgMCAwIDEgMi0yaDE2YTIgMiAwIDAgMSAyIDJ2MiIvPjxwYXRoIGQ9Ik02IDlWM2ExIDEgMCAwIDEgMS0xaDEwYTEgMSAwIDAgMSAxIDF2NiIvPjwvc3ZnPg==)](https://github.com/desaianand1/Bitwarden-Emergency-Kit)

A comprehensive security backup and recovery system for Bitwarden password manager users. This project addresses the critical "Two-Threat Model" of password security: protecting against both unauthorized access AND lockout from your own vault.

## Emergency Kit Web App

**🔗 [Use the Emergency Kit App](https://emkit.ananddesai.dev)**

The Emergency Kit App generates a printable form that you fill out by hand and store securely. This physical backup ensures you can regain access to your Bitwarden vault even if you forget your master password, lose your phone, or face other emergency scenarios.

**How to use:**

1. Visit the app online or run it locally
2. Click "Save Offline" for maximum security
3. Print the comprehensive form
4. Fill it out by hand with a reliable pen
5. Store copies in multiple secure locations
6. Test the information before storing
7. Update immediately when anything changes

**To run locally:**

```bash
cd emergency-kit-app
pnpm install
pnpm run dev
```

Then visit <http://localhost:5173>

## Security Guides

### Comprehensive Backup & Recovery Guide

**Location:** `guides/comprehensive-backup-guide.md`

**Who it's for:** Existing Bitwarden users who want robust backup strategies

**What it covers:** A four-tier approach from simple emergency kits to advanced encrypted backups with VeraCrypt containers and disaster recovery planning. Includes real user stories, step-by-step instructions, and troubleshooting for common lockout scenarios.

### Beginner's Security Guide  

**Location:** `guides/beginner-security-guide.md`

**Who it's for:** Computer-literate users new to password managers and security practices

**What it covers:** Complete introduction to password security, choosing tools (focuses on Bitwarden + Ente Auth), initial setup with emergency preparedness, daily usage patterns, and maintenance procedures.

## The Problem These Tools Solve

Most people only prepare for unauthorized access to their passwords, but statistically you're far more likely to lose access to your own vault due to:

- Forgotten master passwords
- Lost phones with authenticator apps  
- Device failures or account lockouts
- Death or incapacitation requiring family access

This project provides practical solutions for both threats: keeping others out AND ensuring you (and your family) can always get back in.

## Quick Start

1. **New to password managers?** Start with the Beginner's Security Guide
2. **Already using Bitwarden?** Use the Emergency Kit App and read the Comprehensive Backup Guide  
3. **Want maximum protection?** Follow all four tiers in the Comprehensive Guide

The guides cross-reference each other and the emergency kit app to provide complete coverage for your security needs.

---

> **Made with 🔐 for the CyberSec community**
