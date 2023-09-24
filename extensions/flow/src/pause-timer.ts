import { showHUD } from "@raycast/api";
import { pauseTimer } from "./utils";

export default async function () {
  await pauseTimer();
  await showHUD("Timer paused");
}
