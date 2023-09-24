import { showHUD } from "@raycast/api";
import { startTimer } from "./utils";

export default async function () {
  await startTimer();
  await showHUD("Timer started");
}
