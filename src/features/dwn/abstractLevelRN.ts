import {LevelDB} from 'react-native-leveldb';
import type {BatchOperation} from 'classic-level';

type Callback<T> = (
  err: Error | undefined | null,
  result?: T | undefined,
) => void;

/**
 * not even close to  abstract level.
 * numerous shortcuts. just needed to get it done.
 */
export class AbstractLevelRN extends LevelDB {
  private db: typeof LevelDB;

  constructor(name: string) {
    super(name, true, false);
  }

  // NOOP
  open() {}

  /**
   * same as using del or put individually but batches them up. seems unnecessary but we use it.
   *
   * @param operations an array of either "type" del or put operations
   */
  batch(operations: Array<BatchOperation<typeof this, string, string>>) {
    operations.forEach(op => {
      op.type === 'del' ? super.delete(op.key) : super.put(op.key, op.value);
    });
  }

  /**
   *
   * @param {string} key to get from storage
   * @param {Function} callback called with the key you get from storage
   */
  get(key: string, callback?: Callback<string>) {
    // satisfy types
    const result = super.getStr(key) ?? undefined;

    if (callback) callback(null, result);

    return result;
  }
}
