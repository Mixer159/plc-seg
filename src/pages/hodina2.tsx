import React, { useState, useCallback } from "react";
import {
  Box,
  Heading,
  Textarea,
  UnorderedList,
  ListItem,
  Highlight,
} from "@chakra-ui/react";
import debounce from "lodash/debounce"; // You'll need to install lodash

export default function CzechSpellChecker() {
  const [text, setText] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const checkSpelling = async (textToCheck: string) => {
    const response = await fetch("/api/checkSpelling", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: textToCheck }),
    });

    if (response.ok) {
      const { misspelledWords } = await response.json();
      setErrors(misspelledWords);
    }
  };

  // Debounce the checkSpelling function
  const debouncedCheckSpelling = useCallback(
    debounce((text: string) => checkSpelling(text), 300),
    []
  );

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);

    // Check spelling if the last character is a space or newline
    if (newText.slice(-1) === " " || newText.slice(-1) === "\n") {
      debouncedCheckSpelling(newText);
    }
  };

  return (
    <Box p={4}>
      <Heading as="h1" size="lg">
        Czech Spell Checker
      </Heading>
      <Textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Enter Czech text here..."
        mt={4}
      />
      {errors.length > 0 && (
        <Box mt={4}>
          <Heading as="h2" size="md">
            Spelling Errors:
          </Heading>
          <UnorderedList>
            {errors.map((error) => (
              <ListItem key={error}>
                <Highlight
                  query={error}
                  styles={{ bg: "red.100", px: "1", borderRadius: "md" }}
                >
                  {text}
                </Highlight>
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
      )}
    </Box>
  );
}
