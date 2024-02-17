# @ubiquibot/comment-incentives

This document outlines the setup for the UbiquiBot comment incentives system, a serverless function hosted by GitHub Actions.

### Default Key Pair for Generating Permits in Development

- Normally other repositories which invoke this plugin (via UbiquiBot) contain the `evmPrivateEncrypted`. 
- The only way to decode it is with our secret `X25519_PRIVATE_KEY` saved within the UbiquiBot kernel's runtime secrets. 
- The only time that the following key pair information is used is during development, when testing this plugin standalone. 
- The account associated with these keys should hold no funds.

|                       |                                                                                                                                                         |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X25519_PRIVATE_KEY`  | `627H-BcWbcp_O3YmQGIA6MqgxVsFuplFCA9DK3iC7GQ`                                                                                                           |
| `X25519_PUBLIC_KEY`   | `nr416sZIvO-g1cnMyP6pNf4-DhQ02tWhP1atk03u4z8`                                                                                                           |
| `evmPrivateEncrypted` | `ndRZX-GoUC-bNdj_F7Buy8wM_FteiT_unbSpwMg1DBPXnnA2i94JNAsA92FfH3SATVPxQcjKFP9AuFK4T056r4zik0f8ROYsG1mbTcA7ftgm7LR24LCJLWIxpPxWxZ2UTUoAMj2pfoX9WYI0nm1-Q` |
| `evmPublicAddress`    | `0x3a2E44e10AbEf5CB4a6E492c5ba93d30068d2D95`                                                                                                            |
| `evmPrivateKey`       | `a29c749482b5d7e5987895a76f3d23002f3a3e1fabb26d370b7403ddead8926a`                                                                                      |


### Generating a new `evmPrivateKeyEncrypted for the ubiquibot-config.yaml`

To generate a new encrypted EVM private key:

**Default: Visit the Key Generation Tool**

Navigate to the permit key generation tool on the web.

**Default: Generate a Key**

Click on the "Generate" button on the webpage to initiate the key generation process.

**Default: Input Your EVM Private Key**

In the provided plain text field, paste your EVM Private Key. Ensure that it is 32 bytes in length.

**Default: Encrypt Your Private Key**

Once you've pasted your private key, click on the "Encrypt" button. This action will encrypt your private key, enhancing its security.

**Default: Update GitHub Secrets**

Copy the newly generated private key and update it on your GitHub Actions secret. Find the field labeled x25519_PRIVATE_KEY and replace its content with your generated x25519 private key.

**Default: Update Configuration File**

Next, take the cipher text, which is the encrypted version of your private key, and paste it into your ubiquibot-config.yaml file. Look for the field labeled evmEncryptedPrivate and replace its content with the cipher text.

**Default: Double Check**

Ensure that you've updated the GitHub Actions secret field x25519_PRIVATE_KEY with your already generated x25519 private key. This double check ensures that all components are aligned and your system remains secure.

**Conclusion**

Congratulations! You've successfully generated and implemented a permit key for your application or platform. By following these steps, you've enhanced the security of your system, safeguarding it against unauthorized access.
# @ubiquibot/comment-incentives

This document outlines the setup for the UbiquiBot comment incentives system, a serverless function hosted by GitHub Actions.

### Default Key Pair for Generating Permits in Development

- Normally other repositories which invoke this plugin (via UbiquiBot) contain the `evmPrivateEncrypted`. 
- The only way to decode it is with our secret `X25519_PRIVATE_KEY` saved within the UbiquiBot kernel's runtime secrets. 
- The only time that the following key pair information is used is during development, when testing this plugin standalone. 
- The account associated with these keys should hold no funds.

|                       |                                                                                                                                                         |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X25519_PRIVATE_KEY`  | `627H-BcWbcp_O3YmQGIA6MqgxVsFuplFCA9DK3iC7GQ`                                                                                                           |
| `X25519_PUBLIC_KEY`   | `nr416sZIvO-g1cnMyP6pNf4-DhQ02tWhP1atk03u4z8`                                                                                                           |
| `evmPrivateEncrypted` | `ndRZX-GoUC-bNdj_F7Buy8wM_FteiT_unbSpwMg1DBPXnnA2i94JNAsA92FfH3SATVPxQcjKFP9AuFK4T056r4zik0f8ROYsG1mbTcA7ftgm7LR24LCJLWIxpPxWxZ2UTUoAMj2pfoX9WYI0nm1-Q` |
| `evmPublicAddress`    | `0x3a2E44e10AbEf5CB4a6E492c5ba93d30068d2D95`                                                                                                            |
| `evmPrivateKey`       | `a29c749482b5d7e5987895a76f3d23002f3a3e1fabb26d370b7403ddead8926a`                                                                                      |


### Generating a new `evmPrivateKeyEncrypted for the ubiquibot-config.yaml`

To generate a new encrypted EVM private key:

**Default: Visit the Key Generation Tool**

Navigate to the permit key generation tool on the web.

**Default: Generate a Key**

Click on the "Generate" button on the webpage to initiate the key generation process.

**Default: Input Your EVM Private Key**

In the provided plain text field, paste your EVM Private Key. Ensure that it is 32 bytes in length.

**Default: Encrypt Your Private Key**

Once you've pasted your private key, click on the "Encrypt" button. This action will encrypt your private key, enhancing its security.

**Default: Update GitHub Secrets**

Copy the newly generated private key and update it on your GitHub Actions secret. Find the field labeled x25519_PRIVATE_KEY and replace its content with your generated x25519 private key.

**Default: Update Configuration File**

Next, take the cipher text, which is the encrypted version of your private key, and paste it into your ubiquibot-config.yaml file. Look for the field labeled evmEncryptedPrivate and replace its content with the cipher text.

**Default: Double Check**

Ensure that you've updated the GitHub Actions secret field x25519_PRIVATE_KEY with your already generated x25519 private key. This double check ensures that all components are aligned and your system remains secure.

**Conclusion**

Congratulations! You've successfully generated and implemented a permit key for your application or platform. By following these steps, you've enhanced the security of your system, safeguarding it against unauthorized access.
