/**
 * Lightweight namespaced logger.
 *
 * `debug` is silenced in production builds to avoid leaking noise to end users,
 * while `warn`/`error` always surface so operational issues remain visible.
 */
const isProduction = process.env.NODE_ENV === 'production';

const logger = {
  debug: (...args: unknown[]): void => {
    if (!isProduction) {
      console.debug('[fluxity]', ...args);
    }
  },
  warn: (...args: unknown[]): void => {
    console.warn('[fluxity]', ...args);
  },
  error: (message: string, error?: unknown): void => {
    console.error(`[fluxity] ${message}`, error ?? '');
  },
};

export default logger;
