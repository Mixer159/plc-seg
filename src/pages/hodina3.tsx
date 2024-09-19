import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Box, Heading, Flex, Link, Input, Button } from "@chakra-ui/react";

interface Hodina3Props {
  currentDate: string;
}

const Hodina3: React.FC<Hodina3Props> = ({ currentDate }) => {
  const [date, setDate] = useState(new Date(currentDate));
  const [isClient, setIsClient] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Record<string, string>>({});

  useEffect(() => {
    setIsClient(true);
    const storedComments = localStorage.getItem("comments");
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    const selectedDate = date.toISOString().split("T")[0];
    setComments((prevComments) => {
      const updatedComments = { ...prevComments, [selectedDate]: comment };
      localStorage.setItem("comments", JSON.stringify(updatedComments));
      return updatedComments;
    });
    setComment("");
  };

  return (
    <Box>
      {/* Navigation Bar */}
      <Flex
        as="nav"
        bg="gray.100"
        p={4}
        justifyContent="space-between"
        flexDirection={{ base: "column", md: "row" }}
      >
        <Flex as="ul" listStyleType="none" m={0} p={0}>
          <Box as="li" mr={4} mb={{ base: 4, md: 0 }}>
            <Link href="/">Home</Link>
          </Box>
          <Box as="li" mr={4} mb={{ base: 4, md: 0 }}>
            <Link href="/about">About</Link>
          </Box>
          <Box as="li">
            <Link href="/contact">Contact</Link>
          </Box>
        </Flex>
      </Flex>

      {/* Heading */}
      <Heading as="h1" bg="gray.200" p={8} textAlign="center">
        Welcome to Hodina 3
      </Heading>

      {/* Calendar */}
      {isClient && (
        <Box mt={8}>
          <Calendar
            value={date}
            onChange={(value) => setDate(value as Date)}
            tileContent={({ date, view }) => {
              const selectedDate = date.toISOString().split("T")[0];
              const comment = comments[selectedDate];
              return view === "month" && comment ? <Box>{comment}</Box> : null;
            }}
          />
          <Box mt={4}>
            <Input
              value={comment}
              onChange={handleCommentChange}
              placeholder="Enter comment"
            />
            <Button mt={2} onClick={handleCommentSubmit}>
              Add Comment
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps<
  Hodina3Props
> = async () => {
  const currentDate = new Date().toISOString();
  return {
    props: {
      currentDate,
    },
  };
};

export default Hodina3;
