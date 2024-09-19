import { useState, useEffect } from "react";
import {
  VStack,
  HStack,
  Input,
  Button,
  Text,
  Link as ChakraLink,
  Box,
} from "@chakra-ui/react";
import Link from "next/link";

export async function getServerSideProps() {
  try {
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const host = process.env.VERCEL_URL || "localhost:3000";
    const baseUrl = `${protocol}://${host}`;

    const res = await fetch(`${baseUrl}/api/availablePages`);

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("API response is not JSON");
    }

    const availablePages = await res.json();
    return { props: { availablePages } };
  } catch (error: any) {
    console.error("Error fetching available pages:", error);
    return { props: { availablePages: [], error: error.message } };
  }
}

const Home = ({
  availablePages,
  error,
}: {
  availablePages: number[];
  error?: string;
}) => {
  const [customPage, setCustomPage] = useState("");
  const maxPage = Math.max(...availablePages);

  return (
    <Box p={8} maxWidth="800px" margin="auto">
      <VStack spacing={6} align="stretch">
        <Text fontSize="2xl" fontWeight="bold" textAlign="center">
          Hodina Page Finder
        </Text>

        {error ? (
          <Text color="red.500">{error}</Text>
        ) : (
          <VStack spacing={2} align="stretch">
            {availablePages.map((pageNum: number) => (
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
        )}

        <HStack>
          <Input
            placeholder="Enter custom page number"
            value={customPage}
            onChange={(e) => setCustomPage(e.target.value)}
          />
          <Button
            as={Link}
            href={`/hodina${customPage}`}
            isDisabled={!customPage || parseInt(customPage) > maxPage}
          >
            Go to Page
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Home;
