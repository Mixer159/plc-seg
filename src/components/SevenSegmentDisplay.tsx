// components/SevenSegmentDisplay.tsx
import { Box } from "@chakra-ui/react";

type SegmentProps = {
  active: boolean;
  orientation?: "horizontal" | "vertical";
};

const Segment = ({ active, orientation = "horizontal" }: SegmentProps) => (
  <Box
    w={orientation === "horizontal" ? "50px" : "10px"}
    h={orientation === "horizontal" ? "10px" : "50px"}
    bg={active ? "red" : "gray.300"}
    m="1"
    borderRadius="md"
  />
);

type DisplayProps = {
  segments: boolean[];
  toggleSegment: (index: number) => void;
};

const SevenSegmentDisplay = ({ segments, toggleSegment }: DisplayProps) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box display="flex" justifyContent="center">
        <Box as="button" onClick={() => toggleSegment(0)}>
          <Segment active={segments[0]} /> {/* Segment A */}
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" width="70px">
        <Box as="button" onClick={() => toggleSegment(5)}>
          <Segment active={segments[5]} orientation="vertical" />{" "}
          {/* Segment F */}
        </Box>
        <Box as="button" onClick={() => toggleSegment(1)}>
          <Segment active={segments[1]} orientation="vertical" />{" "}
          {/* Segment B */}
        </Box>
      </Box>
      <Box display="flex" justifyContent="center">
        <Box as="button" onClick={() => toggleSegment(6)}>
          <Segment active={segments[6]} /> {/* Segment G */}
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" width="70px">
        <Box as="button" onClick={() => toggleSegment(4)}>
          <Segment active={segments[4]} orientation="vertical" />{" "}
          {/* Segment E */}
        </Box>
        <Box as="button" onClick={() => toggleSegment(2)}>
          <Segment active={segments[2]} orientation="vertical" />{" "}
          {/* Segment C */}
        </Box>
      </Box>
      <Box display="flex" justifyContent="center">
        <Box as="button" onClick={() => toggleSegment(3)}>
          <Segment active={segments[3]} /> {/* Segment D */}
        </Box>
      </Box>
    </Box>
  );
};

export default SevenSegmentDisplay;
