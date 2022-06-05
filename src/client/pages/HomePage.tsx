import React, { ChangeEvent, useState } from "react"
import {
  Box,
  Button,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"

export const HomePage = () => {
  const [host, setHost] = useState("")
  const [port, setPort] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleChangeHost = (e: ChangeEvent<HTMLInputElement>) => {
    setHost(e.currentTarget.value)
  }

  const handleChangePort = (e: ChangeEvent<HTMLInputElement>) => {
    setPort(e.currentTarget.value)
  }

  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value)
  }

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }

  return (
    <Box className="Home" bg={useColorModeValue("gray.50", "gray.900")}>
      <Flex h={"calc(100vh - 8rem)"} align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={"xxl"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Xtream Codes
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              toda la información de tu IPTV 📺
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.800")}
            boxShadow={"base"}
            p={8}
          >
            <Stack spacing={4}>
              <HStack display={{ base: "none", md: "flex" }}>
                <Box>
                  <FormControl id="host" isRequired>
                    <FormLabel>Host</FormLabel>
                    <Input
                      type="text"
                      value={host}
                      onChange={handleChangeHost}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="port" isRequired>
                    <FormLabel>Puerto</FormLabel>
                    <Input
                      type="text"
                      value={port}
                      onChange={handleChangePort}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="username" isRequired>
                    <FormLabel>Usuario</FormLabel>
                    <Input
                      type="text"
                      value={username}
                      onChange={handleChangeUsername}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="password" isRequired>
                    <FormLabel>Contraseña</FormLabel>
                    <Input
                      type="text"
                      value={password}
                      onChange={handleChangePassword}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <Stack display={{ md: "none" }}>
                <Box>
                  <FormControl id="host" isRequired>
                    <FormLabel>Host</FormLabel>
                    <Input
                      type="text"
                      value={host}
                      onChange={handleChangeHost}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="port" isRequired>
                    <FormLabel>Puerto</FormLabel>
                    <Input
                      type="text"
                      value={port}
                      onChange={handleChangePort}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="username" isRequired>
                    <FormLabel>Usuario</FormLabel>
                    <Input
                      type="text"
                      value={username}
                      onChange={handleChangeUsername}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="password" isRequired>
                    <FormLabel>Contraseña</FormLabel>
                    <Input
                      type="text"
                      value={password}
                      onChange={handleChangePassword}
                    />
                  </FormControl>
                </Box>
              </Stack>

              <Stack spacing={10} pt={2}>
                <Button
                  size="lg"
                  _hover={{
                    bg: useColorModeValue("blue.600", "blue.300"),
                  }}
                  as={Link}
                  to={`/info?host=${host}&port=${port}&username=${username}&password=${password}`}
                >
                  Ver información
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Box>
  )
}
