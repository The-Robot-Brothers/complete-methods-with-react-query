import { Button, Flex, IconButton, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import Link from "next/link";
import { RiDeleteBin2Fill, RiPencilFill } from "react-icons/ri";
import { useMutation, useQuery } from "react-query";
import { api } from "../services/api";

type UserData = {
  id: string
  username: string
  password: string
  is_admin: boolean
  created_at: string
  updated_at: string
}

async function getUsers() {
  const { data } = await api.get('users')

  const user = data.map((user: UserData) => {
    return {
      id: user.id,
      username: user.username,
      password: user.password,
      is_admin: user.is_admin,
      created_at: new Date(user.created_at).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }),
      updated_at: user.updated_at
    }
  })

  return user as UserData[]
}

export default function Home() {
  const { data, isLoading, error } = useQuery('users', () => getUsers())

  const deleteUserMutation = useMutation((id: string) => api.delete(`users/${id}`), {
    onError: (error, variables, context) => {
      console.log("ERR", error)
      alert(`Error: ${error}`)
    },
    onSuccess: (result, variables, context) => {
      alert('Eliminado com susseso')
    }
  })

  function toggleDeleteUser(id: string) {
    deleteUserMutation.mutate(id)
  }

  return (
    <Flex w='100vw' h='100vh' justify='center' py={50} >
      {isLoading
        ? (
          <Spinner />
        ) : error ? (
          <Text>Erro em carregar os dados, ou nao existe!</Text>
        ) : (
          <Table variant='unstyled' h='min' maxW='720px' >
            <Thead color='gray.500' >
              <Tr>
                <Th>USERNAME</Th>
                <Th>ADMIN</Th>
                <Th>CRIADO</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map(user => {
                return (
                  <Tr key={user.id} >
                    <Td>{user.username}</Td>
                    <Td>{user.is_admin === true ? 'Administrador' : 'Colaborador'}</Td>
                    <Td>{user.created_at}</Td>
                    <Td>
                      <Link passHref href={{
                        pathname: '/update',
                        query: {
                          id: user.id
                        }
                      }} >
                        <IconButton aria-label='Button to update user' icon={<RiPencilFill />} />
                      </Link>
                      <IconButton
                        marginLeft={2}
                        aria-label="Button to delete user"
                        icon={<RiDeleteBin2Fill />}
                        onClick={() => toggleDeleteUser(user.id)}
                      />
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        )
      }

      <Link passHref href='/create' >
        <Button>Criar Novo</Button>
      </Link>
    </Flex>
  )
}
