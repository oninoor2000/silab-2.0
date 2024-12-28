import React from "react";

type EmailTemplateComponent<P = object> = React.ComponentType<P>;

export function createEmailRenderer<P extends object>(
  TemplateComponent: EmailTemplateComponent<P>,
) {
  return async (props: P): Promise<string> => {
    // Dynamically import renderToStaticMarkup only when needed
    const { renderToStaticMarkup } = await import("react-dom/server");
    const reactElement = React.createElement(TemplateComponent, props);
    return renderToStaticMarkup(reactElement);
  };
}
