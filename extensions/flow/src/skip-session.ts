import { showHUD } from "@raycast/api";
import { skipSession } from "./utils";

export default async function () {
  await skipSession();
  await showHUD("Session skipped");
}
