// pages/index.tsx
import { useState } from "react";
import { Box, Button, Checkbox, VStack } from "@chakra-ui/react";
import SevenSegmentDisplay from "../components/SevenSegmentDisplay";

const Home = () => {
  const [segments, setSegments] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const toggleSegment = (index: number) => {
    const newSegments = [...segments];
    newSegments[index] = !newSegments[index];
    setSegments(newSegments);
  };

  const generateBitNumber = () => {
    return (
      "0b" +
      segments
        .map((segment) => (segment ? "1" : "0"))
        .reverse()
        .join("")
    );
  };

  return (
    <VStack spacing={4}>
      <SevenSegmentDisplay segments={segments} toggleSegment={toggleSegment} />
      <Box>
        {["A", "B", "C", "D", "E", "F", "G"].map((label, index) => (
          <Checkbox
            key={index}
            isChecked={segments[index]}
            onChange={() => toggleSegment(index)}
            mr={2}
          >
            Segment {label}
          </Checkbox>
        ))}
      </Box>
      <Button onClick={() => alert(`Bit Number: ${generateBitNumber()}`)}>
        Generate Bit Number
      </Button>
    </VStack>
  );
};

export default Home;
