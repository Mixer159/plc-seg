// components/FAQItem.tsx
import { FC, useState } from "react";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayText, setDisplayText] = useState(question);
  const [textOpacity, setTextOpacity] = useState(1);

  const handleToggle = () => {
    // Start fade out
    setTextOpacity(0);

    // After 500ms, change the text and fade in
    setTimeout(() => {
      setIsOpen(!isOpen);
      setDisplayText(!isOpen ? answer : question);
      // Fade in
      setTextOpacity(1);
    }, 200);
  };

  return (
    <Box mb={4} maxW="500px" width="100%">
      <Box
        as="button"
        onClick={handleToggle}
        bg="gray.100"
        color="black"
        borderRadius="2xl"
        width="100%"
        textAlign="left"
        position="relative"
        _hover={{ bg: "gray.100" }}
        _focus={{ boxShadow: "outline" }}
        px={6}
        py={4}
        minH="100px"
      >
        <Flex align="flex-start" justify="space-between" alignItems="center">
          <Box flex="1" mr={4}>
            <Text
              fontWeight="medium"
              opacity={textOpacity}
              transition="opacity 0.2s"
            >
              {displayText}
            </Text>
          </Box>
          <Icon
            as={AddIcon}
            w={5}
            h={5}
            flexShrink={0}
            mt={1}
            transform={isOpen ? "rotate(45deg)" : "rotate(0deg)"}
            transition="transform 0.2s"
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default FAQItem;
