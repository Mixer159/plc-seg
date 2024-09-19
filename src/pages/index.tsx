import { VStack, Text, Link as ChakraLink, Box } from "@chakra-ui/react";
import Link from "next/link";

const HODINA_COUNT = 10; // Adjust this number as needed

const Home = () => {
  const hodinaLinks = Array.from({ length: HODINA_COUNT }, (_, i) => i + 1);

  return (
    <Box p={8} maxWidth="800px" margin="auto">
      <VStack spacing={6} align="stretch">
        <Text fontSize="2xl" fontWeight="bold" textAlign="center">
          Hodina Page Finder
        </Text>

        <VStack spacing={2} align="stretch">
          {hodinaLinks.map((pageNum) => (
            <ChakraLink
              key={pageNum}
              as={Link}
              href={`/hodina${pageNum}`}
              p={2}
              borderRadius="md"
              bg="gray.100"
              _hover={{ bg: "gray.200" }}
            >
              Hodina {pageNum}
            </ChakraLink>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default Home;
