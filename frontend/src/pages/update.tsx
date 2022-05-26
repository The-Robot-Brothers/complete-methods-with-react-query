import { Button, Checkbox, Flex, FormLabel, Heading, Input, Spinner, Text, useToast } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { TUser, useGetByIdUser, useUpdateUser } from "../hooks/useUsers";

export default function Update() {
  const router = useRouter()
  const toast = useToast()
  const { handleSubmit, register, formState: { isSubmitting } } = useForm<TUser>()

  const { id } = router.query
  const { data: user, isLoading, isError } = useGetByIdUser(String(id))
  const { mutate: updateUserMutation } = useUpdateUser(String(id))

  const onSubmit: SubmitHandler<TUser> = async data => {
    const userData = {
      username: data.username,
      is_admin: data.is_admin
    }

    updateUserMutation(userData, {
      onError: () => {
        toast({
          title: 'error',
          description: 'Bad request',
          status: 'error',
          position: 'top',
          duration: 3000,
          isClosable: true,
        })
      },
      onSuccess: () => {
        toast({
          title: 'success',
          description: 'User updated',
          status: 'success',
          position: 'top',
          duration: 3000,
          isClosable: true,
        })

        router.push('/')
      }
    })
  }

  return (
    <Flex w='100vw' h='100vh' align='center' justify='center' flexDir='column'  >
      <Heading fontSize='3xl' >
        Update
      </Heading>

      {isLoading ? <Spinner />
        : isError ? <Text>Nao conseguimos carregar os dados do usuário!</Text>
          : (
            <Flex as='form' onSubmit={handleSubmit(onSubmit)} flexDir='column' gap={6} mt={6} w='300px' >
              <Text><strong>User ID:</strong> {id}</Text>

              <Flex flexDir='column' >
                <FormLabel>Username</FormLabel>
                <Input
                  defaultValue={user?.data?.username}
                  {...register('username')}
                  autoFocus
                />
              </Flex>

              <Checkbox
                defaultChecked={user?.data?.is_admin === true ? true : false}
                {...register('is_admin')}
              >
                Administrador
              </Checkbox>

              <Flex w='100%' justify='space-between' >
                <Link passHref href='/' >
                  <Button w='49%' >Cancelar</Button>
                </Link>
                <Button w='49%' bg='green.600' type='submit' isLoading={isSubmitting}>
                  Atualizar
                </Button>
              </Flex>
            </Flex>
          )
      }

    </Flex >
  )
}