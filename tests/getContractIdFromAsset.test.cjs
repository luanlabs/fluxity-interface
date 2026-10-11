const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { test } = require('node:test');
const { runInThisContext } = require('node:vm');
const { Networks } = require('@stellar/stellar-sdk');
const ts = require('typescript');

// Load the TypeScript helper without adding a test runner dependency.
const filename = join(__dirname, '../src/features/getContractIdFromAsset.ts');
const { outputText } = ts.transpileModule(readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 },
});
const loaded = { exports: {} };
runInThisContext(`(function (exports, require, module) { ${outputText}\n})`, { filename })(
  loaded.exports,
  require,
  loaded,
);
const getContractIdFromAsset = loaded.exports.default;

const issuer = 'GCFIRY65OQE7DFP5KLNS2PF2LVZMUZYJX4OZIEQ36N2IQANUB5XVYOJR';
const native = { asset_type: 'native', balance: '100' };
const usdc = { asset_type: 'credit_alphanum4', asset_code: 'USDC', asset_issuer: issuer };
const longToken = { ...usdc, asset_type: 'credit_alphanum12', asset_code: 'LONGTOKEN' };
const pool = {
  asset_type: 'liquidity_pool_shares',
  liquidity_pool_id: '0'.repeat(64),
  balance: '1',
};
const mainnetContracts = [
  'CAS3J7GYLGXMF6TDJBBYYSE3HQ6BBSMLNUQ34T6TZMYMW2EVH34XOWMA',
  'CDWFVPEN2TZ4KL6QJBKMSI6PUF5IBJCH5VAZHIPQIL7VOF7ZBH6IXL75',
  'CAFWAR3WAZLCBWDE3V2P676O4DQPZKLQPDPMZ2JZBCQ5YNRD2BRAFEBH',
];

test('derives native and both classic asset types on mainnet', () => {
  assert.deepEqual(
    getContractIdFromAsset([native, usdc, longToken], Networks.PUBLIC),
    mainnetContracts,
  );
});

test('uses the selected network when deriving contracts', () => {
  assert.deepEqual(getContractIdFromAsset([native, usdc, longToken], Networks.TESTNET), [
    'CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC',
    'CBSEPCUYEPHCCTB7TJCN746BEA3CMNVBJVPBXE7QL7EDTLMGPK3BNXSM',
    'CALKM5QY5FHLUSZGIVBEJIVHXMNWFKFI435LUZHLPTYFNM2PVV33P4TA',
  ]);
});

test('skips liquidity-pool shares without crashing or shifting valid token order', () => {
  assert.deepEqual(
    getContractIdFromAsset([pool, native, usdc, pool, longToken], Networks.PUBLIC),
    mainnetContracts,
  );
  assert.deepEqual(getContractIdFromAsset([pool], Networks.PUBLIC), []);
});

test('skips malformed entries without losing valid assets', () => {
  const malformed = [
    null,
    undefined,
    {},
    { ...usdc, asset_issuer: undefined },
    { ...usdc, asset_issuer: null },
    { ...usdc, asset_issuer: '' },
    { ...usdc, asset_issuer: 'invalid' },
    { ...usdc, asset_issuer: mainnetContracts[0] },
    { ...usdc, asset_code: undefined },
    { ...usdc, asset_code: null },
    { ...usdc, asset_code: 123 },
    { ...usdc, asset_code: '' },
    { ...usdc, asset_code: 'BAD-CODE' },
    { ...usdc, asset_code: 'TOOLONGTOKEN12' },
    { ...usdc, asset_type: 'unknown' },
    { ...usdc, asset_type: 'liquidity_pool_shares' },
  ];

  assert.deepEqual(
    getContractIdFromAsset([native, ...malformed, usdc, longToken], Networks.PUBLIC),
    mainnetContracts,
  );
});

test('handles an empty wallet', () => {
  assert.deepEqual(getContractIdFromAsset([], Networks.PUBLIC), []);
});
