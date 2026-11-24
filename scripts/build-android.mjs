import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, copyFileSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const env = { ...process.env };
const javaHomes = [env.JAVA_HOME, '/opt/android-studio/jbr', '/usr/lib/jvm/java-21-openjdk'].filter(Boolean);
const javaHome = javaHomes.find(path => {
  const result = spawnSync(join(path, 'bin/java'), ['-version'], { encoding: 'utf8' });
  return /version "21[.\"]/.test(result.stderr || '');
});
if (!javaHome) {
  console.error('Java 21 saknas. Installera JDK 21 eller använd Android Studios JDK via JAVA_HOME.');
  process.exit(1);
}
env.JAVA_HOME = javaHome;
const sdk = [env.ANDROID_HOME, env.ANDROID_SDK_ROOT, join(homedir(), 'Android/Sdk'), '/opt/android-sdk']
  .filter(Boolean).find(path => existsSync(join(path, 'platforms')) && existsSync(join(path, 'platform-tools')));
if (!sdk) {
  console.error('Android SDK saknas. Installera SDK:n i Android Studio eller ange dess plats med ANDROID_HOME.');
  process.exit(1);
}
env.ANDROID_HOME = sdk;
function run(command, args, cwd = root) {
  const result = spawnSync(command, args, { cwd, env, stdio: 'inherit' });
  if (result.error) console.error(result.error.message);
  if (result.status !== 0) process.exit(result.status || 1);
}
run(process.execPath, ['node_modules/@capacitor/cli/bin/capacitor', 'sync', 'android']);
run('./gradlew', ['assembleDebug'], join(root, 'android'));
const output = join(root, 'artifacts/bluff-debug.apk');
mkdirSync(dirname(output), { recursive: true });
copyFileSync(join(root, 'android/app/build/outputs/apk/debug/app-debug.apk'), output);
console.log('\nAPK klar: ' + output);
console.log('Detta är en debug-APK för installation och test, inte en Play Store-release.');
