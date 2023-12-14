import { Form, Action, ActionPanel, useNavigation, showToast, Toast } from "@raycast/api";
import { useForm } from "@raycast/utils";
import { useEffect, useState } from "react";
import { saveNote } from "./utils/storage";

function CreateNoteAction() {
  const { pop } = useNavigation();
  const [error, setError] = useState<Error | unknown>();

  useEffect(() => {
    if (error) {
      showToast({
        style: Toast.Style.Failure,
        title: "Something went wrong",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }, [error]);

  const { handleSubmit, itemProps } = useForm<{ title: string; content: string }>({
    onSubmit(values: { title: string; content: string }) {
      try {
        (async () => {
          await saveNote({
            title: values.title,
            content: values.content,
            // createdAt: new Date(),
            // lastEdited: new Date(),
          });

          showToast({
            style: Toast.Style.Success,
            title: "Success!",
            message: "Note successfully created",
          });
        })();
        pop();
      } catch (e) {
        setError(e);
      }
    },
  });

  return (
    <Form
      navigationTitle="Create Note"
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Create Note" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField title="Title" {...itemProps.title} />
      <Form.TextArea title="Content" enableMarkdown={true} {...itemProps.content} />
    </Form>
  );
}

export default CreateNoteAction;
