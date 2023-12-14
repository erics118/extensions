import { Action, Icon } from "@raycast/api";

export default function DeleteNoteAction(props: { onDelete: () => void }) {
  return <Action
    icon={Icon.Trash}
    style={Action.Style.Destructive}
    title="Delete Note"
    onAction={props.onDelete}
    shortcut={{ modifiers: ["ctrl"], key: "x" }}
  />;
}
