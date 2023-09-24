import { showHUD } from "@raycast/api";
import { quitFlow } from "./utils";

export default async function () {
  await quitFlow();
  await showHUD("Flow has been closed");
}
