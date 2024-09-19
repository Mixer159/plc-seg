// pages/faq.tsx
import { Box, Container, Flex, VStack } from "@chakra-ui/react";
import FAQItem from "@/components/FAQItem";

const hodina4 = () => {
  const faqData = [
    {
      question: "What is your return policy?",
      answer:
        "Our return policy lasts 30 days. If 30 days have gone by since your purchase...",
    },
    {
      question: "How do I track my order?",
      answer:
        "Once your order has been shipped, we will send you an email with the tracking number...",
    },
    // Add more FAQs as needed
  ];

  return (
    <Container maxW="container.lg">
      <VStack p={8}>
        {faqData.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </VStack>
    </Container>
  );
};

export default hodina4;
