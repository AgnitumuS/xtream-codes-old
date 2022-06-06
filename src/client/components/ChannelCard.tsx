import React from "react"
import {
  Box,
  HStack,
  Image,
  Tag,
  VStack,
  Text,
  Badge,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react"
import { Channel } from "../../../types/types"
import { useSearchParams } from "react-router-dom"

type ChannelCardProps = {
  channel: Channel
}

export const ChannelCard = (props: ChannelCardProps) => {
  const channel = props.channel

  const [urlSearchParams] = useSearchParams()
  const host = urlSearchParams.get("host")
  const port = urlSearchParams.get("port")
  const username = urlSearchParams.get("username")
  const password = urlSearchParams.get("password")

  const toast = useToast()

  const handleOnClick = () => {
    toast.closeAll()
    navigator.clipboard.writeText(`http://${host}:${port}/${username}/${password}/${channel.stream_id}`)
    toast({
      title: "Enlace copiado",
      description: `Se ha copiado el enlace de ${channel.name} al portapapeles`,
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "bottom-right",
    })
  }

  return (
    <Box
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.800")}
      _hover={{
        bg: useColorModeValue("gray.100", "gray.700"),
        cursor: "pointer",
        transitionProperty: "common",
        transitionDuration: "normal"
      }}
      boxShadow={"base"}
      p={6}
      onClick={handleOnClick}
    >
      <VStack>
        <VStack pb={5}>
          <HStack align="start">
            {channel.stream_icon != null ? (
              <Image
                w="30%"
                src={channel.stream_icon}
                alt={channel.name + " icon"}
                loading={"lazy"}
              />
            ) : null}
            <Text>
              <Tag mr={1}>{channel.stream_id}</Tag>
              {channel.name}
            </Text>
          </HStack>
          {channel.epg_channel_id != null ? (
            <Text>EPG: {channel.epg_channel_id}</Text>
          ) : null}
        </VStack>
        <Text>
          {"Añadido el " +
            new Date(Number(channel.added) * 1000).toLocaleDateString()}
        </Text>
        <HStack>
          <Tag>{channel.category_name}</Tag>
          {new Date().getTime() - Number(channel.added) * 1000 <
          1000 * 60 * 60 * 24 * 30 * 1 ? (
            <Badge colorScheme={"green"}>Nuevo</Badge>
          ) : null}
        </HStack>
      </VStack>
    </Box>
  )
}
