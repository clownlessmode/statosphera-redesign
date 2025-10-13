import ReactMarkdown from "react-markdown";

interface BlockNoteDisplayProps {
  content: string;
  className?: string;
}

export function BlockNoteDisplay({
  content,
  className = "",
}: BlockNoteDisplayProps) {
  const renderMessageContent = () => {
    // Проверяем, является ли контент JSON (BlockNote формат)
    const isBlockNoteFormat = (content: string): boolean => {
      try {
        const parsed = JSON.parse(content);
        return Array.isArray(parsed) && parsed.length > 0 && parsed[0].type;
      } catch {
        return false;
      }
    };

    // Если это BlockNote формат, парсим как JSON
    if (isBlockNoteFormat(content)) {
      try {
        const parsedContent = JSON.parse(content);

        if (!Array.isArray(parsedContent) || parsedContent.length === 0) {
          return (
            <div className="text-muted-foreground text-sm">
              Сообщение пустое
            </div>
          );
        }

        return parsedContent.map((block: any, index: number) => {
          switch (block.type) {
            case "paragraph":
              if (!block.content || block.content.length === 0) {
                return <br key={index} />;
              }
              return (
                <p key={index} className="mb-2">
                  {block.content?.map((item: any, itemIndex: number) => {
                    let textElement = <span key={itemIndex}>{item.text}</span>;

                    // Применяем стили текста
                    if (item.styles) {
                      if (item.styles.bold) {
                        textElement = (
                          <strong key={itemIndex}>{item.text}</strong>
                        );
                      }
                      if (item.styles.italic) {
                        textElement = <em key={itemIndex}>{item.text}</em>;
                      }
                      if (item.styles.underline) {
                        textElement = <u key={itemIndex}>{item.text}</u>;
                      }
                      if (item.styles.strike) {
                        textElement = <s key={itemIndex}>{item.text}</s>;
                      }
                    }

                    return textElement;
                  })}
                </p>
              );

            case "heading": {
              const level = block.props?.level || 1;
              const HeadingComponent =
                level === 1
                  ? "h1"
                  : level === 2
                    ? "h2"
                    : level === 3
                      ? "h3"
                      : level === 4
                        ? "h4"
                        : level === 5
                          ? "h5"
                          : "h6";

              const headingStyle =
                block.props?.backgroundColor === "green"
                  ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded"
                  : "";

              return (
                <HeadingComponent
                  key={index}
                  className={`font-semibold mb-2 ${headingStyle}`}
                >
                  {block.content?.map((item: any, itemIndex: number) => {
                    let textElement = <span key={itemIndex}>{item.text}</span>;

                    if (item.styles) {
                      if (item.styles.bold) {
                        textElement = (
                          <strong key={itemIndex}>{item.text}</strong>
                        );
                      }
                      if (item.styles.italic) {
                        textElement = <em key={itemIndex}>{item.text}</em>;
                      }
                      if (item.styles.underline) {
                        textElement = <u key={itemIndex}>{item.text}</u>;
                      }
                      if (item.styles.strike) {
                        textElement = <s key={itemIndex}>{item.text}</s>;
                      }
                    }

                    return textElement;
                  })}
                </HeadingComponent>
              );
            }

            case "bulletListItem":
              return (
                <ul key={index} className="list-disc list-inside mb-2">
                  <li>
                    {block.content?.map((item: any, itemIndex: number) => {
                      let textElement = (
                        <span key={itemIndex}>{item.text}</span>
                      );

                      if (item.styles) {
                        if (item.styles.bold) {
                          textElement = (
                            <strong key={itemIndex}>{item.text}</strong>
                          );
                        }
                        if (item.styles.italic) {
                          textElement = <em key={itemIndex}>{item.text}</em>;
                        }
                        if (item.styles.underline) {
                          textElement = <u key={itemIndex}>{item.text}</u>;
                        }
                        if (item.styles.strike) {
                          textElement = <s key={itemIndex}>{item.text}</s>;
                        }
                      }

                      return textElement;
                    })}
                  </li>
                </ul>
              );

            case "numberedListItem":
              return (
                <ol key={index} className="list-decimal list-inside mb-2">
                  <li>
                    {block.content?.map((item: any, itemIndex: number) => {
                      let textElement = (
                        <span key={itemIndex}>{item.text}</span>
                      );

                      if (item.styles) {
                        if (item.styles.bold) {
                          textElement = (
                            <strong key={itemIndex}>{item.text}</strong>
                          );
                        }
                        if (item.styles.italic) {
                          textElement = <em key={itemIndex}>{item.text}</em>;
                        }
                        if (item.styles.underline) {
                          textElement = <u key={itemIndex}>{item.text}</u>;
                        }
                        if (item.styles.strike) {
                          textElement = <s key={itemIndex}>{item.text}</s>;
                        }
                      }

                      return textElement;
                    })}
                  </li>
                </ol>
              );

            case "checkListItem":
              return (
                <div key={index} className="flex items-start mb-2">
                  <input
                    type="checkbox"
                    checked={block.props?.checked || false}
                    readOnly
                    className="mr-2 mt-1"
                  />
                  <span>
                    {block.content?.map((item: any, itemIndex: number) => {
                      let textElement = (
                        <span key={itemIndex}>{item.text}</span>
                      );

                      if (item.styles) {
                        if (item.styles.bold) {
                          textElement = (
                            <strong key={itemIndex}>{item.text}</strong>
                          );
                        }
                        if (item.styles.italic) {
                          textElement = <em key={itemIndex}>{item.text}</em>;
                        }
                        if (item.styles.underline) {
                          textElement = <u key={itemIndex}>{item.text}</u>;
                        }
                        if (item.styles.strike) {
                          textElement = <s key={itemIndex}>{item.text}</s>;
                        }
                      }

                      return textElement;
                    })}
                  </span>
                </div>
              );

            default:
              return (
                <div key={index} className="mb-2">
                  {block.content?.map((item: any, itemIndex: number) => {
                    let textElement = <span key={itemIndex}>{item.text}</span>;

                    if (item.styles) {
                      if (item.styles.bold) {
                        textElement = (
                          <strong key={itemIndex}>{item.text}</strong>
                        );
                      }
                      if (item.styles.italic) {
                        textElement = <em key={itemIndex}>{item.text}</em>;
                      }
                      if (item.styles.underline) {
                        textElement = <u key={itemIndex}>{item.text}</u>;
                      }
                      if (item.styles.strike) {
                        textElement = <s key={itemIndex}>{item.text}</s>;
                      }
                    }

                    return textElement;
                  })}
                </div>
              );
          }
        });
      } catch (error) {
        console.error("Ошибка парсинга BlockNote контента:", error);
        return (
          <div className="text-muted-foreground text-sm">
            Ошибка отображения сообщения
          </div>
        );
      }
    } else {
      // Если это не BlockNote формат, обрабатываем как Markdown
      return (
        <div className="prose dark:prose-invert prose-base max-w-none">
          <ReactMarkdown
            components={{
              // Кастомизируем компоненты для лучшего отображения
              p: ({ children }) => <p className="mb-2">{children}</p>,
              h1: ({ children }) => (
                <h1 className="text-2xl font-bold mb-3">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl font-bold mb-2">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-bold mb-2">{children}</h3>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-2">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-2">{children}</ol>
              ),
              li: ({ children }) => <li className="mb-1">{children}</li>,
              strong: ({ children }) => (
                <strong className="font-semibold">{children}</strong>
              ),
              em: ({ children }) => <em className="italic">{children}</em>,
              code: ({ children }) => (
                <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="bg-muted p-3 rounded-lg overflow-x-auto mb-2">
                  {children}
                </pre>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-muted-foreground pl-4 italic mb-2">
                  {children}
                </blockquote>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      );
    }
  };

  return (
    <div
      className={`prose dark:prose-invert prose-base max-w-none ${className}`}
    >
      {renderMessageContent()}
    </div>
  );
}
