import { getPreferenceValues } from "@raycast/api";
import { Note } from "./types";
import fs from "fs/promises";
import path from "path";
import { kebabCase } from "./utils";

const preferences = getPreferenceValues<ExtensionPreferences>();

export async function fileExists(file: string) {
  return fs
    .access(file, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
}

// get a single note given it's filename
export async function getNote(file: string): Promise<Note> {
  if (!file) {
    throw new Error("File name must be provided");
  }

  if (!fileExists(file)) {
    throw new Error(`File ${file} does not exist`);
  }

  const text = (await fs.readFile(path.join(preferences.dataPath, file))).toString("utf-8");

  // title is the in the first line, as these are markdown files, so the title
  // is a h1, so remove only the # from the front.

  let title: string;
  let content: string;

  // if has a heading, use that as the title, otherwise use the filename
  if (text.startsWith("#")) {
    title = text.split("\n")[0].replace(/^#/, "").trim();
    content = text.split("\n").slice(1).join("\n").trim();
  } else {
    title = file;
    content = text.trim();
  }

  // const stats = await fs.stat(path.join(preferences.dataPath, file));
  // const createdAt = stats.birthtime;
  // const lastEdited = stats.mtime;

  return {
    title,
    content,
    // createdAt,
    // lastEdited,
  };
}

// get all file names from the folder preferences.dataPath
export async function getAllNotes(): Promise<Note[]> {
  const files = await fs.readdir(preferences.dataPath);

  const notes: Note[] = [];
  for (const file of files) {
    if (!file.endsWith(".md")) continue;

    const note = await getNote(file);
    notes.push(note);
  }
  return notes;
}

export async function saveNote(note: Note) {
  const filename = kebabCase(note.title) + '.md';
  const file = path.join(preferences.dataPath, filename);
  const text = `# ${note.title}\n\n${note.content}`;

  await fs.writeFile(file, text);
}

export async function deleteNote(note: Note) {
  const filename = `${note.title}.md`;
  const file = path.join(preferences.dataPath, filename);
  await fs.unlink(file);
}
