import { useEffect, useState } from "react";
import { ActionPanel, Alert, confirmAlert, Icon, List, showToast, Toast } from "@raycast/api";
import { Note } from "./utils/types";
import ViewNoteAction from "./utils/view";
import DeleteNoteAction from "./utils/delete";
import EditNoteAction from "./utils/edit";
import { deleteNote, getAllNotes, saveNote } from "./utils/storage";

export default function ViewAllNotes() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    (async () => {
      setNotes(await getAllNotes());
    })();
  }, []);

  async function handleEdit(oldNote: Note, updatedNote: Note) {
    if (oldNote.title !== updatedNote.title) {
      await deleteNote(oldNote);
    }

    await saveNote(updatedNote);
    setNotes(await getAllNotes());
    showToast(Toast.Style.Success, `Updated ${updatedNote.title}`);
    return updatedNote;
  }

  async function handleDelete(note: Note) {
    if (await confirmAlert({
      title: `Do you want to delete ${note.title}?`,
      message: "This action cannot be undone.",
      dismissAction: {
        title: "Cancel",
        style: Alert.ActionStyle.Cancel
      },
      primaryAction: {
        title: "Delete",
        style: Alert.ActionStyle.Destructive
      }
    })) {
      deleteNote(note);
      setNotes(await getAllNotes());
      showToast(Toast.Style.Success, `Deleted ${note.title}`);
    }
  }

  return (
    <List isLoading={!notes}>
      {notes.map((note) => (
        <List.Item
          key={note.title}
          title={note.title}
          subtitle={note.content}
          icon={Icon.AppWindowList}
          actions={
            <ActionPanel>
              <ViewNoteAction
                note={note}
                onEdit={(updatedNote) => handleEdit(note, updatedNote,)}
                onDelete={() => handleDelete(note)}
              />
              <EditNoteAction note={note} onEdit={(updatedNote) => handleEdit(note, updatedNote)} />
              <DeleteNoteAction onDelete={() => handleDelete(note)} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
