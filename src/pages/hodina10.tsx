import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import React, { useState } from "react";

type Record = {
  family: string;
  apartment: string;
};

const Hodina10 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleShowAll = () => {
    setIsModalOpen(true);
  };
  const handleClear = () => {
    setForm({
      family: "",
      apartment: "",
      moveIn: "",
      moveOut: "",
    });
  };
  const [form, setForm] = useState<{
    family: string;
    apartment: string;
    moveIn: string;
    moveOut: string;
  }>({
    family: "",
    apartment: "",
    moveIn: "",
    moveOut: "",
  });
  const [records, setRecords] = useState<Record[]>([]);

  const handleMoveIn = () => {
    if (!form.family || !form.apartment) return;

    setRecords([
      ...records,
      { family: form.family, apartment: form.apartment },
    ]);
    handleClear();
  };

  return (
    <>
      <Container>
        <Heading>Hodina 10</Heading>
        <VStack gap={2} width={"100%"} alignItems={"flex-start"}>
          <HStack width={"100%"}>
            <Text>Rodina: </Text>
            <Input
              type="text"
              value={form.family}
              onChange={(e) => setForm({ ...form, family: e.target.value })}
            />
          </HStack>
          <HStack width={"100%"}>
            <Text>Číslo bytu: </Text>
            <Input
              type="text"
              width={"auto"}
              value={form.apartment}
              onChange={(e) => setForm({ ...form, apartment: e.target.value })}
            />
            <Button px={2} onClick={handleMoveIn}>
              Nastěhovat
            </Button>
          </HStack>
          <HStack width={"100%"}>
            <Text>Číslo bytu: </Text>
            <Input
              type="text"
              width={"auto"}
              value={form.moveOut}
              onChange={(e) => setForm({ ...form, moveOut: e.target.value })}
            />
            <Button px={2}>Vystěhovat</Button>
          </HStack>
          <HStack width={"100%"}>
            <Text>Číslo bytu: </Text>
            <Input
              type="text"
              width={"auto"}
              value={form.apartment}
              onChange={(e) => setForm({ ...form, apartment: e.target.value })}
            />
            <Button px={2}>Zobrazit</Button>
          </HStack>
          <HStack width={"100%"}>
            <Button width={"100%"} onClick={handleClear}>
              Vymař formulář
            </Button>
            <Button width={"100%"} onClick={handleShowAll}>
              Zobrazit vše
            </Button>
          </HStack>
          <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Všechny záznamy</ModalHeader>
              <ModalBody>
                <VStack align="stretch" spacing={4}>
                  {records.length === 0 ? (
                    <Text>Žádné záznamy k zobrazení</Text>
                  ) : (
                    records.map((record, index) => (
                      <Box
                        key={index}
                        p={3}
                        bg="gray.50"
                        borderRadius="md"
                        color={"black"}
                      >
                        <Text>Rodina: {record.family}</Text>
                        <Text>Číslo bytu: {record.apartment}</Text>
                      </Box>
                    ))
                  )}
                </VStack>
              </ModalBody>
            </ModalContent>
          </Modal>
        </VStack>
        <Divider py={2} />
        <VStack>
          <Heading>Zobrazení</Heading>
          <HStack
            gap={4}
            bg={"gray.100"}
            p={2}
            borderRadius={"md"}
            color={"black"}
          >
            <Text>Rodina: {form.family}</Text>
            <Text>Číslo bytu: {form.apartment}</Text>
          </HStack>
        </VStack>
      </Container>
    </>
  );
};

export default Hodina10;
