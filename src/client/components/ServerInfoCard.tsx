import React from "react"
import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react"
import { ServerInfo } from "../../../types/types"

export const ServerInfoCard = ({ serverInfo }: { serverInfo: ServerInfo }) => {
  return (
    <Box
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"base"}
      p={6}
    >
      <Heading fontSize="xl">Servidor</Heading>
      <Text mt={4}>URL: {serverInfo.url}</Text>
      <Text>Puerto: {serverInfo.port}</Text>
      <Text>Puerto https: {serverInfo.https_port}</Text>
      <Text>Protocolo: {serverInfo.server_protocol}</Text>
    </Box>
  )
}
