import { closeMainWindow } from "@raycast/api";
import { showTimer } from "./utils";

export default async function () {
  await showTimer();
  await closeMainWindow();
}
