import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import imageCompression from "browser-image-compression";
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Image,
  Button,
  Link,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";

function Hodina5() {
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [originalFormat, setOriginalFormat] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setIsLoading(true);

      try {
        const format = file.type.split("/")[1];
        setOriginalFormat(format);

        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          fileType: `image/${format}`,
        };

        const compressedFile = await imageCompression(file, options);
        const url = URL.createObjectURL(compressedFile);
        setCompressedImage(url);
      } catch (error) {
        console.error("Error compressing image:", error);
        toast({
          title: "Compression failed",
          description: "Failed to compress image. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [toast]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center">
          Image Compression Tool
        </Heading>
        <Box
          {...getRootProps()}
          borderWidth={2}
          borderStyle="dashed"
          borderRadius="md"
          p={8}
          textAlign="center"
          cursor="pointer"
          bg={isDragActive ? "gray.100" : "white"}
          transition="background-color 0.2s"
          _hover={{ bg: "gray.50" }}
        >
          <input {...getInputProps()} />
          <VStack spacing={4}>
            <AttachmentIcon boxSize={10} color="gray.500" />
            <Text>
              {isDragActive
                ? "Drop the image here ..."
                : "Drag 'n' drop an image here, or click to select one"}
            </Text>
          </VStack>
        </Box>
        {isLoading && (
          <VStack>
            <Spinner size="xl" />
            <Text>Compressing image...</Text>
          </VStack>
        )}
        {compressedImage && (
          <VStack spacing={4} w="full">
            <Heading as="h2" size="lg">
              Compressed Image
            </Heading>
            <Image
              src={compressedImage}
              alt="Compressed"
              maxW="700px"
              borderRadius="md"
              boxShadow="lg"
            />
            <Link
              href={compressedImage}
              download={`compressed_image.${originalFormat}`}
            >
              <Button colorScheme="blue">Download Compressed Image</Button>
            </Link>
          </VStack>
        )}
      </VStack>
    </Container>
  );
}

export default Hodina5;
