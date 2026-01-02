# n8n-nodes-fireblocks

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

A comprehensive n8n community node for the Fireblocks institutional digital asset custody platform. Fireblocks provides enterprise-grade MPC wallet infrastructure, custody solutions, and treasury management APIs used by major financial institutions.

![n8n](https://img.shields.io/badge/n8n-community--node-orange)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![Fireblocks API](https://img.shields.io/badge/Fireblocks-API%20v1-FF6F2F)

## Features

- **15 Resource Categories** with 100+ operations
- **Vault Management**: Create, manage, and monitor vault accounts and wallets
- **Transaction Operations**: Send, receive, track, and manage digital asset transfers
- **Staking**: Stake, unstake, and claim rewards across multiple protocols
- **NFT Management**: Track, transfer, and manage NFT collections
- **Smart Contracts**: Deploy, interact with, and manage smart contracts
- **Exchange Integration**: Connect and manage exchange accounts
- **Network Connections**: Inter-workspace asset transfers
- **Policy Management**: Configure and manage TAP (Transaction Authorization Policy)
- **Real-time Webhooks**: Receive instant notifications for events
- **JWT Authentication**: Secure RS256-signed API requests

## Installation

### Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings** → **Community Nodes**
3. Click **Install a community node**
4. Enter `n8n-nodes-fireblocks`
5. Click **Install**

### Manual Installation

```bash
# Navigate to your n8n installation directory
cd ~/.n8n

# Install the package
npm install n8n-nodes-fireblocks
```

### Development Installation

```bash
# Clone the repository
git clone https://github.com/Velocity-BPA/n8n-nodes-fireblocks.git
cd n8n-nodes-fireblocks

# Install dependencies
npm install

# Build the project
npm run build

# Link to n8n
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-fireblocks

# Restart n8n
n8n start
```

## Credentials Setup

### Fireblocks API Credentials

| Field | Description |
|-------|-------------|
| **API Key** | Your Fireblocks API key (UUID format) from workspace settings |
| **Private Key** | RSA-4096 private key in PEM format for JWT signing |
| **Environment** | Production (`api.fireblocks.io`) or Sandbox (`sandbox-api.fireblocks.io`) |

### Getting API Credentials

1. Log into your Fireblocks workspace
2. Navigate to **Settings** → **API Users**
3. Create a new API user or select an existing one
4. Copy the **API Key**
5. Download or copy the **Private Key** (RSA-4096)
6. Configure permissions based on operations needed

## Resources & Operations

### Vault Account
- List, Get, Create, Update vault accounts
- Hide/Unhide from console
- Get balance, Set auto-fuel
- Set customer reference ID for AML

### Vault Wallet
- List wallets, Create (activate asset)
- Get asset details, Refresh balance
- List/Create addresses
- Get UTXO information
- Convert legacy addresses

### Transaction
- List, Get transactions
- Create new transfers
- Estimate fees
- Cancel, Freeze, Unfreeze
- Drop (replace stuck transactions)
- Validate addresses

### Exchange Account
- List connected exchanges
- Get exchange details
- Internal transfers between sub-accounts
- Asset conversion

### Internal/External Wallet
- Manage whitelisted addresses
- Add/remove assets
- Set customer reference IDs

### Gas Station
- Configure auto-fueling settings
- Set thresholds and caps
- Asset-specific configuration

### Asset
- List supported assets
- Register custom tokens
- Update metadata
- Set custom pricing
- List blockchains

### Staking
- List supported chains
- Stake, Unstake, Withdraw
- Claim rewards
- List positions
- View providers/validators

### NFT
- Refresh vault tokens
- List owned tokens/collections
- Get NFT details
- Update ownership/spam status

### Smart Contract
- Manage contract templates
- Deploy contracts
- Read/Write contract functions
- Fetch/Save ABIs

### Network Connection
- Manage inter-workspace connections
- Configure routing policies
- Manage network identifiers

### Webhook
- Create/manage webhooks
- Get delivery metrics
- Resend notifications

### User
- List workspace users
- Manage user groups

### Policy
- Get active/draft policies
- Update TAP rules
- Publish policy changes

## Trigger Node

The **Fireblocks Trigger** node receives real-time webhook events:

### Transaction Events
- Transaction Created/Completed/Failed
- Status changes
- Approval required
- Policy blocked

### Vault Events
- Account created/updated
- Address created
- Balance changes

### Staking Events
- Position created
- Rewards available
- Unstaking completed

### NFT Events
- NFT received/sent

### Network Events
- Connection created/removed

## Usage Examples

### Automated Treasury Sweeping

```
Trigger: Schedule (daily)
    ↓
Fireblocks: List Vault Accounts
    ↓
Loop: For each account
    ↓
    Fireblocks: Get Balance
        ↓
    IF: Balance > threshold
        ↓
        Fireblocks: Create Transaction
            (Transfer to omnibus account)
```

### Exchange Rebalancing

```
Fireblocks Trigger: Balance Updated
    ↓
IF: Balance deviation > 5%
    ↓
Fireblocks: List Exchange Accounts
    ↓
Fireblocks: Internal Transfer
    ↓
Slack: Notify treasury team
```

### Staking Automation

```
Schedule: Weekly
    ↓
Fireblocks: Get Positions Summary
    ↓
Fireblocks: Claim Rewards
    ↓
Fireblocks: Stake (compound rewards)
    ↓
Database: Log staking activity
```

### Transaction Monitoring

```
Fireblocks Trigger: Transaction Status Changed
    ↓
Switch: By status
    ↓
    COMPLETED → Database: Update record
    FAILED → Email: Alert operations
    BLOCKED → Slack: Notify compliance
```

## Fireblocks Concepts

| Term | Description |
|------|-------------|
| **Vault Account** | Logical container for asset wallets using MPC technology |
| **Vault Wallet** | Asset-specific wallet within a vault account |
| **MPC** | Multi-Party Computation - distributed key management |
| **TAP** | Transaction Authorization Policy - approval rules engine |
| **Gas Station** | Automated fee funding system for transactions |
| **Network Connection** | Secure inter-workspace asset transfer channel |
| **Co-Signer** | Additional transaction approval component |

## Error Handling

The node includes comprehensive error handling:

- **Rate Limiting**: Automatic retry with exponential backoff on 429 responses
- **Authentication**: Clear errors for JWT signing issues
- **Validation**: Input validation before API calls
- **Fireblocks Errors**: Mapped error codes with descriptive messages

Common error codes:
- `1000`: Invalid API key
- `1001`: Invalid signature
- `1002`: Insufficient permissions
- `1003`: Rate limit exceeded
- `2000`: Invalid request body
- `3000`: Resource not found

## Security Best Practices

1. **Store Private Keys Securely**: Use n8n's credential encryption
2. **Limit API Permissions**: Only grant necessary permissions
3. **Use Sandbox First**: Test workflows in sandbox environment
4. **Validate Webhooks**: Always configure webhook secrets
5. **Monitor Activity**: Use the audit log for compliance
6. **Implement TAP**: Configure approval policies for large transfers

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode
npm run dev

# Lint
npm run lint

# Fix lint issues
npm run lint:fix

# Run tests
npm test

# Test with coverage
npm run test:coverage
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service,
or paid automation offering requires a commercial license.

For licensing inquiries:
**licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

- **Documentation**: [Fireblocks API Docs](https://docs.fireblocks.com/api/)
- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-fireblocks/issues)
- **n8n Community**: [n8n Community Forum](https://community.n8n.io/)

## Acknowledgments

- [Fireblocks](https://fireblocks.com) for their comprehensive API documentation
- [n8n](https://n8n.io) for the workflow automation platform
- The open-source community for inspiration and contributions
