import { Action, ActionPanel, Clipboard, Form, showHUD } from "@raycast/api";

export type FormValues = {
  text: string;
  sortOrder: "alphabetical" | "reverse" | "random" | "keep";
  deduplicate: boolean;
};

export default function Command() {
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm
            title="Sort"
            onSubmit={(values) => {
              const res = sort(values);
              Clipboard.copy(res);
              showHUD("Sorted");
            }}
          />
        </ActionPanel>
      }
    >
      <Form.TextArea id="text" title="Text" placeholder={"Line 1\nLine 2\n"} />
      <Form.Checkbox
        id="deduplicate"
        title="Duplicates"
        label="Remove Duplicates"
        defaultValue={true}
      />
      <Form.Dropdown
        id="sortOrder"
        title="Sort Order"
        defaultValue="alphabetical"
      >
        <Form.Dropdown.Item value="alphabetical" title="Alphabetical" />
        <Form.Dropdown.Item value="reverse" title="Reverse Alphabetical" />
        <Form.Dropdown.Item value="random" title="Random" />
        <Form.Dropdown.Item value="keep" title="Keep Original Order" />
      </Form.Dropdown>
    </Form>
  );
}

function sort(values: FormValues) {
  let lines = values.text.split("\n");

  switch (values.sortOrder) {
    case "alphabetical":
      lines.sort();
      break;
    case "reverse":
      lines.sort().reverse();
      break;
    case "random":
      lines.sort(() => Math.random() - 0.5);
      break;
    case "keep":
      break;
  }

  if (values.deduplicate) {
    lines = [...new Set(lines)];
  }

  let result = lines.join("\n");

  return result;
}
