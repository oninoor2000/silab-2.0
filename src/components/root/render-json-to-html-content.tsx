// DynamicContent.tsx
import "~/styles/text-editor.css";

import React from "react";
import { type JSONContent } from "@tiptap/core";
import { type renderJsonToHtmlContentProps } from "~/typeSchema/root";

import { generateHTML } from "@tiptap/html";

import { cx } from "class-variance-authority";
import { UploadImagesPlugin } from "novel/plugins";

import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Color from "@tiptap/extension-color";
import StarterKit from "@tiptap/starter-kit";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Placeholder from "@tiptap/extension-placeholder";
import HorizontalRule from "@tiptap/extension-horizontal-rule";

const RenderJsonToHtmlContent: React.FC<renderJsonToHtmlContentProps> = ({
  content,
}) => {
  const tiptapLink = Link.configure({
    HTMLAttributes: {
      class: cx(
        "text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer",
      ),
    },
  });

  const tiptapImage = Image.extend({
    addProseMirrorPlugins() {
      return [
        UploadImagesPlugin({
          imageClass: cx("opacity-40 rounded-lg border border-stone-200"),
        }),
      ];
    },
  }).configure({
    allowBase64: true,
    HTMLAttributes: {
      class: cx("rounded-lg border border-muted"),
    },
  });

  const taskList = TaskList.configure({
    HTMLAttributes: {
      class: cx("not-prose pl-2 "),
    },
  });

  const taskItem = TaskItem.configure({
    HTMLAttributes: {
      class: cx("flex gap-2 items-start my-4 nv-font-task-item"),
    },
    nested: true,
  });

  const horizontalRule = HorizontalRule.configure({
    HTMLAttributes: {
      class: cx("mt-4 mb-6 border-t border-muted-foreground"),
    },
  });

  const starterKit = StarterKit.configure({
    bulletList: {
      HTMLAttributes: {
        class: cx("list-disc list-outside leading-3"),
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: cx("list-decimal list-outside leading-3 -mt-4"),
      },
    },
    listItem: {
      HTMLAttributes: {
        class: cx("leading-normal ml-8 -mt-4"),
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: cx("border-l-4 border-primary"),
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class: cx(
          "rounded-md bg-muted text-wrap text-muted-foreground border p-5 font-mono font-medium",
        ),
      },
    },
    code: {
      HTMLAttributes: {
        class: cx("rounded-md bg-muted px-1.5 py-1 font-mono font-medium"),
        spellcheck: "false",
      },
    },
    heading: {
      HTMLAttributes: {
        class: cx("nv-font-title"),
      },
    },
    paragraph: {
      HTMLAttributes: {
        class: cx("nv-font-p"),
      },
    },
    horizontalRule: false,
    dropcursor: {
      color: "#DBEAFE",
      width: 4,
    },
    gapcursor: false,
  });

  const html = generateHTML(JSON.parse(content) as JSONContent, [
    starterKit,
    tiptapLink,
    tiptapImage,
    taskList,
    taskItem,
    horizontalRule,
    Color,
    TextStyle,
    Placeholder,
    Underline,
    Highlight,
  ]);

  return (
    <div
      className="text-justify !leading-loose dark:text-zinc-300"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default RenderJsonToHtmlContent;
