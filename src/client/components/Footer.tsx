import React from "react"
import { Box, Text, Center } from "@chakra-ui/react"

export const Footer = () => {
  return (
    <Box>
      <Center py={4}>
        <Text fontWeight="semibold">
          {new Date().getFullYear() + "."} Proyecto de{" "}
          <a href={"https://github.com/davigon"}>davigon</a>
        </Text>
      </Center>
    </Box>
  )
}
