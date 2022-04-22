import { expect, _electron } from "@playwright/test";
import { downloadAndUnzipVSCode } from "@vscode/test-electron";
import * as scenario from "./scenario.js";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const getBinaryPath = async () => {
  if (process.env.VSCODE_PATH) {
    return process.env.VSCODE_PATH;
  }
  const path = await downloadAndUnzipVSCode("1.66.2");
  return path;
};

export const getTmpDir = () => {
  return mkdtemp(join(tmpdir(), "foo-"));
};

const launch = async ({ tmpDir, userDataDir }) => {
  const binaryPath = await getBinaryPath();
  const child = await _electron.launch({
    args: [
      "--wait",
      "--new-window",
      "--no-sandbox",
      "--disable-updates",
      "--skip-welcome",
      "--skip-release-notes",
      "--disable-workspace-trust",
      "--disable-extensions",
      "--user-data-dir",
      userDataDir,
      ".",
    ],
    cwd: tmpDir,
    executablePath: binaryPath,
  });
  return child;
};

const runScenario = async (scenario) => {
  try {
    const tmpDir = await getTmpDir();
    const userDataDir = await getTmpDir();
    await scenario.beforeSetup({ tmpDir });
    const child = await launch({ tmpDir, userDataDir });
    const page = await child.firstWindow();
    await page.waitForLoadState("networkidle");
    const main = page.locator('[role="main"]');
    await expect(main).toBeVisible({
      timeout: 15_000,
    });
    const notification = page
      .locator("text=All installed extensions are temporarily disabled")
      .first();
    await expect(notification).toBeVisible({
      timeout: 15_000,
    });
    await scenario.setup({ page, tmpDir });
    await scenario.run(page);
  } catch (error) {
    console.error(error);
    console.info(`Scenario exited with code 1`);
    process.exit(1);
  }
};

const main = async () => {
  await runScenario(scenario);
};

main();
