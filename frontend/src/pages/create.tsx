import { Button, Checkbox, Flex, FormLabel, Input } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { api } from "../services/api";

type UserData = {
  username: string
  password: string
  is_admin: boolean
}

export default function Create() {
  const router = useRouter()
  const { handleSubmit, register, formState: { isSubmitting } } = useForm<UserData>()

  const userMutation = useMutation((createUserData: UserData) => api.post('users', createUserData), {
    onError: (error, variables, context) => {
      console.log("ERR", error)
      alert(`Error: ${error}`)
    },
    onSuccess: (result, variables, context) => {
      alert('Criado com susseso')

      router.push('/')
    }
  })

  const onSubmit: SubmitHandler<UserData> = data => {
    const userData = {
      username: data.username,
      password: data.password,
      is_admin: data.is_admin
    }

    userMutation.mutate(userData)
  }

  return (
    <Flex w='100vw' h='100vh' align='center' justify='center' >
      <Flex
        as='form'
        flexDir='column'
        gap={6}
        w='300px'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Flex flexDir='column' >
          <FormLabel>Username</FormLabel>
          <Input {...register('username')} autoFocus />
        </Flex>

        <Flex flexDir='column' >
          <FormLabel>Password</FormLabel>
          <Input type='password' {...register('password')} />
        </Flex>

        <Checkbox
          {...register('is_admin')}
        >
          Administrador
        </Checkbox>

        <Flex w='100%' justify='space-between' >
          <Link passHref href='/' >
            <Button w='49%' >Cancelar</Button>
          </Link>
          <Button w='49%' bg='green.600' type='submit' isLoading={isSubmitting}>
            Criar
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}