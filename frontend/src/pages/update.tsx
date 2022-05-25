import { Button, Checkbox, Flex, FormLabel, Input, Spinner, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { api } from "../services/api";

type UserData = {
  username: string
  is_admin: boolean
}

async function getUserById(id: string) {
  const { data } = await api.get(`users/${id}`)

  return data as UserData
}

export default function Update() {
  const router = useRouter()

  const { handleSubmit, register, formState: { isSubmitting } } = useForm<UserData>()

  const { id } = router.query
  const { data, isLoading, error } = useQuery(['user', id], () => getUserById(String(id)))

  const userMutation = useMutation((updateUserData: UserData) => api.put(`users/${id}`, updateUserData), {
    onError: (error, variables, context) => {
      console.log("ERR", error)
      alert(`Error: ${error}`)
    },
    onSuccess: (result, variables, context) => {
      alert('Editado com susseso')

      router.push('/')
    }
  })

  const onSubmit: SubmitHandler<UserData> = async data => {
    const userData = {
      username: data.username,
      is_admin: data.is_admin
    }

    userMutation.mutate(userData)
  }

  return (
    <Flex w='100vw' h='100vh' align='center' justify='center' flexDir='column'  >
      <Text fontSize='3xl' >
        Update
        {isLoading && <Spinner />}
      </Text>

      {isLoading
        ? (
          <Spinner />
        ) : error ? (
          <Text>Nao conseguimos carregar os dados</Text>
        ) : (
          <>
            <Text><strong>User ID:</strong> {id}</Text>

            <Flex as='form' onSubmit={handleSubmit(onSubmit)} flexDir='column' gap={6} mt={6} w='300px' >
              <Flex flexDir='column' >
                <FormLabel>Username</FormLabel>
                <Input
                  defaultValue={data?.username}
                  {...register('username')}
                  autoFocus
                />
              </Flex>

              <Checkbox
                defaultChecked={data?.is_admin === true ? true : false}
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
          </>
        )
      }

    </Flex >
  )
}