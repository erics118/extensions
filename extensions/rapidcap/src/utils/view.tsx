import { Detail, Icon, Action, ActionPanel, useNavigation } from "@raycast/api";
import { Note } from "./types";
import DeleteNoteAction from "./delete";
import EditNoteAction from "./edit";

export default function ViewNoteAction(props: {
  note: Note;
  onEdit: ({ title, content }: Note) => void;
  onDelete: () => void;
}) {
  const { note } = props;

  return (
    <Action.Push
      icon={Icon.AppWindowSidebarRight}
      title="View Note"
      target={<ViewNoteDetail note={note} onEdit={props.onEdit} onDelete={props.onDelete} />}
    />
  );
}

function ViewNoteDetail(props: { note: Note; onEdit: ({ title, content }: Note) => void; onDelete: () => void }) {
  const { note, onEdit, onDelete } = props;
  const { pop } = useNavigation();

  const markdown = `# ${note.title}\n\n${note.content}`;

  return (
    <Detail
      navigationTitle="View Note Details"
      markdown={markdown}
      // metadata={
      //   <Detail.Metadata>
      //     <Detail.Metadata.Label title="Created At" text={note.createdAt.toLocaleString()} />
      //     <Detail.Metadata.Label title="Last Edited" text={note.lastEdited.toLocaleString()} />
      //   </Detail.Metadata>
      // }
      actions={
        <ActionPanel>
          <EditNoteAction
            note={note}
            onEdit={(updatedNote) => {
              onEdit(updatedNote);
              pop();
            }}
          />
          <DeleteNoteAction
            onDelete={() => {
              onDelete();
              pop();
            }}
          />
        </ActionPanel>
      }
    />
  );
}
