import { Form, Action, ActionPanel, useNavigation, Icon } from "@raycast/api";
import { FormValidation, useForm } from "@raycast/utils";
import { Note } from "./types";

export default function EditNoteAction(props: { note: Note; onEdit: ({ title, content }: Note) => void }) {
  return (
    <Action.Push
      icon={Icon.Pencil}
      title="Edit Note"
      target={<EditNoteForm note={props.note} onEdit={props.onEdit} />}
      shortcut={{ modifiers: ["cmd"], key: "e" }}
    />
  );
}

function EditNoteForm(props: { note: Note; onEdit: ({ title, content }: Note) => void }) {
  const { onEdit, note } = props;
  const { pop } = useNavigation();

  const { handleSubmit, itemProps } = useForm<Note>({
    onSubmit(values: Note) {
      onEdit({ title: values.title, content: values.content });
      pop();
    },
    initialValues: {
      title: note.title,
      content: note.content,
    },
    validation: {
      title: FormValidation.Required,
      content: FormValidation.Required,
    },
  });

  return (
    <Form
      navigationTitle="Edit Note"
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Update Note" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField title="Title" {...itemProps.title} />
      <Form.TextArea title="Content" enableMarkdown={true} {...itemProps.content} />
    </Form>
  );
}
