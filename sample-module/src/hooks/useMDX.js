import {useEffect, useState} from "react";
import * as runtime from "react/jsx-runtime";
import {evaluate, nodeTypes} from "@mdx-js/mdx";
import * as provider from "@mdx-js/react";
import {toc} from "rehype-toc";

export const useMDX = (content) => {
  const [exports, setExports] = useState({ default: runtime.Fragment });
  useEffect(() => {
    evaluate(content, {
      ...provider,
      ...runtime,
      remarkPlugins: [],
      rehypePlugins: [
        [
          toc,
          {
            passThrough: nodeTypes,
            headings: ["h1", "h2"],
          }
        ],
      ],
    })
      .then((exports) => {
        setExports(exports);
      })
      .catch((e) => {
        // NOTE: Do nothing
      })
  }, [content]);

  return exports?.default;
}