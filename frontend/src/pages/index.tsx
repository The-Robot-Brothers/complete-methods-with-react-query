import { Button, Flex, IconButton, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { RiDeleteBin2Fill, RiPencilFill } from "react-icons/ri";
import { useDeleteUser, useGetUser } from "../hooks/useUsers";

export default function Home() {
  const router = useRouter()

  const { data: users, isLoading, isError } = useGetUser()
  const { mutate: deleteUserMutation } = useDeleteUser()

  function handleDeleteUser(id: string) {
    deleteUserMutation(id, {
      onError: (error) => {
        alert(error)
        // toast({
        //   title: 'error',
        //   description: 'Invalid data',
        //   status: 'error',
        //   position: 'top',
        //   duration: 3000,
        //   isClosable: true,
        // })
      },
      onSuccess: () => {
        alert('User deleted')
        // toast({
        //   title: 'success',
        //   description: 'User deleted',
        //   status: 'success',
        //   position: 'top',
        //   duration: 3000,
        //   isClosable: true,
        // })

        router.push('/')
      }
    })
  }

  return (
    <Flex w='100vw' h='100vh' justify='center' py={50} >
      {isLoading ? <Spinner />
        : isError ? <Text>Erro em carregar os dados, ou não existe um lista de usuários!</Text>
          : (
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
                {users?.data?.map(user => {
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
                          onClick={() => handleDeleteUser(String(user.id))}
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
