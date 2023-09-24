import { closeMainWindow } from "@raycast/api";
import { hideTimer } from "./utils";

export default async function () {
  await hideTimer();
  await closeMainWindow();
}
