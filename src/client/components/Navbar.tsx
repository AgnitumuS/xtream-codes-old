import React from "react"
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Link,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons"
import { NavLink } from "react-router-dom"

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          colorScheme={"whiteAlpha"}
          bg={useColorModeValue("white", "gray.800")}
          color={useColorModeValue("black", "white")}
          _hover={{
            textDecoration: "none",
            bg: useColorModeValue("gray.100", "whiteAlpha.200"),
          }}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
          <Box fontWeight={"semibold"}>Xtream Codes</Box>
          <NavigationLink key={"/"} name={"Inicio"} to={"/"} />
        </HStack>
        <Button
          colorScheme={"whiteAlpha"}
          bg={useColorModeValue("white", "gray.800")}
          color={useColorModeValue("black", "white")}
          _hover={{
            textDecoration: "none",
            bg: useColorModeValue("gray.100", "whiteAlpha.200"),
          }}
          size="sm"
          onClick={toggleColorMode}
        >
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            <NavigationLink
              key={"/"}
              name={"Inicio"}
              to={"/"}
              onClick={onClose}
            />
          </Stack>
        </Box>
      ) : null}
    </Box>
  )
}

type NavigationLinkProps = {
  name: string
  to: string
  onClick?: () => void
}

const NavigationLink = (props: NavigationLinkProps) => {
  return (
    <Link
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.100", "whiteAlpha.200"),
      }}
      as={NavLink}
      to={props.to}
      onClick={props.onClick}
    >
      {props.name}
    </Link>
  )
}
