import { showHUD } from "@raycast/api";
import { resetTimer, startTimer } from "./utils";

export default async function () {
  await resetTimer();
  await startTimer();
  await showHUD("Timer reset");
}
