import { useEffect } from "react";
import { APP_NAME } from "../lib/constants";

const DESCRIPTION_SELECTOR = 'meta[name="description"]';

export function usePageMetadata({ title, description }) {
  useEffect(() => {
    document.title = title ? `${title} | ${APP_NAME}` : APP_NAME;

    let descriptionTag = document.querySelector(DESCRIPTION_SELECTOR);

    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.setAttribute("name", "description");
      document.head.append(descriptionTag);
    }

    if (description) {
      descriptionTag.setAttribute("content", description);
    }
  }, [title, description]);
}
