import { InputField } from "../local-custom-extensions";
import {
  CharacterCount,
  Color,
  Focus,
  Heading,
  Highlight,
  ImageBlock,
  Placeholder,
  Selection,
  SlashCommand,
  StarterKit,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TaskItem,
  TaskList,
  TextAlign,
  TextStyle,
  Typography,
  Underline,
} from ".";
import { ImageUpload } from "./ImageUpload";

export const ExtensionKit = () => [
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Selection,
  Heading.configure({
    levels: [1, 2, 3, 4, 5, 6],
  }),
  StarterKit.configure({
    heading: false,
    blockquote: false,
  }),
  TextStyle,
  Color,
  Highlight.configure({ multicolor: true }),
  Underline,
  CharacterCount.configure({ limit: 50000 }),
  ImageUpload.configure(), // TODO TIPTAP check
  ImageBlock,
  TextAlign.extend({
    addKeyboardShortcuts() {
      return {};
    },
  }).configure({
    types: ["heading", "paragraph"],
  }),
  Table,
  TableCell,
  TableHeader,
  TableRow,
  Typography,
  Placeholder.configure({
    includeChildren: true,
    showOnlyCurrent: false,
    placeholder: () => "",
  }),
  SlashCommand,
  Focus,
  // Figcaption,
  // BlockquoteFigure,
  // Dropcursor.configure({
  //   width: 2,
  //   class: "ProseMirror-dropcursor border-black",
  // }),

  // Local custom
  InputField,
];

export default ExtensionKit;
