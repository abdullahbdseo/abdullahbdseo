<?php
// config/crypto_currencies.php - Supported Cryptocurrency configurations & rates

class CryptoConfig {
    public static function getSupportedCoins(): array {
        return [
            'USDT-TRC20' => [
                'name' => 'Tether USDT (TRC-20)',
                'symbol' => 'USDT',
                'network' => 'TRON (TRC20)',
                'icon' => 'usdt.svg',
                'decimals' => 2,
                'approx_usd_rate' => 1.00,
                'min_amount' => 10.00,
                'default_wallet' => 'TXxxDemoTronWalletAddressForUSDTPayments888',
                'explorer_url' => 'https://tronscan.org/#/transaction/'
            ],
            'USDT-ERC20' => [
                'name' => 'Tether USDT (ERC-20)',
                'symbol' => 'USDT',
                'network' => 'Ethereum (ERC20)',
                'icon' => 'usdt.svg',
                'decimals' => 2,
                'approx_usd_rate' => 1.00,
                'min_amount' => 50.00,
                'default_wallet' => '0x71C...DemoEthereumWalletAddressForUSDT999',
                'explorer_url' => 'https://etherscan.io/tx/'
            ],
            'BTC' => [
                'name' => 'Bitcoin (BTC)',
                'symbol' => 'BTC',
                'network' => 'Bitcoin Mainnet',
                'icon' => 'btc.svg',
                'decimals' => 8,
                'approx_usd_rate' => 64000.00,
                'min_amount' => 0.0005,
                'default_wallet' => 'bc1qdemo...BitcoinSegwitWalletAddress123',
                'explorer_url' => 'https://mempool.space/tx/'
            ],
            'ETH' => [
                'name' => 'Ethereum (ETH)',
                'symbol' => 'ETH',
                'network' => 'Ethereum Mainnet',
                'icon' => 'eth.svg',
                'decimals' => 6,
                'approx_usd_rate' => 3200.00,
                'min_amount' => 0.01,
                'default_wallet' => '0x71C...DemoEthereumWalletAddressForETH999',
                'explorer_url' => 'https://etherscan.io/tx/'
            ],
            'SOL' => [
                'name' => 'Solana (SOL)',
                'symbol' => 'SOL',
                'network' => 'Solana Mainnet',
                'icon' => 'sol.svg',
                'decimals' => 4,
                'approx_usd_rate' => 150.00,
                'min_amount' => 0.1,
                'default_wallet' => 'SoL111DemoSolanaNetworkWalletAddress456',
                'explorer_url' => 'https://solscan.io/tx/'
            ],
        ];
    }

    public static function convertFiatToCrypto(float $fiatAmount, string $coinKey): array {
        $coins = self::getSupportedCoins();
        if (!isset($coins[$coinKey])) {
            $coinKey = 'USDT-TRC20';
        }
        $coin = $coins[$coinKey];
        $rate = $coin['approx_usd_rate'];
        $cryptoAmount = round($fiatAmount / $rate, $coin['decimals']);

        return [
            'coin_key' => $coinKey,
            'symbol' => $coin['symbol'],
            'network' => $coin['network'],
            'rate' => $rate,
            'fiat_amount' => $fiatAmount,
            'crypto_amount' => $cryptoAmount,
            'wallet_address' => $coin['default_wallet']
        ];
    }
}
