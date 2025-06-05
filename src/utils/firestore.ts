import { sleep } from './common';

const MAX_RETRIES = 5;
const INITIAL_BACKOFF_MS = 1000;

export async function retryOperation<T>(
  operation: () => Promise<T>,
  retryCount = 0
): Promise<T> {
  try {
    return await operation();
  } catch (error: any) {
    if (retryCount >= MAX_RETRIES) {
      throw error;
    }

    const isRetryableError = 
      error?.code === 'resource-exhausted' || 
      error?.code === 'deadline-exceeded';

    if (!isRetryableError) {
      throw error;
    }

    const backoffMs = INITIAL_BACKOFF_MS * Math.pow(2, retryCount);
    const jitter = Math.random() * 1000;
    await sleep(backoffMs + jitter);

    return retryOperation(operation, retryCount + 1);
  }
}