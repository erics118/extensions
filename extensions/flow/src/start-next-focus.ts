import { Alert, Color, confirmAlert, Icon, showHUD } from "@raycast/api";
import { getCurrentPhase, skipSession, startTimer } from "./utils";

export default async function () {
  const phase = await getCurrentPhase();
  if (phase !== "Flow") {
    await skipSession();
    await startTimer();
    await showHUD("Focus started");
    return;
  }

  const options: Alert.Options = {
    icon: { source: Icon.ExclamationMark, tintColor: Color.Yellow },
    title: "Currently in focus phase",
    message: "Are you sure you want to skip your next break and start a new focus session?",
  };

  if (await confirmAlert(options)) {
    await skipSession();
    await skipSession();
    await startTimer();
    await showHUD("Focus started");
  }
}
