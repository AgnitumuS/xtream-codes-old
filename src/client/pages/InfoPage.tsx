import React, { ChangeEvent, useState } from "react"
import {
  Box,
  Button,
  Container,
  HStack,
  Select,
  Link,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react"
import { IoMdRefresh } from "react-icons/io"
import { useSearchParams } from "react-router-dom"
import { DownloadIcon } from "@chakra-ui/icons"

import { UserInfoCard } from "../components/UserInfoCard"
import { ServerInfoCard } from "../components/ServerInfoCard"

import { ChannelSection } from "../components/ChannelSection"
import { XtreamCodes } from "../../../types/types"
import { UseQueryResult, useQuery } from "react-query"

export const InfoPage = () => {
  const bgPageColor = useColorModeValue("gray.50", "gray.900")
  const bgElement = useColorModeValue("white", "gray.800")
  const bgHoverElement = useColorModeValue("gray.100", "whiteAlpha.200")
  const whiteBlackColor = useColorModeValue("black", "white")

  const [urlSearchParams] = useSearchParams()
  const host = urlSearchParams.get("host")
  const port = urlSearchParams.get("port")
  const username = urlSearchParams.get("username")
  const password = urlSearchParams.get("password")

  const fetchInfo = async () => {
    const response = await fetch(
      `/api/cors/http://${host}:${port}/panel_api.php?username=${username}&password=${password}`
    )
    return response.json()
  }

  const {
    isLoading,
    isRefetching,
    isError,
    error,
    data,
    refetch,
  }: UseQueryResult<XtreamCodes, Error> = useQuery(
    ["info", username],
    fetchInfo
  )

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  if (data === undefined) return <span>undefined...</span>

  return (
    <Box className="Info" bg={bgPageColor} minH={"calc(100vh - 8rem)"}>
      <Container maxW="container.xl" py={2}>
        <Button
          colorScheme={"whiteAlpha"}
          bg={bgElement}
          _hover={{
            textDecoration: "none",
            bg: bgHoverElement,
          }}
          size="sm"
          onClick={() => refetch()}
        >
          <Icon
            as={IoMdRefresh}
            color={isRefetching ? "blue.500" : whiteBlackColor}
            boxSize={5}
          />
        </Button>
      </Container>

      <Container maxW="container.xl">
        <Box
          display={{ base: "none", md: "grid" }}
          gridTemplateColumns="1fr 1fr"
          gridGap={8}
        >
          <UserInfoCard userInfo={data.user_info} />
          <ServerInfoCard serverInfo={data.server_info} />
        </Box>
        <Box display={{ base: "grid", md: "none" }} gridGap={8}>
          <UserInfoCard userInfo={data.user_info} />
          <ServerInfoCard serverInfo={data.server_info} />
        </Box>
      </Container>
      <Container maxW="container.xl" my={10}>
        <DownloadChannels
          outputFormats={data.user_info.allowed_output_formats}
          host={host || ""}
          port={port || ""}
          username={username || ""}
          password={password || ""}
        />
      </Container>
      <Container maxW="container.xl">
        <ChannelSection
          mainCategories={data.categories}
          channels={data.available_channels}
        />
      </Container>
    </Box>
  )
}

const DownloadChannels = ({
  outputFormats,
  host,
  port,
  username,
  password,
}: {
  outputFormats: string[]
  host: string
  port: string
  username: string
  password: string
}) => {
  const [selectedType, setSelectedType] = useState("m3u")
  const [selectedOutput, setSelectedOutput] = useState(outputFormats[0])

  const handleChangeSelectedType = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.currentTarget.value)
  }

  const handleChangeSelectedOutput = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOutput(e.currentTarget.value)
  }
  return (
    <HStack alignItems="center" justifyContent="center">
      <Select
        w="fit-content"
        value={selectedType}
        onChange={handleChangeSelectedType}
      >
        <option key="m3u" value="m3u">
          M3U
        </option>
        <option key="m3u_plus" value="m3u_plus">
          M3U+
        </option>
      </Select>
      <Select
        w="fit-content"
        value={selectedOutput}
        onChange={handleChangeSelectedOutput}
      >
        {outputFormats.map((of) => {
          return (
            <option key={of} value={of}>
              {of}
            </option>
          )
        })}
      </Select>
      <Button
        as={Link}
        leftIcon={<DownloadIcon />}
        href={`http://${host}:${port}/get.php?username=${username}&password=${password}&type=${selectedType}&output=${selectedOutput}`}
        isExternal
      >
        Descargar
      </Button>
    </HStack>
  )
}
