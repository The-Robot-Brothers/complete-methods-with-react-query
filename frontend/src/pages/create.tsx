import { Button, Checkbox, Flex, FormLabel, Input, useToast } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { TUser, usePostUser } from "../hooks/useUsers";

export default function Create() {
  const router = useRouter()
  const toast = useToast()

  const { mutate: createUserMutation } = usePostUser()

  const { handleSubmit, register, formState: { isSubmitting } } = useForm<TUser>()

  const onSubmit: SubmitHandler<TUser> = data => {
    const userData = {
      username: data.username,
      password: data.password,
      is_admin: data.is_admin
    }

    createUserMutation(userData, {
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
          description: 'User created',
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