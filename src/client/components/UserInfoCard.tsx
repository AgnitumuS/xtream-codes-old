import React from "react"
import {
  Badge,
  Box,
  Flex,
  Heading,
  Spacer,
  Tag,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { UserInfo } from "../../../types/types"

export const UserInfoCard = ({ userInfo }: { userInfo: UserInfo }) => {
  return (
    <Box
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"base"}
      p={6}
    >
      <Flex>
        <Heading fontSize="xl">Usuario</Heading>
        <Spacer />
        {userInfo.is_trial === "1" ? (
          <Tag colorScheme="orange">Prueba</Tag>
        ) : null}
      </Flex>
      <Text mt={4}>Usuario: {userInfo.username}</Text>
      <Text>Contraseña: {userInfo.password}</Text>
      <Text>
        Estado:{" "}
        {userInfo.status === "Active" ? (
          <Badge colorScheme="green">activo</Badge>
        ) : (
          <Badge colorScheme="red">finalizado</Badge>
        )}
      </Text>
      <Text>
        Fecha de creación:{" "}
        {new Date(Number(userInfo.created_at) * 1000).toLocaleDateString()}
      </Text>
      <Text>
        Fecha de expiración:{" "}
        {new Date(Number(userInfo.exp_date) * 1000).toLocaleDateString()}
      </Text>
      <Text>
        Conexiones:{" "}
        {Number(userInfo.active_cons) < Number(userInfo.max_connections) ? (
          <Badge colorScheme="blue">
            {userInfo.active_cons}/{userInfo.max_connections}
          </Badge>
        ) : Number(userInfo.active_cons) ===
          Number(userInfo.max_connections) ? (
          <Badge colorScheme="orange">
            {userInfo.active_cons}/{userInfo.max_connections}
          </Badge>
        ) : (
          <Badge colorScheme="red">
            {userInfo.active_cons}/{userInfo.max_connections}
          </Badge>
        )}
      </Text>
    </Box>
  )
}
